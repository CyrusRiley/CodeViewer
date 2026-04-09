export type ExplainMode = "detailed" | "concise";

export interface EditorSelectionContext {
  language: string;
  fileName: string;
  selectedCode: string;
  contextBefore: string;
  contextAfter: string;
  selectionStartLine: number;
  selectionEndLine: number;
}

export interface ExplainRequestPayload extends EditorSelectionContext {
  mode: ExplainMode;
}

export interface LlmServiceConfig {
  baseUrl: string;
  apiPath: string;
  model: string;
  timeoutMs: number;
  contextBeforeLines: number;
  contextAfterLines: number;
  defaultMode: ExplainMode;
  maxSelectionChars: number;
  enableCache: boolean;
}

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenAIChatCompletionRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
}

export interface OpenAIChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}