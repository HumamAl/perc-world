"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

const beforeItems = [
  "Open EHP-19 PDF in browser or print blank form",
  "Calculate daily flow manually (150 + 100 × extra BR)",
  "Look up loading rate in Appendix A table — by hand",
  "Divide to get absorption area — grab a calculator",
  "Count trenches, check 100-ft max rule, re-divide",
  "Transcribe GPS coordinates from Geode app",
  "Type property owner info from Jobber client record",
  "Print, wet-sign, scan, email to ADH county unit",
];

const afterItems = [
  "Field inputs saved from perc test form on-site",
  "Daily flow auto-calculated from bedroom count",
  "Loading rate pulled from Appendix A lookup table",
  "Absorption area, trench count + length auto-derived",
  "GPS coordinates pulled directly from Geode sync",
  "Property owner info carried over from Jobber",
  "ATU path auto-routes to EHP-19N with extra fields",
  "PDF generated + submitted to ADH with one click",
];

export function EhpBeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex items-center gap-1 p-1 rounded-lg border w-fit" style={{ background: "var(--muted)" }}>
        <button
          onClick={() => setShowAfter(false)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
          style={{
            transitionDuration: "var(--dur-normal)",
            background: !showAfter ? "var(--card)" : "transparent",
            color: !showAfter ? "var(--foreground)" : "var(--muted-foreground)",
            boxShadow: !showAfter ? "0 1px 3px oklch(0 0 0 / 0.08)" : "none",
          }}
        >
          Current Process
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
          style={{
            transitionDuration: "var(--dur-normal)",
            background: showAfter ? "var(--card)" : "transparent",
            color: showAfter ? "var(--primary)" : "var(--muted-foreground)",
            boxShadow: showAfter ? "0 1px 3px oklch(0 0 0 / 0.08)" : "none",
          }}
        >
          With PercPro
        </button>
      </div>

      {/* Content */}
      <div
        className="rounded-lg border p-4 transition-all"
        style={{
          transitionDuration: "var(--dur-normal)",
          background: showAfter
            ? "color-mix(in oklch, var(--success) 5%, var(--card))"
            : "color-mix(in oklch, var(--destructive) 5%, var(--card))",
          borderColor: showAfter
            ? "color-mix(in oklch, var(--success) 20%, transparent)"
            : "color-mix(in oklch, var(--destructive) 20%, transparent)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          {showAfter ? (
            <CheckCircle2
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--success)" }}
            />
          ) : (
            <AlertCircle
              className="h-4 w-4 shrink-0"
              style={{ color: "var(--destructive)" }}
            />
          )}
          <span className="text-xs font-semibold">
            {showAfter ? "Auto-filled EHP-19/EHP-19N" : "Manual EHP-19 completion"}
          </span>
          <span
            className="ml-auto flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: showAfter
                ? "color-mix(in oklch, var(--success) 15%, transparent)"
                : "color-mix(in oklch, var(--destructive) 15%, transparent)",
              color: showAfter ? "var(--success)" : "var(--destructive)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <Clock className="h-2.5 w-2.5" />
            {showAfter ? "~3 min" : "30–60 min"}
          </span>
        </div>

        {/* Steps list */}
        <ul className="space-y-1.5">
          {(showAfter ? afterItems : beforeItems).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <div
                className="flex items-center justify-center w-4 h-4 rounded-full shrink-0 mt-0.5 text-[9px] font-bold"
                style={{
                  background: showAfter
                    ? "color-mix(in oklch, var(--success) 15%, transparent)"
                    : "color-mix(in oklch, var(--destructive) 10%, transparent)",
                  color: showAfter ? "var(--success)" : "var(--muted-foreground)",
                }}
              >
                {i + 1}
              </div>
              <span className="text-foreground leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
