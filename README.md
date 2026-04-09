# Local Code Explainer / 本地代码解释器

### 本插件主要作为个人用途，需要连接本地 LLM service。

## Language Index / 语言索引

- [中文说明](#中文说明)
- [English](#english)

---

## 中文说明

一个 VS Code 扩展，通过调用本地 LLM HTTP 服务来解释所选代码，可用于帮助使用者快速理解和回忆历史代码。

### 功能特性

- 通过一条命令解释所选代码。
- 默认快捷键：
  - Windows/Linux: `Ctrl+Alt+E`
  - macOS: `Cmd+Alt+E`
- 收集请求上下文信息：
  - `language`
  - `fileName`
  - `selectedCode`
  - `contextBefore`
  - `contextAfter`
  - `selectionStartLine`
  - `selectionEndLine`
  - `mode`
- 在独立的 `WebviewPanel` 中显示长篇解释结果。
- 基础错误处理：
  - 未选择代码
  - 选择内容过大
  - HTTP 请求失败
  - 请求超时
- 支持可选的会话内缓存，用于重复请求加速。

### 工作原理

1. 在编辑器中选中代码。
2. 运行命令：`Local Code Explainer: Explain Selected Code`，或直接使用快捷键。
3. 选择解释风格：`detail` 或 `simple`（默认会预选一种风格）。
4. 扩展向本地模型服务发送请求。
5. 模型返回 Markdown 格式的解释内容。
6. 结果会显示在侧边面板中。

### 环境要求

- 一个支持 OpenAI 兼容聊天补全接口的本地 HTTP LLM 服务。
- 示例模型名称：`qwen2.5-coder-7b-instruct-q5_k_m.gguf`

### 配置项

打开 VS Code 设置，搜索 `Local Code Explainer`。

可用配置项：

- `localCodeExplainer.baseUrl`
  - 默认值：`http://127.0.0.1:8000`
- `localCodeExplainer.apiPath`
  - 默认值：`/v1/chat/completions`
- `localCodeExplainer.model`
  - 默认值：`qwen2.5-coder-7b-instruct-q5_k_m.gguf`
- `localCodeExplainer.timeoutMs`
  - 默认值：`60000`
- `localCodeExplainer.contextBeforeLines`
  - 默认值：`20`
- `localCodeExplainer.contextAfterLines`
  - 默认值：`20`
- `localCodeExplainer.defaultMode`
  - 默认值：`detail`
  - 可选值：`simple`
- `localCodeExplainer.maxSelectionChars`
  - 默认值：`12000`
- `localCodeExplainer.enableCache`
  - 默认值：`true`

### 修改快捷键

快捷键可通过 VS Code 的标准方式进行自定义：

1. 打开 Keyboard Shortcuts（键盘快捷方式）。
2. 搜索 `Local Code Explainer: Explain Selected Code`。
3. 设置你想要的快捷键。

或直接编辑 `keybindings.json`：

```json
[
  {
    "key": "ctrl+shift+l",
    "command": "localCodeExplainer.explainSelection",
    "when": "editorTextFocus && editorHasSelection"
  }
]
```

---

## English

A VS Code extension that explains selected code by calling a local LLM HTTP service (OpenAI-compatible style).

### Features

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

### How It Works

1. Select code in editor.
2. Run command: `Local Code Explainer: Explain Selected Code` or use shortcut.
3. Pick explanation style: `detail` or `simple` (default style is preselected).
4. Extension sends request to your local model service.
5. Model returns Markdown explanation.
6. Result is shown in a side panel.

### Requirements

- A local HTTP LLM service that supports OpenAI-compatible chat completion endpoint.
- Example model name: `qwen2.5-coder-7b-instruct-q5_k_m.gguf`

### Configuration

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
  - Default: `detail`
  - Optional: `simple`
- `localCodeExplainer.maxSelectionChars`
  - Default: `12000`
- `localCodeExplainer.enableCache`
  - Default: `true`

### Modify Keybinding

The keybinding is fully customizable with the standard VS Code method:

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
