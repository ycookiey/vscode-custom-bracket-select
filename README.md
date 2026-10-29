# Bracket Select Custom

> This is a fork of [jhasse.bracket-select2](https://marketplace.visualstudio.com/items?itemName=jhasse.bracket-select2), which is itself a fork of [chunsen.bracket-select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select).
>
> **What's new in this fork:**
> - **Customizable brackets and quotes** (v2.2.0) - choose them with the [Extension Settings](#extension-settings)

A simple extension that quickly selects the text between matching brackets or quotes.
It supports `()`, `{}`, `[]`, `""`, `''` and ``` `` ``` by default, and you can change the brackets and quotes in the settings.

## Installation
Install [Bracket Select Custom](https://marketplace.visualstudio.com/items?itemName=ycookiey.bracket-select-custom) from the Marketplace, or run `code --install-extension ycookiey.bracket-select-custom`.

## Quick start
Run the command `BraSel:Select` or press `alt+a` to select the text between brackets. To select more, press it again: the brackets are selected too, then the contents of the enclosing pair.

If you selected more than you want, press <kbd>Ctrl</kbd>+<kbd>U</kbd> (<kbd>Cmd</kbd>+<kbd>U</kbd> on macOS, Cursor Undo) to bring the previous selection back.

![Selecting more and going back with Cursor Undo](bracket-select-undo.gif)

To select the text including the brackets, run `BraSel:SelectInclude` or press `ctrl+alt+a` (`cmd+alt+a` on macOS).

This extension also works with **multiple cursors**:
![Selecting with multiple cursors](bracket-select.gif)

## Extension Settings

This extension contributes the following settings:

* `bracket-select.brackets`: the bracket pairs to match. Default: `[["(", ")"], ["{", "}"], ["[", "]"]]`
* `bracket-select.quotes`: the quote characters to match. Default: ``["\"", "'", "`"]``

A setting replaces its default list. For example, to also match angle brackets and to stop matching backticks:

```json
"bracket-select.brackets": [["(", ")"], ["{", "}"], ["[", "]"], ["<", ">"]],
"bracket-select.quotes": ["\"", "'"]
```

## Known limitations

- Brackets inside strings and comments count like any other bracket, which can give a wrong selection or none
- With `<` and `>` as brackets, comparison operators such as `a > b` count as brackets too
- Use brackets and quotes of one character. Longer ones such as `<!--` and `-->` give a wrong selection or none

## Build

With Node.js 22 or later:

```sh
npm ci
npx @vscode/vsce package
```

This compiles the extension and writes `bracket-select-custom-<version>.vsix`, which `code --install-extension <file>` installs.

## License

[MIT](LICENSE.txt)
