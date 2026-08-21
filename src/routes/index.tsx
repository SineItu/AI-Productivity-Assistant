import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Disclaimer } from "@/components/tool-workspace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AetherFlow — AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Draft emails, summarize meetings, plan tasks and research topics with a professional AI assistant built for daily work.",
      },
      { property: "og:title", content: "AetherFlow — AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "One workspace for AI email drafting, meeting summaries, task planning and research briefings.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    name: "Smart Email Generator",
    copy: "Tone- and audience-aware drafts for outreach, updates and difficult replies.",
  },
  {
    to: "/summarizer",
    name: "Meeting Notes Summarizer",
    copy: "Key points, decisions, owners and deadlines pulled from raw notes.",
  },
  {
    to: "/planner",
    name: "AI Task Planner",
    copy: "Prioritized, time-blocked plans that respect your real capacity.",
  },
  {
    to: "/research",
    name: "AI Research Assistant",
    copy: "Structured briefings with insights, implications and what to verify.",
  },
] as const;

function Dashboard() {
  return (
    <AppShell>
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-balance">
            Good morning, Julian
          </h1>
          <p className="text-sm text-muted-foreground max-w-[56ch] text-pretty">
            Four AI tools for the work that eats your calendar: writing, summarizing, planning and
            researching.
          </p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {TOOLS.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="col-span-12 md:col-span-6 p-6 bg-card ring-1 ring-foreground/5 rounded-xl transition-shadow hover:ring-foreground/15"
            >
              <p className="text-sm font-medium">{tool.name}</p>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed max-w-[42ch]">
                {tool.copy}
              </p>
              <p className="mt-4 text-xs font-medium text-brand">Open tool</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <section className="col-span-12 lg:col-span-7 bg-card ring-1 ring-foreground/5 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border bg-muted/30">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
                Recent Activity
              </span>
            </div>
            <div className="divide-y divide-foreground/5">
              {[
                { title: "Product Launch Sync summarized", meta: "1 hour ago • 6 action items" },
                { title: "Follow-up: Project Apollo Phase 2", meta: "2 hours ago • Professional" },
                { title: "EMEA workspace tooling briefing", meta: "3 hours ago • Standard depth" },
              ].map((item) => (
                <div key={item.title} className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground/80">{item.title}</p>
                  <p className="text-[11px] text-muted-foreground">{item.meta}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="col-span-12 lg:col-span-5 bg-primary text-primary-foreground rounded-xl p-6 flex flex-col">
            <div className="flex items-center gap-2">
              <div className="size-2 bg-brand rounded-full animate-pulse" />
              <span className="text-xs font-medium text-primary-foreground/70">
                Assistant Online
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
              Ask anything about your work — quick drafts, decisions, or explanations — without
              picking a tool first.
            </p>
            <Link
              to="/chat"
              className="mt-auto pt-6 text-xs font-medium text-primary-foreground underline underline-offset-4"
            >
              Open Assistant Chat
            </Link>
          </section>
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
