import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runToolGeneration, runChatGeneration } from "./ai-run.server";

const ToolInput = z.object({
  tool: z.enum(["email", "summary", "planner", "research"]),
  fields: z.record(z.string()),
});

export const generateToolOutput = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ToolInput.parse(input))
  .handler(async ({ data }) => runToolGeneration(data.tool, data.fields));

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      }),
    )
    .min(1),
});

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data }) => runChatGeneration(data.messages));
