# Bracket Select Custom

A VS Code extension that selects the text between matching brackets or quotes: `()`, `{}`, `[]`, `""`, `''` and ``` `` ``` by default, configurable in the settings. Press the shortcut again to expand the selection outward. Works with multiple cursors.

Forked from [jhasse.bracket-select2](https://marketplace.visualstudio.com/items?itemName=jhasse.bracket-select2), itself a fork of [chunsen.bracket-select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select). This fork adds the settings for the brackets and quotes to match.

## Installation

Install [Bracket Select Custom](https://marketplace.visualstudio.com/items?itemName=ycookiey.bracket-select-custom) from the Marketplace, or run `code --install-extension ycookiey.bracket-select-custom`.

## Usage

| Command | Selects | Windows / Linux | macOS |
| --- | --- | --- | --- |
| `BraSel:Select` | The text between the brackets. Pressing again selects the brackets too, then the contents of the enclosing pair | <kbd>Alt</kbd>+<kbd>A</kbd> | <kbd>Option</kbd>+<kbd>A</kbd> |
| `BraSel:SelectInclude` | The text including the brackets | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>A</kbd> | <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>A</kbd> |

To go back to the previous selection, run VS Code's Cursor Undo (<kbd>Ctrl</kbd>+<kbd>U</kbd>, or <kbd>Cmd</kbd>+<kbd>U</kbd> on macOS).

![Selecting more and going back with Cursor Undo](bracket-select-undo.gif)

![Selecting with multiple cursors](bracket-select.gif)

## Settings

- `bracket-select.brackets`: the bracket pairs to match. Default: `[["(", ")"], ["{", "}"], ["[", "]"]]`
- `bracket-select.quotes`: the quote characters to match. Default: ``["\"", "'", "`"]``

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
