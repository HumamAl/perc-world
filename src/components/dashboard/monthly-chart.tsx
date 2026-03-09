"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { MonthlyMetric } from "@/lib/types";

interface TooltipEntry {
  color?: string;
  name?: string;
  value?: number | string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-background p-3 text-sm shadow-sm">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-muted-foreground flex items-center gap-2 text-xs"
        >
          <span
            className="inline-block w-2 h-2 rounded-sm shrink-0"
            style={{ backgroundColor: entry.color as string }}
          />
          {entry.name}:{" "}
          <span className="font-mono font-medium text-foreground">
            {entry.value}
          </span>
        </p>
      ))}
    </div>
  );
};

interface Props {
  data: MonthlyMetric[];
  view: "permits" | "revenue";
}

export function MonthlyChart({ data, view }: Props) {
  if (view === "revenue") {
    const revenueData = data.map((d) => ({
      month: d.month,
      Revenue: Math.round(d.revenue / 1000),
    }));

    return (
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={revenueData}
          margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
          barCategoryGap="30%"
        >
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={1} />
              <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
            strokeOpacity={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="Revenue"
            fill="url(#revGrad)"
            radius={[4, 4, 0, 0]}
            name="Revenue ($k)"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Permits view
  const permitData = data.map((d) => ({
    month: d.month,
    Submitted: d.permitsSubmitted,
    Approved: d.permitsApproved,
    Revisions: d.revisionCount,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={permitData}
        margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
        barCategoryGap="25%"
        barGap={2}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--border)"
          strokeOpacity={0.5}
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconSize={8}
          iconType="square"
          wrapperStyle={{ fontSize: 11 }}
        />
        <Bar
          dataKey="Submitted"
          fill="var(--chart-1)"
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="Approved"
          fill="var(--chart-2)"
          radius={[3, 3, 0, 0]}
        />
        <Bar
          dataKey="Revisions"
          fill="var(--chart-5)"
          radius={[3, 3, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
