import * as vscode from "vscode";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  typographer: false
});

export class ResultPanel {
  private panel: vscode.WebviewPanel | undefined;

  constructor() {}

  public show(markdown: string, titleSuffix: string): void {
    const title = `Code Explanation - ${titleSuffix}`;

    if (!this.panel) {
      this.panel = vscode.window.createWebviewPanel(
        "localCodeExplainer.result",
        title,
        vscode.ViewColumn.Beside,
        {
          enableScripts: false,
          retainContextWhenHidden: true
        }
      );

      this.panel.onDidDispose(() => {
        this.panel = undefined;
      });
    }

    this.panel.title = title;
    this.panel.webview.html = this.getHtml(markdown);
    this.panel.reveal(vscode.ViewColumn.Beside);
  }

  private getHtml(markdown: string): string {
    const body = md.render(markdown);

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';" />
  <style>
    :root {
      color-scheme: light dark;
    }
    body {
      font-family: var(--vscode-font-family);
      font-size: 14px;
      line-height: 1.6;
      padding: 20px;
      max-width: 980px;
      margin: 0 auto;
      word-break: break-word;
    }
    h1, h2, h3 {
      margin-top: 20px;
      margin-bottom: 10px;
      line-height: 1.35;
    }
    h2 {
      border-bottom: 1px solid var(--vscode-editorWidget-border);
      padding-bottom: 6px;
    }
    p {
      margin: 8px 0;
    }
    ul, ol {
      padding-left: 24px;
    }
    pre {
      background: var(--vscode-textCodeBlock-background);
      border-radius: 8px;
      padding: 12px;
      overflow-x: auto;
      white-space: pre;
    }
    code {
      font-family: var(--vscode-editor-font-family);
      background: var(--vscode-textCodeBlock-background);
      border-radius: 4px;
      padding: 1px 4px;
    }
    pre code {
      background: transparent;
      padding: 0;
    }
    blockquote {
      margin: 10px 0;
      padding: 0 12px;
      border-left: 3px solid var(--vscode-textLink-foreground);
      opacity: 0.9;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 12px 0;
    }
    th, td {
      border: 1px solid var(--vscode-editorWidget-border);
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`;
  }
}
