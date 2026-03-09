"use client";

import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import type { MonthlyMetric, JobsByCounty, SystemTypeBreakdown } from "@/lib/types";

// ── Tokens (must match globals.css nature-wellness theme) ─────────────────────
const C_PRIMARY  = "oklch(0.52 0.16 148)";
const C_TEAL     = "oklch(0.58 0.14 178)";
const C_AMBER    = "oklch(0.72 0.15 85)";
const C_SUCCESS  = "oklch(0.62 0.19 145)";
const C_WARN     = "oklch(0.75 0.18 85)";
const C_DESTRUCT = "oklch(0.577 0.245 27)";
const C_CHART4   = "oklch(0.68 0.15 118)";

// ── Shared tooltip style ──────────────────────────────────────────────────────
const TooltipStyle = {
  contentStyle: {
    background: "oklch(0.995 0.003 148)",
    border: "1px solid oklch(0.90 0.015 148)",
    borderRadius: "6px",
    fontSize: "11px",
    boxShadow: "0 2px 8px oklch(0.52 0.16 148 / 0.08)",
  },
  itemStyle: { color: "oklch(0.35 0.08 148)" },
  labelStyle: { color: "oklch(0.35 0.08 148)", fontWeight: 600 },
};

// ── Permit throughput chart ───────────────────────────────────────────────────
export function PermitThroughputChart({ data }: { data: MonthlyMetric[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -8, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="oklch(0.90 0.015 148)" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} />
        <Tooltip {...TooltipStyle} />
        <Legend
          wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
          formatter={(value: string) => <span style={{ color: "oklch(0.45 0.06 148)" }}>{value}</span>}
        />
        <Bar dataKey="permitsSubmitted" name="Submitted" fill={C_TEAL} radius={[3,3,0,0]} />
        <Bar dataKey="permitsApproved" name="Approved" fill={C_SUCCESS} radius={[3,3,0,0]} />
        <Bar dataKey="revisionCount" name="Revisions" fill={C_WARN} radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Avg turnaround + approval rate trend ─────────────────────────────────────
export function TurnaroundChart({ data }: { data: MonthlyMetric[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="turnaroundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C_PRIMARY} stopOpacity={0.25} />
            <stop offset="95%" stopColor={C_PRIMARY} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="oklch(0.90 0.015 148)" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} />
        <Tooltip {...TooltipStyle} formatter={(v) => [`${v} days`, "Avg review time"]} />
        <Area
          type="monotone"
          dataKey="avgTurnaroundDays"
          name="Avg Review Days"
          stroke={C_PRIMARY}
          strokeWidth={2}
          fill="url(#turnaroundGrad)"
          dot={{ fill: C_PRIMARY, r: 3 }}
          activeDot={{ r: 5, fill: C_PRIMARY }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── Revenue trend ─────────────────────────────────────────────────────────────
export function RevenueChart({ data }: { data: MonthlyMetric[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={C_AMBER} stopOpacity={0.3} />
            <stop offset="95%" stopColor={C_AMBER} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="oklch(0.90 0.015 148)" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          {...TooltipStyle}
          formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke={C_AMBER}
          strokeWidth={2}
          fill="url(#revenueGrad)"
          dot={{ fill: C_AMBER, r: 3 }}
          activeDot={{ r: 5, fill: C_AMBER }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ── County breakdown chart ─────────────────────────────────────────────────────
export function CountyChart({ data }: { data: JobsByCounty[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 4, left: 60, bottom: 0 }}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="oklch(0.90 0.015 148)" />
        <XAxis type="number" tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="county" tick={{ fontSize: 10, fill: "oklch(0.556 0 0)" }} axisLine={false} tickLine={false} width={56} />
        <Tooltip {...TooltipStyle} formatter={(v) => [v, "Jobs"]} />
        <Bar dataKey="jobs" name="Jobs" fill={C_TEAL} radius={[0,3,3,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── System type donut ─────────────────────────────────────────────────────────
const SYSTEM_COLORS = [C_PRIMARY, C_TEAL, C_AMBER, C_CHART4, C_WARN, C_DESTRUCT];

export function SystemTypeChart({ data }: { data: SystemTypeBreakdown[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="systemType"
          cx="50%"
          cy="50%"
          outerRadius={76}
          innerRadius={42}
          paddingAngle={2}
          label={false}
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={SYSTEM_COLORS[i % SYSTEM_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          {...TooltipStyle}
          formatter={(v, name) => [v, name]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "10px" }}
          formatter={(value: string) => (
            <span style={{ color: "oklch(0.45 0.06 148)" }}>
              {value.length > 28 ? value.slice(0, 28) + "…" : value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
