import * as vscode from "vscode";
import { registerExplainSelectionCommand } from "./commands/explainSelection";
import { ResultPanel } from "./views/resultPanel";

export function activate(context: vscode.ExtensionContext): void {
  const panel = new ResultPanel(context.extensionUri);
  registerExplainSelectionCommand(context, panel);
}

export function deactivate(): void {
  // Nothing to dispose explicitly. VS Code disposes command registrations automatically.
}