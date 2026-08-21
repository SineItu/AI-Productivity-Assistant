import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Field, ToolWorkspace, inputClass, textareaClass } from "@/components/tool-workspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AetherFlow" },
      {
        name: "description",
        content:
          "Draft professional workplace emails by tone and audience with AI, then review and send.",
      },
      { property: "og:title", content: "Smart Email Generator — AetherFlow" },
      {
        property: "og:description",
        content: "Tone- and audience-aware AI email drafting for busy professionals.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("Professional");
  const [audience, setAudience] = useState("Executive Team");
  const [length, setLength] = useState("Concise");

  return (
    <AppShell>
      <ToolWorkspace
        tool="email"
        title="Smart Email Generator"
        description="Draft professional outreach, internal updates, or delicate responses in seconds with contextual AI."
        tip="Pro Tip: Include specific metrics, names and dates in the context — drafts get far sharper and need less editing."
        submitLabel="Generate Draft"
        fields={{ context, tone, audience, length }}
        isValid={context.trim().length > 8}
        history={[
          { title: "Follow-up: Project Apollo Phase 2", meta: "Generated 2 hours ago • Professional" },
          { title: "Client Welcome: Zenith Systems", meta: "Generated 5 hours ago • Friendly" },
        ]}
      >
        <Field label="Context & Intent">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className={textareaClass}
            placeholder="e.g. Asking for a budget increase for the Q4 marketing campaign due to higher CPM rates..."
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Tone">
            <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputClass}>
              <option>Professional</option>
              <option>Direct</option>
              <option>Empathetic</option>
              <option>Urgent</option>
            </select>
          </Field>
          <Field label="Audience">
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className={inputClass}
            >
              <option>Executive Team</option>
              <option>Direct Report</option>
              <option>External Client</option>
              <option>Cross-functional Peer</option>
            </select>
          </Field>
        </div>

        <Field label="Length">
          <select value={length} onChange={(e) => setLength(e.target.value)} className={inputClass}>
            <option>Concise</option>
            <option>Detailed</option>
          </select>
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
