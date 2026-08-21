import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { generateToolOutput } from "@/lib/ai.functions";
import { AiOutput } from "@/components/ai-output";

type ToolId = "email" | "summary" | "planner" | "research";

export function Disclaimer() {
  return (
    <p className="text-[10px] text-muted-foreground text-center uppercase tracking-[0.05em]">
      AI-generated content may require human review
    </p>
  );
}

function OutputSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-secondary rounded w-3/4" />
      <div className="h-4 bg-secondary rounded w-5/6" />
      <div className="h-4 bg-secondary rounded w-2/3" />
      <div className="h-32 bg-muted rounded-md w-full" />
      <div className="h-4 bg-secondary rounded w-1/2" />
    </div>
  );
}

export function ToolWorkspace({
  tool,
  title,
  description,
  tip,
  submitLabel,
  fields,
  isValid,
  children,
  history,
}: {
  tool: ToolId;
  title: string;
  description: string;
  tip: string;
  submitLabel: string;
  fields: Record<string, string>;
  isValid: boolean;
  children: ReactNode;
  history: Array<{ title: string; meta: string }>;
}) {
  const [output, setOutput] = useState<string | null>(null);
  const run = useServerFn(generateToolOutput);

  const mutation = useMutation({
    mutationFn: async () => run({ data: { tool, fields } }),
    onSuccess: (result) => setOutput(result.text),
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-balance">{title}</h1>
        <p className="text-sm text-muted-foreground max-w-[56ch] text-pretty">{description}</p>
      </header>

      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <section className="space-y-4 p-6 bg-card ring-1 ring-foreground/5 rounded-xl">
            {children}
            <button
              onClick={() => mutation.mutate()}
              disabled={!isValid || mutation.isPending}
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-md transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
            >
              {mutation.isPending ? "Generating…" : submitLabel}
            </button>
          </section>

          <div className="p-4 rounded-lg bg-brand/5 ring-1 ring-brand/15 flex gap-3">
            <div className="size-4 bg-brand rounded-full shrink-0 mt-0.5" />
            <p className="text-xs text-brand leading-normal">{tip}</p>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="relative min-h-[400px] flex flex-col bg-card ring-1 ring-foreground/5 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
                Generated Output
              </span>
              <div className="flex gap-2">
                <button
                  disabled={!output}
                  onClick={() => {
                    if (output) {
                      void navigator.clipboard.writeText(output);
                      toast.success("Copied to clipboard");
                    }
                  }}
                  className="text-xs px-2.5 py-1 text-foreground/70 hover:text-foreground font-medium disabled:opacity-40"
                >
                  Copy
                </button>
                <button
                  disabled={!isValid || mutation.isPending}
                  onClick={() => mutation.mutate()}
                  className="text-xs px-2.5 py-1 text-foreground/70 hover:text-foreground font-medium disabled:opacity-40"
                >
                  Regenerate
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 md:p-8">
              {mutation.isPending ? (
                <OutputSkeleton />
              ) : output ? (
                <AiOutput text={output} />
              ) : (
                <p className="text-sm text-muted-foreground max-w-[48ch]">
                  Fill in the panel on the left and generate a draft. Output appears here, formatted
                  and ready to review.
                </p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-border bg-background/80">
              <Disclaimer />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Recent Activity
            </h4>
            <div className="divide-y divide-foreground/5 border-y border-foreground/5">
              {history.map((item) => (
                <div key={item.title} className="py-3 flex items-center justify-between group">
                  <div>
                    <p className="text-sm font-medium text-foreground/80">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground">{item.meta}</p>
                  </div>
                  <div className="size-4 bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full p-2 text-sm bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring transition-all";

export const textareaClass =
  "w-full min-h-[120px] p-3 text-sm bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-ring transition-all";
