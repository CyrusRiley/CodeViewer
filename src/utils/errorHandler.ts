import * as vscode from "vscode";

export function handleCommandError(error: unknown): void {
  if (error instanceof Error) {
    void vscode.window.showErrorMessage(`[Local Code Explainer] ${error.message}`);
    return;
  }

  void vscode.window.showErrorMessage("[Local Code Explainer] Unknown error occurred.");
}