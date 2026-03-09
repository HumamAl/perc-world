"use client";

import type { ElementType } from "react";
import { useState } from "react";
import { CheckCircle2, Clock, RefreshCw } from "lucide-react";

interface FlowStage {
  id: string;
  label: string;
  sublabel: string;
  icon: ElementType;
  highlight?: boolean;
}

const stages: FlowStage[] = [
  {
    id: "field",
    label: "Field Work",
    sublabel: "Perc test + shot sheet",
    icon: CheckCircle2,
    highlight: false,
  },
  {
    id: "design",
    label: "Drafting",
    sublabel: "System sizing + site plan",
    icon: Clock,
    highlight: true,
  },
  {
    id: "ehp",
    label: "EHP-19",
    sublabel: "Auto-filled, routed by type",
    icon: RefreshCw,
    highlight: true,
  },
  {
    id: "adh",
    label: "ADH Submission",
    sublabel: "Submitted to county unit",
    icon: CheckCircle2,
    highlight: false,
  },
  {
    id: "approval",
    label: "Permit for Construction",
    sublabel: "Issued — install begins",
    icon: CheckCircle2,
    highlight: false,
  },
];

const systemPaths = [
  { label: "Conventional Gravity", color: "primary", note: "EHP-19 · Gravity field lines" },
  { label: "Pumped LPP", color: "warning", note: "EHP-19 · Zoeller 151 + dose tank" },
  { label: "ATU System", color: "destructive", note: "EHP-19N · SludgeHammer specs + NSF/ANSI 40" },
];

export function PermitFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  function advanceStep() {
    setAnimating(true);
    setTimeout(() => {
      setActiveStep((prev) => {
        if (prev === null) return 0;
        if (prev >= stages.length - 1) return null;
        return prev + 1;
      });
      setAnimating(false);
    }, 180);
  }

  return (
    <div className="space-y-5">
      {/* System type branching pills */}
      <div className="flex flex-wrap gap-2">
        {systemPaths.map((path) => (
          <div
            key={path.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
            style={{
              borderColor:
                path.color === "primary"
                  ? "color-mix(in oklch, var(--primary) 30%, transparent)"
                  : path.color === "warning"
                  ? "color-mix(in oklch, var(--warning) 30%, transparent)"
                  : "color-mix(in oklch, var(--destructive) 30%, transparent)",
              background:
                path.color === "primary"
                  ? "color-mix(in oklch, var(--primary) 8%, transparent)"
                  : path.color === "warning"
                  ? "color-mix(in oklch, var(--warning) 8%, transparent)"
                  : "color-mix(in oklch, var(--destructive) 8%, transparent)",
              color:
                path.color === "primary"
                  ? "var(--primary)"
                  : path.color === "warning"
                  ? "color-mix(in oklch, var(--warning) 90%, var(--foreground))"
                  : "var(--destructive)",
            }}
          >
            <span>{path.label}</span>
            <span
              className="opacity-60 font-normal"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {path.note}
            </span>
          </div>
        ))}
      </div>

      {/* Stage pipeline — horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0">
        {stages.map((stage, i) => {
          const isActive = activeStep === i;
          const isPast = activeStep !== null && i < activeStep;
          const StageIcon = stage.icon;

          return (
            <div key={stage.id} className="flex sm:flex-row flex-col items-start sm:items-center gap-0 w-full sm:w-auto">
              {/* Stage card */}
              <button
                onClick={() => setActiveStep(i === activeStep ? null : i)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg border text-left w-full sm:w-auto transition-all"
                style={{
                  transitionDuration: "var(--dur-normal)",
                  background: isActive
                    ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                    : isPast
                    ? "color-mix(in oklch, var(--success) 6%, transparent)"
                    : "var(--card)",
                  borderColor: isActive
                    ? "color-mix(in oklch, var(--primary) 40%, transparent)"
                    : isPast
                    ? "color-mix(in oklch, var(--success) 25%, transparent)"
                    : "var(--border)",
                  boxShadow: isActive ? "0 0 0 2px color-mix(in oklch, var(--primary) 15%, transparent)" : undefined,
                }}
              >
                <StageIcon
                  className="h-4 w-4 shrink-0"
                  style={{
                    color: isActive
                      ? "var(--primary)"
                      : isPast
                      ? "var(--success)"
                      : "var(--muted-foreground)",
                  }}
                />
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold leading-tight"
                    style={{ color: isActive ? "var(--primary)" : isPast ? "var(--success)" : "var(--foreground)" }}
                  >
                    {stage.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 hidden sm:block">
                    {stage.sublabel}
                  </p>
                </div>
              </button>

              {/* Connector */}
              {i < stages.length - 1 && (
                <div
                  className="hidden sm:flex items-center px-1 shrink-0"
                  style={{ color: isPast ? "var(--success)" : "var(--muted-foreground)" }}
                >
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path
                      d="M0 6H16M16 6L11 1M16 6L11 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
              {i < stages.length - 1 && (
                <div
                  className="flex sm:hidden items-center py-1 pl-3 shrink-0"
                  style={{ color: isPast ? "var(--success)" : "var(--muted-foreground)" }}
                >
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                    <path
                      d="M6 0V12M6 12L1 7M6 12L11 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded stage detail */}
      {activeStep !== null && (
        <div
          className="rounded-lg px-4 py-3 text-xs border"
          style={{
            background: "color-mix(in oklch, var(--primary) 5%, var(--card))",
            borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
            opacity: animating ? 0 : 1,
            transition: "opacity var(--dur-normal) var(--ease-smooth)",
          }}
        >
          <span className="font-semibold text-primary">{stages[activeStep].label}:</span>{" "}
          <span className="text-muted-foreground">{stages[activeStep].sublabel}</span>
          {stages[activeStep].highlight && (
            <span
              className="ml-2 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
              style={{
                background: "color-mix(in oklch, var(--primary) 15%, transparent)",
                color: "var(--primary)",
              }}
            >
              automated
            </span>
          )}
        </div>
      )}

      {/* Step-through control */}
      <div className="flex items-center gap-3">
        <button
          onClick={advanceStep}
          className="text-xs font-medium px-3 py-1.5 rounded-md border border-primary/30 text-primary hover:bg-primary/5 transition-colors"
          style={{ transitionDuration: "var(--dur-fast)" }}
        >
          {activeStep === null ? "Step through workflow →" : activeStep >= stages.length - 1 ? "Reset" : "Next stage →"}
        </button>
        {activeStep !== null && (
          <span className="text-xs text-muted-foreground">
            Stage {activeStep + 1} of {stages.length}
          </span>
        )}
      </div>
    </div>
  );
}
