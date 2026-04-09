import * as vscode from "vscode";
import { EditorSelectionContext } from "../types";

export function getEditorSelectionContext(
  editor: vscode.TextEditor,
  contextBeforeLines: number,
  contextAfterLines: number
): EditorSelectionContext {
  const document = editor.document;
  const selection = editor.selection;

  const selectedCode = document.getText(selection);
  const startLine = selection.start.line;
  const endLine = selection.end.line;

  const beforeStart = Math.max(0, startLine - contextBeforeLines);
  const beforeRange = new vscode.Range(
    new vscode.Position(beforeStart, 0),
    new vscode.Position(startLine, 0)
  );
  const contextBefore = document.getText(beforeRange);

  const afterEndLine = Math.min(document.lineCount - 1, endLine + contextAfterLines);
  const afterStartPosition = new vscode.Position(Math.min(endLine + 1, document.lineCount - 1), 0);
  const afterEndPosition = new vscode.Position(
    afterEndLine,
    document.lineAt(afterEndLine).range.end.character
  );

  const contextAfter = endLine + 1 > document.lineCount - 1
    ? ""
    : document.getText(new vscode.Range(afterStartPosition, afterEndPosition));

  return {
    language: document.languageId,
    fileName: document.fileName,
    selectedCode,
    contextBefore,
    contextAfter,
    selectionStartLine: startLine + 1,
    selectionEndLine: endLine + 1
  };
}