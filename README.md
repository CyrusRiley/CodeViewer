# Local Code Explainer

A VS Code extension that explains selected code by calling a local LLM HTTP service (OpenAI-compatible style).

## Features

- Explain selected code with one command.
- Default keybinding:
  - Windows/Linux: `Ctrl+Alt+E`
  - macOS: `Cmd+Alt+E`
- Collect request context:
  - `language`
  - `fileName`
  - `selectedCode`
  - `contextBefore`
  - `contextAfter`
  - `selectionStartLine`
  - `selectionEndLine`
  - `mode`
- Display long-form explanation in a dedicated `WebviewPanel`.
- Basic error handling:
  - Empty selection
  - Oversized selection
  - HTTP failures
  - Timeout
- Optional in-session cache for repeated requests.

## How It Works

1. Select code in editor.
2. Run command: `Local Code Explainer: Explain Selected Code` or use shortcut.
3. Extension sends request to your local model service.
4. Model returns Markdown explanation.
5. Result is shown in a side panel.

## Requirements

- A local HTTP LLM service that supports OpenAI-compatible chat completion endpoint.
- Example model name: `qwen2.5-coder-7b-instruct-q5_k_m.gguf`

## Configuration

Open VS Code Settings and search `Local Code Explainer`.

Available options:

- `localCodeExplainer.baseUrl`
  - Default: `http://127.0.0.1:8000`
- `localCodeExplainer.apiPath`
  - Default: `/v1/chat/completions`
- `localCodeExplainer.model`
  - Default: `qwen2.5-coder-7b-instruct-q5_k_m.gguf`
- `localCodeExplainer.timeoutMs`
  - Default: `60000`
- `localCodeExplainer.contextBeforeLines`
  - Default: `20`
- `localCodeExplainer.contextAfterLines`
  - Default: `20`
- `localCodeExplainer.defaultMode`
  - Default: `detailed`
  - Optional: `concise`
- `localCodeExplainer.maxSelectionChars`
  - Default: `12000`
- `localCodeExplainer.enableCache`
  - Default: `true`

## Modify Keybinding

The keybinding is fully customizable with VS Code standard method:

1. Open Keyboard Shortcuts.
2. Search for `Local Code Explainer: Explain Selected Code`.
3. Set your preferred shortcut.

Or edit `keybindings.json` directly:

```json
[
  {
    "key": "ctrl+shift+l",
    "command": "localCodeExplainer.explainSelection",
    "when": "editorTextFocus && editorHasSelection"
  }
]
```

## Development

```bash
npm install
npm run compile
```

Press `F5` in VS Code to launch Extension Development Host.

## Package

```bash
npm run package
```