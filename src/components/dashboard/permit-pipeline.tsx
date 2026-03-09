"use client";

import { cn } from "@/lib/utils";

export interface PipelineStage {
  label: string;
  shortLabel: string;
  count: number;
  color: string; // CSS color string
  bgColor: string;
  active: boolean;
}

interface Props {
  stages: PipelineStage[];
  activeStage: string | null;
  onStageClick: (stage: string | null) => void;
}

export function PermitPipeline({ stages, activeStage, onStageClick }: Props) {
  const total = stages.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="w-full">
      {/* Stage track */}
      <div className="flex items-stretch gap-1 sm:gap-1.5">
        {stages.map((stage, i) => {
          const isActive = activeStage === stage.label;
          const widthPct = total > 0 ? (stage.count / total) * 100 : 100 / stages.length;

          return (
            <button
              key={stage.label}
              onClick={() => onStageClick(isActive ? null : stage.label)}
              className={cn(
                "group relative flex flex-col items-center justify-between rounded-md px-2 py-2.5 text-left transition-all duration-200",
                "border hover:border-primary/40",
                isActive
                  ? "border-primary/50 bg-primary/8 ring-1 ring-primary/20"
                  : "border-border/60 bg-card hover:bg-surface-hover"
              )}
              style={{ flex: `${Math.max(widthPct, 8)} 0 0%` }}
              title={`${stage.label} — ${stage.count} permit${stage.count !== 1 ? "s" : ""}`}
            >
              {/* Count badge */}
              <span
                className="inline-flex items-center justify-center text-sm font-bold font-mono tabular-nums leading-none w-7 h-7 rounded-full shrink-0"
                style={{
                  backgroundColor: isActive ? stage.color : stage.bgColor,
                  color: isActive ? "#fff" : stage.color,
                }}
              >
                {stage.count}
              </span>

              {/* Label */}
              <span
                className={cn(
                  "mt-1.5 text-[10px] font-medium leading-tight text-center hidden sm:block",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {stage.shortLabel}
              </span>

              {/* Active indicator bar */}
              {isActive && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
              )}

              {/* Connector arrow (not on last) */}
              {i < stages.length - 1 && (
                <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-border/60 text-xs z-10 pointer-events-none select-none hidden sm:block">
                  ›
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active filter indicator */}
      {activeStage && (
        <p className="mt-2 text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{activeStage}</span>
          {" — "}
          <button
            onClick={() => onStageClick(null)}
            className="text-primary underline-offset-2 hover:underline transition-colors duration-150"
          >
            clear filter
          </button>
        </p>
      )}
    </div>
  );
}
