import { streamText } from "ai";
import { getGatewayModel } from "./ai-gateway.server";
import { buildPrompt, CHAT_SYSTEM, type ToolId } from "./prompts.server";

function toFriendlyError(error: unknown): never {
  const status = (error as { statusCode?: number; status?: number })?.statusCode ??
    (error as { status?: number })?.status;
  if (status === 429) {
    throw new Error("The assistant is rate limited right now. Please try again in a moment.");
  }
  if (status === 402) {
    throw new Error("AI credits are exhausted for this workspace. Add credits in Lovable to continue.");
  }
  if (status === 403) {
    throw new Error("AI access is blocked for this workspace. Ask an admin to re-enable Lovable AI.");
  }
  throw new Error(
    error instanceof Error ? error.message : "The assistant could not complete this request.",
  );
}

export async function runToolGeneration(tool: ToolId, fields: Record<string, string>) {
  const { system, prompt } = buildPrompt(tool, fields);
  try {
    const result = streamText({
      model: getGatewayModel(),
      system,
      prompt,
      temperature: 0.4,
    });
    return { text: await result.text };
  } catch (error) {
    return toFriendlyError(error);
  }
}

export async function runChatGeneration(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
) {
  try {
    const result = streamText({
      model: getGatewayModel(),
      system: CHAT_SYSTEM,
      messages,
      temperature: 0.5,
    });
    return { text: await result.text };
  } catch (error) {
    return toFriendlyError(error);
  }
}
