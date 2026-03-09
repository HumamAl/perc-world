"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ── useCountUp hook ──────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const val = parseFloat((eased * target).toFixed(decimals));
            setCount(val);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { count, ref };
}

// ── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: number;
  unit?: string;
  prefix?: string;
  decimals?: number;
  change?: number;
  changeLabel?: string;
  description: string;
  index: number;
  large?: boolean;
}

export function StatCard({
  title,
  value,
  unit,
  prefix,
  decimals = 0,
  change,
  changeLabel,
  description,
  index,
  large = false,
}: StatCardProps) {
  const { count, ref } = useCountUp(value, 1200, decimals);

  const formattedCount =
    prefix === "$"
      ? `$${count.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
      : `${count.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${unit ?? ""}`;

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <div
      ref={ref}
      className="aesthetic-card animate-fade-up-in"
      style={{
        padding: "var(--card-padding)",
        animationDelay: `${index * 60}ms`,
        animationDuration: "220ms",
        animationFillMode: "both",
      }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
        {title}
      </p>
      <div
        className={cn(
          "font-bold font-mono tabular-nums bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
          large ? "text-4xl" : "text-2xl"
        )}
      >
        {formattedCount}
      </div>

      {/* Change indicator */}
      {change !== undefined && (
        <div
          className={cn(
            "flex items-center gap-1 mt-1.5 text-xs font-medium",
            isPositive && "text-success",
            isNegative && "text-destructive",
            isNeutral && "text-muted-foreground"
          )}
        >
          {isPositive && <TrendingUp className="w-3 h-3" />}
          {isNegative && <TrendingDown className="w-3 h-3" />}
          {isNeutral && <Minus className="w-3 h-3" />}
          <span>
            {isPositive ? "+" : ""}
            {change.toFixed(1)}%
            {changeLabel ? ` · ${changeLabel}` : ""}
          </span>
        </div>
      )}

      <p className="mt-1.5 text-xs text-muted-foreground leading-snug">{description}</p>
    </div>
  );
}
