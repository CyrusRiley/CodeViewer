import * as vscode from "vscode";
import { createHash } from "crypto";
import { ResultPanel } from "../views/resultPanel";
import { getConfig } from "../services/configService";
import { getEditorSelectionContext } from "../utils/editorContext";
import { handleCommandError } from "../utils/errorHandler";
import { LlmClient } from "../services/llmClient";
import { ExplainRequestPayload } from "../types";

const CACHE = new Map<string, string>();

export function registerExplainSelectionCommand(
  context: vscode.ExtensionContext,
  panel: ResultPanel
): void {
  const llmClient = new LlmClient();

  const disposable = vscode.commands.registerCommand(
    "localCodeExplainer.explainSelection",
    async () => {
      try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          void vscode.window.showInformationMessage("No active editor.");
          return;
        }

        if (editor.selection.isEmpty) {
          void vscode.window.showWarningMessage("Please select some code first.");
          return;
        }

        const cfg = getConfig();
        const editorContext = getEditorSelectionContext(
          editor,
          cfg.contextBeforeLines,
          cfg.contextAfterLines
        );

        if (editorContext.selectedCode.length > cfg.maxSelectionChars) {
          void vscode.window.showWarningMessage(
            `Selected code is too long (${editorContext.selectedCode.length} chars). Limit: ${cfg.maxSelectionChars}.`
          );
          return;
        }

        const payload: ExplainRequestPayload = {
          ...editorContext,
          mode: cfg.defaultMode
        };

        const cacheKey = buildCacheKey(payload);
        if (cfg.enableCache && CACHE.has(cacheKey)) {
          panel.show(CACHE.get(cacheKey) || "", shortFileName(editorContext.fileName));
          void vscode.window.showInformationMessage("Explanation loaded from cache.");
          return;
        }

        const explanation = await vscode.window.withProgress(
          {
            location: vscode.ProgressLocation.Notification,
            title: "Explaining selected code with local model...",
            cancellable: false
          },
          async () => llmClient.explainSelection(payload)
        );

        if (cfg.enableCache) {
          CACHE.set(cacheKey, explanation);
        }

        panel.show(explanation, shortFileName(editorContext.fileName));
      } catch (error) {
        handleCommandError(error);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function buildCacheKey(payload: ExplainRequestPayload): string {
  return createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
}

function shortFileName(filePath: string): string {
  const parts = filePath.split(/[/\\]/);
  return parts[parts.length - 1] || filePath;
}
