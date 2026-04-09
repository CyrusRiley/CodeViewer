import * as vscode from "vscode";

export class ResultPanel {
  private panel: vscode.WebviewPanel | undefined;

  constructor(private readonly extensionUri: vscode.Uri) {}

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
    const body = renderSimpleMarkdown(markdown);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {
      color-scheme: light dark;
    }
    body {
      font-family: var(--vscode-font-family);
      font-size: 14px;
      line-height: 1.55;
      padding: 20px;
      max-width: 960px;
      margin: 0 auto;
    }
    h2 {
      border-bottom: 1px solid var(--vscode-editorWidget-border);
      padding-bottom: 6px;
      margin-top: 22px;
      margin-bottom: 10px;
    }
    code {
      font-family: var(--vscode-editor-font-family);
      background: var(--vscode-textCodeBlock-background);
      padding: 1px 4px;
      border-radius: 4px;
    }
    pre {
      white-space: pre-wrap;
      background: var(--vscode-textCodeBlock-background);
      padding: 10px;
      border-radius: 6px;
      overflow-x: auto;
    }
    ul, ol {
      padding-left: 24px;
    }
    p {
      margin: 8px 0;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`;
  }
}

function renderSimpleMarkdown(markdown: string): string {
  const escaped = escapeHtml(markdown);
  const lines = escaped.split(/\r?\n/);
  const html: string[] = [];

  let inList = false;
  let listType: "ul" | "ol" | null = null;

  const closeList = (): void => {
    if (inList && listType) {
      html.push(`</${listType}>`);
    }
    inList = false;
    listType = null;
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      closeList();
      html.push(`<h2>${line.slice(3)}</h2>`);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      if (!inList || listType !== "ol") {
        closeList();
        html.push("<ol>");
        inList = true;
        listType = "ol";
      }
      html.push(`<li>${inlineCode(orderedMatch[1])}</li>`);
      continue;
    }

    const bulletMatch = line.match(/^-\s+(.*)$/);
    if (bulletMatch) {
      if (!inList || listType !== "ul") {
        closeList();
        html.push("<ul>");
        inList = true;
        listType = "ul";
      }
      html.push(`<li>${inlineCode(bulletMatch[1])}</li>`);
      continue;
    }

    closeList();

    if (line.trim().length === 0) {
      html.push("<p></p>");
      continue;
    }

    html.push(`<p>${inlineCode(line)}</p>`);
  }

  closeList();

  return html.join("\n");
}

function inlineCode(text: string): string {
  return text.replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}