import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { AiOutput } from "@/components/ai-output";
import { AppShell } from "@/components/app-shell";
import { Disclaimer } from "@/components/tool-workspace";
import { sendChatMessage } from "@/lib/ai.functions";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Assistant Chat — AetherFlow" },
      {
        name: "description",
        content:
          "Ask the workplace assistant anything: quick drafts, decisions, follow-ups and explanations.",
      },
      { property: "og:title", content: "Assistant Chat — AetherFlow" },
      {
        property: "og:description",
        content: "A professional AI chat assistant for everyday work questions and drafts.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const OPENER: Message = {
  role: "assistant",
  content:
    "Hello Julian. I can draft, summarize, plan or explain. What are you working on right now?",
};

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([OPENER]);
  const [input, setInput] = useState("");
  const send = useServerFn(sendChatMessage);
  const endRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: async (next: Message[]) => send({ data: { messages: next } }),
    onSuccess: (result) =>
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]),
    onError: (error: Error) => toast.error(error.message),
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  function submit() {
    const text = input.trim();
    if (!text || mutation.isPending) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6 h-full flex flex-col">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Assistant Chat</h1>
          <p className="text-sm text-muted-foreground max-w-[56ch] text-pretty">
            A general-purpose work assistant with the same professional voice as the tools.
          </p>
        </header>

        <div className="flex-1 min-h-[420px] flex flex-col bg-primary rounded-xl ring-1 ring-foreground/10 overflow-hidden shadow-lg">
          <div className="p-4 border-b border-background/10 flex items-center gap-2">
            <div className="size-2 bg-brand rounded-full animate-pulse" />
            <span className="text-xs font-medium text-primary-foreground/70">Assistant Online</span>
          </div>

          <div className="flex-1 p-4 md:p-6 space-y-4 overflow-y-auto">
            {messages.map((m, i) =>
              m.role === "assistant" ? (
                <div key={i} className="bg-background/5 rounded-lg p-4 max-w-[92%]">
                  <div className="text-primary-foreground/80 [&_*]:text-primary-foreground/80 [&_strong]:text-primary-foreground">
                    <AiOutput text={m.content} />
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <p className="bg-background text-foreground rounded-lg p-3 text-sm max-w-[80%] whitespace-pre-wrap">
                    {m.content}
                  </p>
                </div>
              ),
            )}
            {mutation.isPending ? (
              <div className="bg-background/5 rounded-lg p-4 max-w-[60%] space-y-2 animate-pulse">
                <div className="h-3 bg-background/10 rounded w-4/5" />
                <div className="h-3 bg-background/10 rounded w-3/5" />
              </div>
            ) : null}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-background/10">
            <div className="relative">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                }}
                className="w-full bg-background/5 border border-background/10 rounded-md py-2.5 pl-3 pr-20 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-background/25"
                placeholder="Ask a question..."
              />
              <button
                onClick={submit}
                disabled={mutation.isPending || input.trim().length === 0}
                className="absolute right-2 top-1.5 px-3 py-1 rounded bg-background text-foreground text-xs font-medium disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
