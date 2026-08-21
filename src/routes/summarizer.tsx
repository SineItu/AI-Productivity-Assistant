import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Field, ToolWorkspace, textareaClass } from "@/components/tool-workspace";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — AetherFlow" },
      {
        name: "description",
        content:
          "Turn raw meeting notes into an executive summary, decisions, owners, actions and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — AetherFlow" },
      {
        property: "og:description",
        content: "Key points, decisions, action items and deadlines extracted from your notes.",
      },
    ],
  }),
  component: SummarizerPage,
});

function SummarizerPage() {
  const [notes, setNotes] = useState("");

  return (
    <AppShell>
      <ToolWorkspace
        tool="summary"
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript. Get an executive summary, decisions, owners, actions and deadlines."
        tip="Pro Tip: Keep speaker names in the transcript — the summarizer assigns action owners from them."
        submitLabel="Summarize Notes"
        fields={{ notes }}
        isValid={notes.trim().length > 40}
        history={[
          { title: "Product Launch Sync", meta: "Summarized 1 hour ago • 6 action items" },
          { title: "Q3 Architecture Review", meta: "Summarized yesterday • 3 decisions" },
        ]}
      >
        <Field label="Raw Notes or Transcript">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`${textareaClass} min-h-[280px]`}
            placeholder="Paste your meeting notes here. Include names, dates and any commitments made..."
          />
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
