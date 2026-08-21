import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Field, ToolWorkspace, inputClass } from "@/components/tool-workspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AetherFlow" },
      {
        name: "description",
        content:
          "Generate structured briefings with key insights, implications and questions to validate.",
      },
      { property: "og:title", content: "AI Research Assistant — AetherFlow" },
      {
        property: "og:description",
        content: "Structured research briefings for professional decisions, with confidence flags.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [depth, setDepth] = useState("Standard briefing");

  return (
    <AppShell>
      <ToolWorkspace
        tool="research"
        title="AI Research Assistant"
        description="Get a structured briefing on any professional topic: insights, implications, and what still needs verifying."
        tip="Pro Tip: Name the decision you're making — briefings framed around a decision are far more actionable."
        submitLabel="Generate Briefing"
        fields={{ topic, audience, depth }}
        isValid={topic.trim().length > 5}
        history={[
          { title: "EMEA workspace tooling trends", meta: "Briefed 3 hours ago • Standard" },
          { title: "Usage-based pricing models", meta: "Briefed Tuesday • Deep dive" },
        ]}
      >
        <Field label="Topic or Question">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={inputClass}
            placeholder="e.g. How are B2B SaaS teams pricing AI features?"
          />
        </Field>

        <Field label="Audience / Purpose">
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className={inputClass}
            placeholder="e.g. Exec team deciding our Q4 pricing"
          />
        </Field>

        <Field label="Depth">
          <select value={depth} onChange={(e) => setDepth(e.target.value)} className={inputClass}>
            <option>Quick scan</option>
            <option>Standard briefing</option>
            <option>Deep dive</option>
          </select>
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
