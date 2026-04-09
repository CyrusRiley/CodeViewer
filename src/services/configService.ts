import * as vscode from "vscode";
import { ExplainMode, LlmServiceConfig } from "../types";

const CONFIG_NAMESPACE = "localCodeExplainer";

export function getConfig(): LlmServiceConfig {
  const cfg = vscode.workspace.getConfiguration(CONFIG_NAMESPACE);
  const rawMode = cfg.get<string>("defaultMode", "simple");

  return {
    baseUrl: cfg.get<string>("baseUrl", "http://127.0.0.1:8000"),
    apiPath: cfg.get<string>("apiPath", "/v1/chat/completions"),
    model: cfg.get<string>("model", "qwen2.5-coder-7b-instruct-q5_k_m.gguf"),
    timeoutMs: cfg.get<number>("timeoutMs", 60000),
    contextBeforeLines: cfg.get<number>("contextBeforeLines", 20),
    contextAfterLines: cfg.get<number>("contextAfterLines", 20),
    defaultMode: normalizeMode(rawMode),
    maxSelectionChars: cfg.get<number>("maxSelectionChars", 12000),
    enableCache: cfg.get<boolean>("enableCache", true)
  };
}

function normalizeMode(mode: string): ExplainMode {
  if (mode === "simple") {
    return "simple";
  }

  // Backward compatibility for older settings values.
  if (mode === "detailed" || mode === "detail") {
    return "detail";
  }

  if (mode === "concise") {
    return "simple";
  }

  return "simple";
}

export function buildEndpoint(baseUrl: string, apiPath: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = apiPath.startsWith("/") ? apiPath : `/${apiPath}`;
  return `${normalizedBase}${normalizedPath}`;
}
