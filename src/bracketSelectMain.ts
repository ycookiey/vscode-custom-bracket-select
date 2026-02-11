'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { bracketUtil } from './bracketUtil';

class SearchResult {
    bracket: string;
    offset: number;
    length: number;

    constructor(bracket: string, offset: number, length: number = 1) {
        this.bracket = bracket;
        this.offset = offset;
        this.length = length;
    }
}

function findBackward(text: string, index: number): SearchResult {
    const bracketStack: string[] = [];
    let i = index;

    while (i >= 0) {
        // クォートチェック（マルチ文字対応）
        let quoteMatch = bracketUtil.matchQuote(text, i);
        if (quoteMatch && bracketStack.length == 0) {
            return new SearchResult(quoteMatch.bracket, i, quoteMatch.length);
        }

        // 開き括弧チェック（マルチ文字対応、最長マッチ優先）
        let openMatch = bracketUtil.matchOpenBracket(text, i);
        if (openMatch) {
            if (bracketStack.length == 0) {
                return new SearchResult(openMatch.bracket, i, openMatch.length);
            } else {
                let top = bracketStack.pop();
                if (!bracketUtil.isMatch(openMatch.bracket, top)) {
                    throw 'Unmatched bracket pair';
                }
            }
            i -= openMatch.length;
            continue;
        }

        // 閉じ括弧チェック（マルチ文字対応、最長マッチ優先）
        let closeMatch = bracketUtil.matchCloseBracket(text, i);
        if (closeMatch) {
            bracketStack.push(closeMatch.bracket);
            i -= closeMatch.length;
            continue;
        }

        // マッチしない場合は1文字進む
        i--;
    }
    return null;
}

function findForward(text: string, index: number): SearchResult {
    const bracketStack: string[] = [];
    let i = index;

    while (i < text.length) {
        // クォートチェック（マルチ文字対応）
        let quoteMatch = bracketUtil.matchQuote(text, i);
        if (quoteMatch && bracketStack.length == 0) {
            return new SearchResult(quoteMatch.bracket, i, quoteMatch.length);
        }

        // 閉じ括弧チェック（マルチ文字対応、最長マッチ優先）
        let closeMatch = bracketUtil.matchCloseBracket(text, i);
        if (closeMatch) {
            if (bracketStack.length == 0) {
                return new SearchResult(closeMatch.bracket, i, closeMatch.length);
            } else {
                let top = bracketStack.pop();
                if (!bracketUtil.isMatch(top, closeMatch.bracket)) {
                    throw 'Unmatched bracket pair';
                }
            }
            i += closeMatch.length;
            continue;
        }

        // 開き括弧チェック（マルチ文字対応、最長マッチ優先）
        let openMatch = bracketUtil.matchOpenBracket(text, i);
        if (openMatch) {
            bracketStack.push(openMatch.bracket);
            i += openMatch.length;
            continue;
        }

        // マッチしない場合は1文字進む
        i++;
    }
    return null;
}

function showInfo(msg: string): void {
    vscode.window.showInformationMessage(msg);
}

function getSearchContext(selection: vscode.Selection) {
    const editor = vscode.window.activeTextEditor;
    let selectionStart = editor.document.offsetAt(selection.start);
    let selectionEnd = editor.document.offsetAt(selection.end);
    return {
        backwardStarter: selectionStart - 1, //coverage vscode selection index to text index
        forwardStarter: selectionEnd,
        text: editor.document.getText()
    }
}

function toVscodeSelection({ start, end }: { start: number, end: number }): vscode.Selection {
    const editor = vscode.window.activeTextEditor;
    return new vscode.Selection(
        editor.document.positionAt(start + 1), //convert text index to vs selection index
        editor.document.positionAt(end)
    );
}

function isMatch(r1: SearchResult, r2: SearchResult) {
    return r1 != null && r2 != null && bracketUtil.isMatch(r1.bracket, r2.bracket);
}

function expandSelection(includeBrack: boolean) {
    const editor = vscode.window.activeTextEditor;

    editor.selections = editor.selections.map((originSelection) => {
        const newSelect = selectText(includeBrack, originSelection)
        return newSelect ? toVscodeSelection(newSelect) : originSelection
    })
}

function selectText(includeBrack: boolean, selection: vscode.Selection): { start: number, end: number } | void {
    const searchContext = getSearchContext(selection);
    let { text, backwardStarter, forwardStarter } = searchContext;
    if (backwardStarter < 0 || forwardStarter >= text.length) {
        return;
    }

    let selectionStart: number, selectionEnd: number;
    var backwardResult = findBackward(searchContext.text, searchContext.backwardStarter);
    var forwardResult = findForward(searchContext.text, searchContext.forwardStarter);

    while (forwardResult != null
        && !isMatch(backwardResult, forwardResult)
        && bracketUtil.isQuoteBracket(forwardResult.bracket)) {
        forwardResult = findForward(searchContext.text, forwardResult.offset + forwardResult.length);
    }
    while (backwardResult != null
        && !isMatch(backwardResult, forwardResult)
        && bracketUtil.isQuoteBracket(backwardResult.bracket)) {
        backwardResult = findBackward(searchContext.text, backwardResult.offset - backwardResult.length);
    }

    if (!isMatch(backwardResult, forwardResult)) {
        showInfo('No matched bracket pairs found')
        return;
    }
    // we are next to a bracket
    // this is the case for doule press select
    if (backwardStarter == backwardResult.offset && forwardResult.offset == forwardStarter) {
        selectionStart = backwardStarter - backwardResult.length;
        selectionEnd = forwardStarter + forwardResult.length;
    } else {
        if (includeBrack) {
            selectionStart = backwardResult.offset - backwardResult.length;
            selectionEnd = forwardResult.offset + forwardResult.length;
        } else {
            selectionStart = backwardResult.offset;
            selectionEnd = forwardResult.offset;
        }
    }
    return {
        start: selectionStart,
        end: selectionEnd,
    }
}


//Main extension point
export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('bracket-select.select', function () {
            expandSelection(false);
        }),
        vscode.commands.registerCommand('bracket-select.select-include', function () {
            expandSelection(true);
        })
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
}
