import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Field, ToolWorkspace, inputClass, textareaClass } from "@/components/tool-workspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AetherFlow" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritized, time-blocked schedule that respects your capacity.",
      },
      { property: "og:title", content: "AI Task Planner — AetherFlow" },
      {
        property: "og:description",
        content: "Prioritization, effort estimates and focus blocks generated from your task list.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState("Today");
  const [capacity, setCapacity] = useState("09:00–17:00, 1 hour of meetings");
  const [goal, setGoal] = useState("");

  return (
    <AppShell>
      <ToolWorkspace
        tool="planner"
        title="AI Task Planner"
        description="Dump everything on your plate. Get a prioritized, time-blocked plan that respects your real capacity."
        tip="Pro Tip: Add hard deadlines inline (e.g. 'board deck — due Thu 3pm') so scheduling stays realistic."
        submitLabel="Build My Plan"
        fields={{ tasks, horizon, capacity, goal }}
        isValid={tasks.trim().length > 10}
        history={[
          { title: "Week of 17 Aug", meta: "Planned yesterday • 12 tasks, 3 deferred" },
          { title: "Launch week crunch", meta: "Planned last week • 4 focus blocks" },
        ]}
      >
        <Field label="Tasks & Commitments">
          <textarea
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            className={`${textareaClass} min-h-[160px]`}
            placeholder={"One per line, e.g.\nFinalize Q3 budget — due today\nReview design assets\nPrep user interview script"}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Horizon">
            <select
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              className={inputClass}
            >
              <option>Today</option>
              <option>This week</option>
              <option>Next two weeks</option>
            </select>
          </Field>
          <Field label="Capacity">
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Primary Goal (optional)">
          <input
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className={inputClass}
            placeholder="e.g. Ship the pricing page before Friday"
          />
        </Field>
      </ToolWorkspace>
    </AppShell>
  );
}
