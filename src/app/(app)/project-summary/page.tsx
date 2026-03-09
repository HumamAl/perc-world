"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { monthlyMetrics, jobsByCounty, systemTypeBreakdown } from "@/data/mock-data";
import type { MonthlyMetric } from "@/lib/types";
import { Button } from "@/components/ui/button";

// ── SSR-safe chart imports ─────────────────────────────────────────────────────
const PermitThroughputChart = dynamic(
  () => import("@/components/summary/summary-charts").then(m => m.PermitThroughputChart),
  { ssr: false, loading: () => <div className="h-[240px] bg-muted/30 rounded animate-pulse" /> }
);
const TurnaroundChart = dynamic(
  () => import("@/components/summary/summary-charts").then(m => m.TurnaroundChart),
  { ssr: false, loading: () => <div className="h-[240px] bg-muted/30 rounded animate-pulse" /> }
);
const RevenueChart = dynamic(
  () => import("@/components/summary/summary-charts").then(m => m.RevenueChart),
  { ssr: false, loading: () => <div className="h-[240px] bg-muted/30 rounded animate-pulse" /> }
);
const CountyChart = dynamic(
  () => import("@/components/summary/summary-charts").then(m => m.CountyChart),
  { ssr: false, loading: () => <div className="h-[200px] bg-muted/30 rounded animate-pulse" /> }
);
const SystemTypeChart = dynamic(
  () => import("@/components/summary/summary-charts").then(m => m.SystemTypeChart),
  { ssr: false, loading: () => <div className="h-[200px] bg-muted/30 rounded animate-pulse" /> }
);

// ── Timeframe filter ──────────────────────────────────────────────────────────
type Timeframe = "3mo" | "6mo" | "12mo";

function filterByTimeframe(data: MonthlyMetric[], tf: Timeframe): MonthlyMetric[] {
  const n = tf === "3mo" ? 3 : tf === "6mo" ? 6 : 12;
  return data.slice(-n);
}

// ── KPI stat card ──────────────────────────────────────────────────────────────
interface KpiCardProps {
  title: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  index: number;
}

