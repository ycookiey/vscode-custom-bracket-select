## [1.0.0]
- Initial release

## [2.0.0]
* Add support for `<>`,`""` and `''`.
* Support double click `alt+a` to select include bracked, instead of `ctrl+alt+a`.
* Just click `alt+a` for multiple times, you will find how it works, enjoy it.

## [2.0.1]
- Remove support for `<>`, because it breaks other bracket if there is a case like `if (a > b)`

## [2.0.2]
- Support selection of ` `` `
- Support multiple cursors selection
- Support undo selections

## [2.1.0]
- Remove undo (use `ctrl+u` instead)
- Set extensionKind to "ui", so that it runs locally even when using the remote extension

## [2.2.0]
- Add settings to customize supported brackets and quotes
- Add `bracket-select.brackets` setting
- Add `bracket-select.quotes` setting

## [2.3.0]
- Add support for multi-character brackets (e.g., `<!-- -->`, `/* */`, `${ }`)
- Improve bracket matching with longest-match-first algorithm
- Update repository URL to vscode-custom-bracket-select
