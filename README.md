# Custom Bracket Select

> [!NOTE]
> This is a fork of [jhasse.bracket-select2](https://marketplace.visualstudio.com/items?itemName=jhasse.bracket-select2), which was a fork of [chunsen.bracket-select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select).
> This fork (`ycookiey.bracket-select3`) is created to continue maintenance.

This is a simple plugin that support to quick select text between matched brackets.
This plugin supports `()`, `{}`, `[]`, `<>`,`“”`,`""`, `''`, and ``` `` ``` by default. You can customize supported brackets and quotes in settings.

Really hope this plugin can help you!


## Quick start
Just run command `BraSel:Select` or type `alt+a` to select text between brackets. If you wish to select more, just press it again.

If you slected more than you want, at anytime, just press <kbd>Ctrl</kbd>+<kbd>U</kbd> (Cursor Undo), you will bring the previous selections back.

![bracket-select-animation](bracket-select-undo.gif)
  
If you wish to select text including the brackets, just run `BraSel:Select Include Brackets` or type `cmd+alt+a` on mac and `ctrl+alt+a` on windows.

This plugin also works for **multiple cursors**:
![bracket-select-animation](bracket-select.gif)

## Requirements
None

## Extension Settings

This extension contributes the following settings:

* `bracket-select.brackets`: Array of bracket pairs to support.
* `bracket-select.quotes`: Array of quote characters to support.

Example configuration to add angle brackets `<>`:

```json
"bracket-select.brackets": [
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
    ["<", ">"],
    ["“", "”"]
]
```