function KpiCard({ title, value, delta, deltaLabel, index }: KpiCardProps) {
  const positive = delta !== undefined && delta > 0;
  const negative = delta !== undefined && delta < 0;
  const neutral = delta === undefined || delta === 0;

  return (
    <div
      className="aesthetic-card p-4 animate-fade-up-in"
      style={{ animationDelay: `${index * 60}ms`, animationDuration: "220ms", animationFillMode: "both" }}
    >
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-2xl font-semibold font-mono tabular-nums mt-1 tracking-tight">{value}</p>
      {delta !== undefined && (
        <div className={cn(
          "flex items-center gap-1 mt-1.5 text-xs font-medium",
          positive ? "text-success" : negative ? "text-destructive" : "text-muted-foreground"
        )}>
          {positive ? <TrendingUp className="w-3 h-3" /> : negative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          <span>{positive ? "+" : ""}{delta.toFixed(1)}{deltaLabel}</span>
        </div>
      )}
    </div>
  );
}

// ── Derived KPIs from filtered data ───────────────────────────────────────────
function computeKpis(data: MonthlyMetric[]) {
  const totalSubmitted = data.reduce((s, d) => s + d.permitsSubmitted, 0);
  const totalApproved  = data.reduce((s, d) => s + d.permitsApproved, 0);
  const totalRevisions = data.reduce((s, d) => s + d.revisionCount, 0);
  const totalRevenue   = data.reduce((s, d) => s + d.revenue, 0);
  const avgTurnaround  = data.reduce((s, d) => s + d.avgTurnaroundDays, 0) / (data.length || 1);
  const approvalRate   = totalSubmitted > 0 ? ((totalApproved / totalSubmitted) * 100) : 0;
  const revisionRate   = totalSubmitted > 0 ? ((totalRevisions / totalSubmitted) * 100) : 0;
  return { totalSubmitted, totalApproved, totalRevisions, totalRevenue, avgTurnaround, approvalRate, revisionRate };
}

// ── Chart section wrapper ─────────────────────────────────────────────────────
function ChartCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="aesthetic-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border/60">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <div className="px-4 pt-4 pb-3">
        {children}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProjectSummaryPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("12mo");

  const filteredMonthly = useMemo(() => filterByTimeframe(monthlyMetrics, timeframe), [timeframe]);
  const kpis = useMemo(() => computeKpis(filteredMonthly), [filteredMonthly]);

  // KPI deltas: compare first half vs second half of filtered range
  const halfLen = Math.floor(filteredMonthly.length / 2);
  const firstHalf = filteredMonthly.slice(0, halfLen);
  const secondHalf = filteredMonthly.slice(halfLen);
  const prevRevenue = firstHalf.reduce((s, d) => s + d.revenue, 0);
  const currRevenue = secondHalf.reduce((s, d) => s + d.revenue, 0);
  const revenueDelta = prevRevenue > 0 ? ((currRevenue - prevRevenue) / prevRevenue) * 100 : 0;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Project Summary</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Permit throughput, ADH review performance, revenue analytics
          </p>
        </div>
        {/* Timeframe selector */}
        <div className="flex items-center gap-1 border border-border/60 rounded-lg p-0.5 bg-muted/20">
          {(["3mo", "6mo", "12mo"] as Timeframe[]).map(tf => (
            <Button
              key={tf}
              variant="ghost"
              size="sm"
              className={cn(
                "text-xs h-7 px-3 rounded-md transition-colors duration-150",
                timeframe === tf ? "bg-card shadow-sm text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard
          index={0}
          title="Permits Submitted"
          value={String(kpis.totalSubmitted)}
          delta={undefined}
        />
        <KpiCard
          index={1}
          title="Approval Rate"
          value={`${kpis.approvalRate.toFixed(0)}%`}
          delta={kpis.approvalRate - 75}
          deltaLabel="% vs 75% target"
        />
        <KpiCard
          index={2}
          title="Avg ADH Review"
          value={`${kpis.avgTurnaround.toFixed(1)} days`}
          delta={-(kpis.avgTurnaround - 15)}
          deltaLabel=" vs 15-day target"
        />
        <KpiCard
          index={3}
          title="Revenue"
          value={`$${(kpis.totalRevenue / 1000).toFixed(0)}k`}
          delta={revenueDelta}
          deltaLabel="% vs prior period"
        />
      </div>

      {/* Permit throughput — full width */}
      <ChartCard
        title="Permit Throughput"
        description={`Submitted vs. approved vs. revisions — ${timeframe === "12mo" ? "12 months" : timeframe === "6mo" ? "6 months" : "last 3 months"}`}
      >
        <PermitThroughputChart data={filteredMonthly} />
      </ChartCard>

      {/* Turnaround + Revenue — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title="ADH Review Time Trend"
          description="Avg business days from EHP-19 submission to approval"
        >
          <TurnaroundChart data={filteredMonthly} />
        </ChartCard>
        <ChartCard
          title="Monthly Revenue"
          description="Billable revenue — design, perc testing, installs"
        >
          <RevenueChart data={filteredMonthly} />
        </ChartCard>
      </div>

      {/* County breakdown + System type — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard
          title="Jobs by County"
          description="Geographic distribution of active permit work"
        >
          <CountyChart data={jobsByCounty} />
        </ChartCard>
        <ChartCard
          title="System Type Distribution"
          description="Conventional, ATU, pumped, and other system types"
        >
          <SystemTypeChart data={systemTypeBreakdown} />
        </ChartCard>
      </div>

      {/* Seasonal note */}
      <div className="p-4 rounded-lg border border-primary/15 bg-primary/5 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">Seasonal note:</span> Spring (March–June) is peak season for perc tests and new construction permits in NW Arkansas. Winter months (Dec–Feb) show reduced field activity due to frozen ground conditions affecting perc test scheduling.
      </div>
    </div>
  );
}
