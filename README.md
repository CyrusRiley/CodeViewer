# Local Code Explainer / 鏈湴浠ｇ爜瑙ｉ噴鍣?### 鏈彃浠朵綔涓轰釜浜虹敤閫旓紝闇€杩炴帴鏈湴llm serve
## Language Index / 璇█绱㈠紩

- [涓枃璇存槑](#涓枃璇存槑)
- [English](#english)

---

## 涓枃璇存槑

涓€涓?VS Code 鎵╁睍锛岄€氳繃璋冪敤鏈湴 LLM HTTP 鏈嶅姟鏉ヨВ閲婃墍閫変唬鐮併€?鐢ㄤ簬甯姪浣跨敤鑰呭洖蹇嗗彶鍓嶅睅灞变唬鐮?
### 鍔熻兘鐗规€?
- 閫氳繃涓€鏉″懡浠よВ閲婃墍閫変唬鐮併€?- 榛樿蹇嵎閿細
  - Windows/Linux: `Ctrl+Alt+E`
  - macOS: `Cmd+Alt+E`
- 鏀堕泦璇锋眰涓婁笅鏂囦俊鎭細
  - `language`
  - `fileName`
  - `selectedCode`
  - `contextBefore`
  - `contextAfter`
  - `selectionStartLine`
  - `selectionEndLine`
  - `mode`
- 鍦ㄧ嫭绔嬬殑 `WebviewPanel` 涓樉绀洪暱绡囪В閲婄粨鏋溿€?- 鍩虹閿欒澶勭悊锛?  - 鏈€夋嫨浠ｇ爜
  - 閫夋嫨鍐呭杩囧ぇ
  - HTTP 璇锋眰澶辫触
  - 璇锋眰瓒呮椂
- 鏀寔鍙€夌殑浼氳瘽鍐呯紦瀛橈紝鐢ㄤ簬閲嶅璇锋眰鍔犻€熴€?
### 宸ヤ綔鍘熺悊

1. 鍦ㄧ紪杈戝櫒涓€変腑浠ｇ爜銆?2. 杩愯鍛戒护锛歚Local Code Explainer: Explain Selected Code`锛屾垨鐩存帴浣跨敤蹇嵎閿€?3. 鎵╁睍鍚戞湰鍦版ā鍨嬫湇鍔″彂閫佽姹傘€?4. 妯″瀷杩斿洖 Markdown 鏍煎紡鐨勮В閲婂唴瀹广€?5. 缁撴灉浼氭樉绀哄湪渚ц竟闈㈡澘涓€?
### 鐜瑕佹眰

- 涓€涓敮鎸?OpenAI 鍏煎鑱婂ぉ琛ュ叏鎺ュ彛鐨勬湰鍦?HTTP LLM 鏈嶅姟銆備緥濡俙qwen2.5-coder-7b-instruct-q5_k_m.gguf`

### 閰嶇疆椤?
鎵撳紑 VS Code 璁剧疆锛屾悳绱?`Local Code Explainer`銆?
鍙敤閰嶇疆椤癸細

- `localCodeExplainer.baseUrl`
  - 榛樿鍊硷細`http://127.0.0.1:8000`
- `localCodeExplainer.apiPath`
  - 榛樿鍊硷細`/v1/chat/completions`
- `localCodeExplainer.model`
  - 榛樿鍊硷細`qwen2.5-coder-7b-instruct-q5_k_m.gguf`
- `localCodeExplainer.timeoutMs`
  - 榛樿鍊硷細`60000`
- `localCodeExplainer.contextBeforeLines`
  - 榛樿鍊硷細`20`
- `localCodeExplainer.contextAfterLines`
  - 榛樿鍊硷細`20`
- `localCodeExplainer.defaultMode`
  - 榛樿鍊硷細`detail`
  - 鍙€夊€硷細`simple`
- `localCodeExplainer.maxSelectionChars`
  - 榛樿鍊硷細`12000`
- `localCodeExplainer.enableCache`
  - 榛樿鍊硷細`true`

### 淇敼蹇嵎閿?
蹇嵎閿彲閫氳繃 VS Code 鐨勬爣鍑嗘柟寮忚繘琛岃嚜瀹氫箟锛?
1. 鎵撳紑 Keyboard Shortcuts锛堥敭鐩樺揩鎹锋柟寮忥級銆?2. 鎼滅储 `Local Code Explainer: Explain Selected Code`銆?3. 璁剧疆浣犳兂瑕佺殑蹇嵎閿€?
鎴栬€呯洿鎺ョ紪杈?`keybindings.json`锛?
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
3. Extension sends request to your local model service using `localCodeExplainer.defaultMode`.
4. Model returns Markdown explanation.
5. Result is shown in a side panel.

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
  - Default: `simple`
  - Optional: `detail`
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
