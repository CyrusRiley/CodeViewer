import { ExplainRequestPayload, OpenAIMessage } from "../types";

export function buildExplainMessages(payload: ExplainRequestPayload): OpenAIMessage[] {
  const systemPrompt = payload.mode === "simple" ? buildSimpleModePrompt() : buildDetailModePrompt();

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

function buildDetailModePrompt(): string {
  return [
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
}

function buildSimpleModePrompt(): string {
  return [
    "You are a pragmatic code explainer focused on fast understanding.",
    "Respond in Chinese and output clean Markdown only.",
    "Keep the explanation concise but precise, and strictly follow the section structure below.",
    "",
    "## 语法层作用",
    "- Use one clear sentence to describe what this selected code does in syntax-level terms.",
    "- Prefer expressions like: '从 A 中过滤/去重/映射得到 B' or similar compact logic statements.",
    "",
    "## 标准写法（通用变量名）",
    "- Provide a normalized version of the selected code in a code block.",
    "- Replace custom variable names with conventional names while keeping the same semantics.",
    "- Do not expand into unrelated refactoring.",
    "",
    "## 变量与数据类型",
    "- List variable categories with explicit name and expected data type.",
    "- Must include: 输入变量, 输出变量, 参数变量.",
    "- Also include when applicable: 中间变量, 外部依赖/环境变量, 状态变量, 控制变量 (flags/counters).",
    "- If a type cannot be confirmed, mark as '推测类型' and explain why.",
    "",
    "## 上下文推测作用",
    "- Based on contextBefore/contextAfter, infer what role this code likely plays in the larger logic.",
    "- Distinguish confirmed facts from inferences clearly.",
    "- Never present guesses as confirmed truths.",
    "",
    "General rules:",
    "- Do not invent missing definitions.",
    "- If key dependency is absent, explicitly state '根据当前上下文推测'."
  ].join("\n");
}
