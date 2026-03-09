import type { CSSProperties } from "react";
import { Briefcase, Database, FolderOpen, Globe } from "lucide-react";

type NodeType = "source" | "core" | "destination";

export function IntegrationPipeline() {
  const typeStyle: Record<NodeType, CSSProperties> = {
    source: {
      background: "var(--card)",
      borderColor: "var(--border)",
    },
    core: {
      background: "color-mix(in oklch, var(--primary) 8%, var(--card))",
      borderColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
    },
    destination: {
      background: "color-mix(in oklch, var(--success) 6%, var(--card))",
      borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
    },
  };

  return (
    <div className="space-y-3">
      {/* Source node */}
      <div
        className="rounded-lg border p-3"
        style={typeStyle.source}
      >
        <div className="flex items-center gap-2 mb-1">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-semibold">Jobber</span>
          <span className="text-[10px] text-muted-foreground ml-1">Scheduling + invoicing</span>
        </div>
        <p
          className="text-[10px] text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          webhooks: job.created · job.updated · invoice.paid
        </p>
      </div>

      {/* Connector */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-3 bg-border" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M6 0L12 8H0L6 0Z" fill="var(--border)" />
          </svg>
        </div>
      </div>

      {/* Core app — prominent */}
      <div
        className="rounded-lg border p-4"
        style={typeStyle.core}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-foreground">PercPro App</span>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: "color-mix(in oklch, var(--primary) 15%, transparent)",
              color: "var(--primary)",
            }}
          >
            single source of truth
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Perc test data", tag: "field input" },
            { label: "Shot sheet elevations", tag: "field input" },
            { label: "EHP-19 form fields", tag: "auto-derived" },
            { label: "Site plan PDF", tag: "auto-generated" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-1.5 text-[10px]"
            >
              <div
                className="w-1 h-1 rounded-full shrink-0 mt-1.5"
                style={{ background: "var(--primary)" }}
              />
              <div>
                <span className="text-foreground">{item.label}</span>
                <span
                  className="ml-1 px-1 rounded text-[9px] font-medium"
                  style={{
                    background: "color-mix(in oklch, var(--primary) 12%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connector to two destinations */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-3 bg-border" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M6 0L12 8H0L6 0Z" fill="var(--border)" />
          </svg>
        </div>
      </div>

      {/* Two destinations */}
      <div className="grid grid-cols-2 gap-2">
        {/* OneDrive */}
        <div
          className="rounded-lg border p-3 space-y-1"
          style={typeStyle.destination}
        >
          <div className="flex items-center gap-1.5">
            <FolderOpen
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: "var(--success)" }}
            />
            <span className="text-xs font-semibold">OneDrive</span>
          </div>
          <p
            className="text-[10px] text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Microsoft Graph API
          </p>
          <p className="text-[10px] text-muted-foreground">
            Site plans, EHP-19 PDFs, shot sheets — organized by job
          </p>
        </div>

        {/* ADH Portal */}
        <div
          className="rounded-lg border p-3 space-y-1"
          style={typeStyle.destination}
        >
          <div className="flex items-center gap-1.5">
            <Globe
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: "var(--success)" }}
            />
            <span className="text-xs font-semibold">ADH Portal</span>
          </div>
          <p
            className="text-[10px] text-muted-foreground"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Auto-login + form fill
          </p>
          <p className="text-[10px] text-muted-foreground">
            EHP-19N fields populated directly from app data
          </p>
        </div>
      </div>
    </div>
  );
}
