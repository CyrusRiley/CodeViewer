import { ExplainRequestPayload, OpenAIMessage } from "../types";

export function buildExplainMessages(payload: ExplainRequestPayload): OpenAIMessage[] {
  const systemPrompt = [
    "You are a senior code analysis assistant.",
    "Respond in Chinese.",
    "Always output clean Markdown with the following sections:",
    "## 整体作用",
    "## 执行流程",
    "## 关键变量",
    "## 不确定点",
    "For uncertain facts, explicitly mark them as inference based on current context, not confirmed facts.",
    "Do not invent missing definitions."
  ].join("\n");

  const userPrompt = [
    "Please explain the selected code.",
    "",
    `language: ${payload.language}`,
    `fileName: ${payload.fileName}`,
    `selectionStartLine: ${payload.selectionStartLine}`,
    `selectionEndLine: ${payload.selectionEndLine}`,
    `mode: ${payload.mode}`,
    "",
    "contextBefore:",
    "```",
    payload.contextBefore || "(empty)",
    "```",
    "",
    "selectedCode:",
    "```",
    payload.selectedCode,
    "```",
    "",
    "contextAfter:",
    "```",
    payload.contextAfter || "(empty)",
    "```"
  ].join("\n");

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt }
  ];
}