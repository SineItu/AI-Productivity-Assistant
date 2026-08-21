import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard" },
  { to: "/email", label: "Email Gen" },
  { to: "/summarizer", label: "Summarizer" },
  { to: "/planner", label: "Task Planner" },
  { to: "/research", label: "Research" },
  { to: "/chat", label: "Assistant Chat" },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="p-6 flex items-center gap-3">
        <div className="size-6 rounded-md bg-primary flex items-center justify-center">
          <div className="size-2 bg-background rounded-full" />
        </div>
        <span className="font-medium tracking-tight">AetherFlow</span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            activeOptions={{ exact: item.to === "/" }}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground rounded-md transition-colors duration-200 hover:bg-sidebar-accent/40 hover:text-foreground"
            activeProps={{ className: "bg-sidebar-accent/60 text-foreground" }}
          >
            <div className="size-4 bg-border rounded shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="size-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium truncate">Julian Draxler</p>
            <p className="text-[10px] text-muted-foreground truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = NAV_ITEMS.find((i) => i.to === pathname) ?? NAV_ITEMS[0];

  return (
    <div className="flex h-screen bg-background text-foreground antialiased selection:bg-secondary">
      <aside className="hidden md:flex w-64 shrink-0 border-r border-border flex-col bg-sidebar">
        <SidebarContent />
      </aside>

      {open ? (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="w-64 bg-sidebar border-r border-border flex flex-col">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
          <button
            aria-label="Close navigation"
            className="flex-1 bg-foreground/20 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
        </div>
      ) : null}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 md:px-8 bg-background/60 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="md:hidden text-muted-foreground"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
            <span className="text-xs text-muted-foreground">Tools</span>
            <span className="text-xs text-border">/</span>
            <span className="text-xs font-medium text-foreground/70">{current.label}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground">Model: Lovable AI</span>
            <div className="w-px h-4 bg-border" />
            <span className="text-xs font-medium text-muted-foreground">Human review advised</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
