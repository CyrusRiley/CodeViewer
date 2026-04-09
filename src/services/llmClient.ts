import { buildEndpoint, getConfig } from "./configService";
import {
  ExplainRequestPayload,
  OpenAIChatCompletionRequest,
  OpenAIChatCompletionResponse
} from "../types";
import { buildExplainMessages } from "../prompts/explainPrompt";

export class LlmClient {
  async explainSelection(payload: ExplainRequestPayload): Promise<string> {
    const config = getConfig();
    const endpoint = buildEndpoint(config.baseUrl, config.apiPath);

    const requestBody: OpenAIChatCompletionRequest = {
      model: config.model,
      messages: buildExplainMessages(payload),
      temperature: 0.2
    };

    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), config.timeoutMs);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody),
        signal: abortController.signal
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`LLM service returned ${response.status}: ${text}`);
      }

      const data = (await response.json()) as OpenAIChatCompletionResponse;
      const content = data.choices?.[0]?.message?.content?.trim();

      if (!content) {
        throw new Error("LLM response is empty.");
      }

      return content;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after ${config.timeoutMs}ms.`);
      }

      if (error instanceof TypeError) {
        const reason =
          error.cause instanceof Error ? ` Cause: ${error.cause.message}` : "";
        throw new Error(
          `Network request failed at ${endpoint}. Please check local LLM server host/port/path and whether the service is running.${reason}`
        );
      }

      throw error instanceof Error
        ? new Error(`Request to ${endpoint} failed: ${error.message}`)
        : error;
    } finally {
      clearTimeout(timeout);
    }
  }
}
