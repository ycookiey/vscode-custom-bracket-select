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

    // 長さでソートされた括弧リストを取得（最長優先）
    function getSortedBrackets(): string[][] {
        const brackets = getBrackets();
        return brackets.sort((a, b) => b[0].length - a[0].length);
    }

    // 長さでソートされたクォートリストを取得（最長優先）
    function getSortedQuotes(): string[] {
        const quotes = getQuotes();
        return quotes.sort((a, b) => b.length - a.length);
    }

    // 指定位置から最長マッチする開き括弧を検出
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

    // 指定位置から最長マッチする閉じ括弧を検出
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

    // クォートのマッチング（マルチ文字対応）
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

    export function isOpenBracket(char: string): Boolean {
        return matchOpenBracket(char, 0) !== null;
    }

    export function isCloseBracket(char: string): Boolean {
        return matchCloseBracket(char, 0) !== null;
    }

    export function isQuoteBracket(char: string): Boolean {
        return matchQuote(char, 0) !== null;
    }
}
