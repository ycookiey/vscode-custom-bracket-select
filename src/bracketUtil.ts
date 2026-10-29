import * as vscode from 'vscode';

export namespace bracketUtil {
    function getBrackets(): string[][] {
        const config = vscode.workspace.getConfiguration('bracket-select');
        return config.get('brackets', [["(", ")"], ["{", "}"], ["[", "]"]]);
    }

    function getQuotes(): string[] {
        const config = vscode.workspace.getConfiguration('bracket-select');
        return config.get('quotes', ['"', "'", "`"]);
    }

    // Longest first, so that a bracket such as `{{` matches before `{`
    function getSortedBrackets(): string[][] {
        const brackets = getBrackets();
        return brackets.sort((a, b) => b[0].length - a[0].length);
    }

    // Longest first, for the same reason as getSortedBrackets
    function getSortedQuotes(): string[] {
        const quotes = getQuotes();
        return quotes.sort((a, b) => b.length - a.length);
    }

    export function matchOpenBracket(text: string, index: number): { bracket: string, length: number } | null {
        const sortedBrackets = getSortedBrackets();
        for (const [open, close] of sortedBrackets) {
            const substring = text.substring(index, index + open.length);
            if (substring === open) {
                return { bracket: open, length: open.length };
            }
        }
        return null;
    }

    export function matchCloseBracket(text: string, index: number): { bracket: string, length: number } | null {
        const sortedBrackets = getSortedBrackets();
        for (const [open, close] of sortedBrackets) {
            const substring = text.substring(index, index + close.length);
            if (substring === close) {
                return { bracket: close, length: close.length };
            }
        }
        return null;
    }

    export function matchQuote(text: string, index: number): { bracket: string, length: number } | null {
        const sortedQuotes = getSortedQuotes();
        for (const quote of sortedQuotes) {
            const substring = text.substring(index, index + quote.length);
            if (substring === quote) {
                return { bracket: quote, length: quote.length };
            }
        }
        return null;
    }

    export function isMatch(open: string, close: string): Boolean {
        if (isQuoteBracket(open)) {
            return open === close;
        }
        return getBrackets().findIndex(p => p[0] === open && p[1] === close) >= 0;
    }

    export function isQuoteBracket(char: string): Boolean {
        return matchQuote(char, 0) !== null;
    }
}
