"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";
import {
  jobs,
  dashboardStats,
  monthlyMetrics,
  recentActivity,
} from "@/data/mock-data";
import { TopoCanvas } from "@/components/dashboard/topo-canvas";
import { PermitPipeline } from "@/components/dashboard/permit-pipeline";
import { StatCard } from "@/components/dashboard/stats-row";
import type { Job, ActivityEventType } from "@/lib/types";

// ── SSR-safe chart import ─────────────────────────────────────────────────────
const MonthlyChart = dynamic(
  () =>
    import("@/components/dashboard/monthly-chart").then((m) => m.MonthlyChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] rounded-lg bg-muted/30 animate-pulse" />
    ),
  }
);

// ── Pipeline stage config ─────────────────────────────────────────────────────
const PIPELINE_STAGES = [
  {
    label: "Site Evaluation Scheduled",
    shortLabel: "Site Visit",
    color: "oklch(0.55 0.10 55)",
    bgColor: "oklch(0.93 0.04 55)",
  },
  {
    label: "Perc Test Complete — Awaiting Design",
    shortLabel: "Perc Done",
    color: "oklch(0.70 0.15 85)",
    bgColor: "oklch(0.95 0.05 85)",
  },
  {
    label: "Design In Progress",
    shortLabel: "Drafting",
    color: "oklch(0.58 0.14 178)",
    bgColor: "oklch(0.93 0.05 178)",
  },
  {
    label: "Permit Submitted",
    shortLabel: "Submitted",
    color: "oklch(0.52 0.16 148)",
    bgColor: "oklch(0.93 0.06 148)",
  },
  {
    label: "Under ADH Review",
    shortLabel: "ADH Review",
    color: "oklch(0.75 0.18 85)",
    bgColor: "oklch(0.95 0.06 85)",
  },
  {
    label: "Revision Requested",
    shortLabel: "Revision",
    color: "oklch(0.60 0.22 27)",
    bgColor: "oklch(0.95 0.06 27)",
  },
  {
    label: "Approved — Awaiting Install",
    shortLabel: "Approved",
    color: "oklch(0.65 0.19 155)",
    bgColor: "oklch(0.93 0.07 155)",
  },
];

// ── Status to pipeline stage mapping ─────────────────────────────────────────
function getStageForJob(job: Job): string {
  return job.status;
}

// ── Stage border class ────────────────────────────────────────────────────────
function getStageBorderStyle(status: string): string {
  if (
    status === "Site Evaluation Scheduled" ||
    status === "Perc Test Complete — Awaiting Design"
  ) {
    return "border-l-[3px]";
  }
  if (status === "Design In Progress") {
    return "border-l-[3px]";
  }
  if (
    status === "Permit Submitted" ||
    status === "Under ADH Review"
  ) {
    return "border-l-[3px]";
  }
  if (
    status === "Approved — Awaiting Install" ||
    status === "Permit Issued" ||
    status === "Operation Permit Issued"
  ) {
    return "border-l-[3px]";
  }
  return "border-l-[3px]";
}

function getStageBorderColor(status: string): string {
  switch (status) {
    case "Site Evaluation Scheduled":
      return "oklch(0.55 0.10 55)";
    case "Perc Test Complete — Awaiting Design":
      return "oklch(0.70 0.15 85)";
    case "Design In Progress":
      return "oklch(0.58 0.14 178)";
    case "Permit Submitted":
    case "Under ADH Review":
      return "oklch(0.52 0.16 148)";
    case "Revision Requested":
      return "oklch(0.60 0.22 27)";
    case "Approved — Awaiting Install":
    case "Permit Issued":
    case "Operation Permit Issued":
      return "oklch(0.65 0.19 155)";
    case "Denied":
    case "Permit Expired":
    case "Cancelled":
      return "oklch(0.577 0.245 27)";
    case "On Hold":
      return "oklch(0.70 0 0)";
    default:
      return "oklch(0.75 0 0)";
  }
}

function getStatusBadgeStyle(status: string): { bg: string; text: string } {
  switch (status) {
    case "Approved — Awaiting Install":
    case "Permit Issued":
    case "Operation Permit Issued":
      return { bg: "bg-success/10", text: "text-success" };
    case "Under ADH Review":
    case "Permit Submitted":
      return { bg: "bg-warning/10", text: "text-warning-foreground" };
    case "Revision Requested":
      return { bg: "bg-destructive/10", text: "text-destructive" };
    case "Design In Progress":
    case "Perc Test Complete — Awaiting Design":
      return { bg: "bg-primary/10", text: "text-primary" };
    case "Denied":
    case "Permit Expired":
    case "Cancelled":
      return { bg: "bg-destructive/10", text: "text-destructive" };
    case "On Hold":
    default:
      return { bg: "bg-muted", text: "text-muted-foreground" };
  }
}

// ── Activity icon label ───────────────────────────────────────────────────────
function getActivityLabel(type: ActivityEventType): string {
  switch (type) {
    case "permit_submitted": return "Submitted";
    case "permit_approved": return "Approved";
    case "revision_requested": return "Revision";
    case "perc_test_completed": return "Perc Test";
    case "installation_started": return "Install";
    case "operation_permit_issued": return "Op Permit";
    case "permit_expired": return "Expired";
    case "site_flagged": return "Flagged";
    case "design_completed": return "Design Done";
    case "client_signature_received": return "Client Sig";
    case "inspection_passed": return "Inspection";
    case "job_created": return "New Job";
    default: return "Update";
  }
}

function getActivityBadgeStyle(type: ActivityEventType): string {
  switch (type) {
    case "permit_approved":
    case "operation_permit_issued":
    case "inspection_passed":
      return "bg-success/10 text-success";
    case "revision_requested":
    case "permit_expired":
    case "site_flagged":
      return "bg-destructive/10 text-destructive";
    case "permit_submitted":
    case "client_signature_received":
    case "design_completed":
      return "bg-primary/10 text-primary";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function ActiveProjectsPage() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [chartView, setChartView] = useState<"permits" | "revenue">("permits");

  // Build pipeline stage counts from live jobs data
  const pipelineStages = useMemo(() => {
    return PIPELINE_STAGES.map((stage) => ({
      ...stage,
      count: jobs.filter((j) => j.status === stage.label).length,
      active: activeStage === stage.label,
    }));
  }, [activeStage]);

  // Filter jobs by selected pipeline stage
  const filteredJobs = useMemo(() => {
    const activeJobs = jobs.filter(
      (j) =>
        j.status !== "Denied" &&
        j.status !== "Cancelled" &&
        j.status !== "Permit Expired" &&
        j.status !== "Operation Permit Issued"
    );
    if (!activeStage) return activeJobs;
    return activeJobs.filter((j) => j.status === activeStage);
  }, [activeStage]);

  // Days since job created
  const daysSince = (dateStr: string): number => {
    const created = new Date(dateStr);
    const now = new Date("2026-03-08");
    return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  };

  const activeJobCount = jobs.filter(
    (j) =>
      j.status !== "Denied" &&
      j.status !== "Cancelled" &&
      j.status !== "Permit Expired" &&
      j.status !== "Operation Permit Issued"
  ).length;

  return (
    <div className="page-container space-y-6 min-h-full">

      {/* ── Hero Section: Topo Canvas + Title + Pipeline ──────────────────── */}
      <div className="relative rounded-xl overflow-hidden border border-border/60 min-h-[220px]">
        {/* Canvas background */}
        <TopoCanvas className="opacity-70" lineCount={110} />

        {/* Content overlaid on canvas */}
        <div className="relative z-10 p-6 pb-5">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Active Projects
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {activeJobCount} jobs in pipeline · {dashboardStats.revisionsPending} awaiting resubmission · NW Arkansas
            </p>
          </div>

          {/* Permit pipeline stage tracker */}
          <PermitPipeline
            stages={pipelineStages}
            activeStage={activeStage}
            onStageClick={setActiveStage}
          />
        </div>
      </div>

      {/* ── KPI Stats Row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          index={0}
          title="Active Permits"
          value={dashboardStats.activePermits}
          change={dashboardStats.activePermitsChange}
          changeLabel="vs. prior month"
          description={`${dashboardStats.revisionsPending} pending resubmission · ADH pipeline`}
        />
        <StatCard
          index={1}
          title="Jobs This Month"
          value={dashboardStats.jobsThisMonth}
          change={dashboardStats.jobsThisMonthChange}
          changeLabel="vs. March"
          description={`${dashboardStats.percTestsScheduled} perc tests scheduled this week`}
        />
        <StatCard
          index={2}
          title="Pending Invoices"
          value={dashboardStats.pendingInvoices}
          prefix="$"
          decimals={0}
          change={dashboardStats.pendingInvoicesChange}
          changeLabel="vs. prior month"
          description="Billed + Unpaid · across active jobs"
        />
        <StatCard
          index={3}
          title="Avg ADH Review"
          value={dashboardStats.avgReviewDays}
          unit=" days"
          decimals={1}
          change={dashboardStats.avgReviewDaysChange}
          changeLabel="review time improving"
          description={`${dashboardStats.approvalRate}% approval rate · 12-mo window`}
        />
      </div>

      {/* ── Jobs List ──────────────────────────────────────────────────────── */}
      <div className="aesthetic-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">
              {activeStage ? `${activeStage}` : "All Active Jobs"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""}
              {activeStage ? " in this stage" : " · click pipeline stage to filter"}
            </p>
          </div>
          {activeStage && (
            <button
              onClick={() => setActiveStage(null)}
              className="text-xs text-muted-foreground hover:text-foreground border border-border/60 px-2.5 py-1 rounded-md transition-colors duration-200"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Table header — desktop */}
        <div className="hidden lg:grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.8fr_1fr_0.9fr] gap-x-3 px-5 py-2 border-b border-border/40 bg-muted/30">
          {["Job / Address", "Client", "County", "System", "DR", "Status", "Days Active"].map((h) => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {h}
            </span>
          ))}
        </div>

        {/* Job rows */}
        <div className="divide-y divide-border/40">
          {filteredJobs.length === 0 && (
            <div className="px-5 py-8 text-sm text-muted-foreground text-center">
              No jobs in this stage.
            </div>
          )}
          {filteredJobs.map((job) => {
            const stageBorderColor = getStageBorderColor(job.status);
            const badgeStyle = getStatusBadgeStyle(job.status);
            const daysActive = daysSince(job.createdAt);

            return (
              <div
                key={job.id}
                className={cn(
                  "aesthetic-hover px-5 py-3.5 cursor-default",
                  getStageBorderStyle(job.status)
                )}
                style={{ borderLeftColor: stageBorderColor }}
              >
                {/* Desktop layout */}
                <div className="hidden lg:grid grid-cols-[2fr_1.2fr_1fr_0.8fr_0.8fr_1fr_0.9fr] gap-x-3 items-center">
                  {/* Job / Address */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold font-mono text-foreground/70">
                        {job.jobNumber}
                      </span>
                      {job.isSubdivision && (
                        <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wide">
                          Subdivision
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {job.address.split(",")[0]}
                    </p>
                    {job.planReviewNumber && (
                      <span className="permit-code mt-0.5 inline-block">
                        {job.planReviewNumber}
                      </span>
                    )}
                  </div>

                  {/* Client */}
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">{job.clientName}</p>
                    <p className="text-[10px] text-muted-foreground">{job.clientType}</p>
                  </div>

                  {/* County */}
                  <span className="text-xs text-muted-foreground">{job.county}</span>

                  {/* System */}
                  <span className="text-xs text-muted-foreground truncate">
                    {job.systemType ?? "—"}
                  </span>

                  {/* DR */}
                  <span className="text-xs text-muted-foreground truncate">
                    {/* Map DR ID to name — use assignedDR field directly if it's a name */}
                    {job.assignedDR === "crw_bd1p2"
                      ? "Bodie Drake"
                      : job.assignedDR === "crw_kk3r7"
                      ? "Kriss Kelley"
                      : job.assignedDR === "crw_dh5m4"
                      ? "Daniel Howard"
                      : job.assignedDR}
                  </span>

                  {/* Status */}
                  <div>
                    <span
                      className={cn(
                        "inline-flex text-[10px] font-medium px-2 py-0.5 rounded-full",
                        badgeStyle.bg,
                        badgeStyle.text
                      )}
                    >
                      {job.status.length > 22
                        ? job.status.slice(0, 22) + "…"
                        : job.status}
                    </span>
                    {job.revisionCount > 0 && (
                      <p className="text-[10px] text-destructive mt-0.5 font-medium">
                        {job.revisionCount} revision{job.revisionCount > 1 ? "s" : ""}
                      </p>
                    )}
                  </div>

                  {/* Days */}
                  <span
                    className={cn(
                      "text-xs font-mono tabular-nums text-right",
                      daysActive > 60 ? "text-warning" : "text-muted-foreground"
                    )}
                  >
                    {daysActive}d
                  </span>
                </div>

                {/* Mobile layout */}
                <div className="lg:hidden flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold font-mono text-foreground/70">
                        {job.jobNumber}
                      </span>
                      <span
                        className={cn(
                          "inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                          badgeStyle.bg,
                          badgeStyle.text
                        )}
                      >
                        {job.status.length > 16
                          ? job.status.slice(0, 16) + "…"
                          : job.status}
                      </span>
                    </div>
                    <p className="text-xs text-foreground truncate">{job.clientName}</p>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {job.address.split(",")[0]} · {job.county}
                    </p>
                    {job.planReviewNumber && (
                      <span className="permit-code mt-1 inline-block">
                        {job.planReviewNumber}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground shrink-0">
                    {daysActive}d
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Chart Section ──────────────────────────────────────────────────── */}
      <div className="aesthetic-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-sm font-semibold">
              {chartView === "permits" ? "Monthly Permit Throughput" : "Monthly Revenue Trend"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {chartView === "permits"
                ? "Submitted vs. approved vs. revisions — 12 months"
                : "Billable revenue — 12 months (Mar–Feb)"}
            </p>
          </div>
          <div className="flex gap-2">
            {(["permits", "revenue"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setChartView(v)}
                className={cn(
                  "px-3 py-1.5 text-xs rounded-md border transition-colors duration-200",
                  chartView === v
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:bg-surface-hover"
                )}
              >
                {v === "permits" ? "Permits" : "Revenue"}
              </button>
            ))}
          </div>
        </div>
        <div className="px-3 py-4">
          <MonthlyChart data={monthlyMetrics} view={chartView} />
        </div>
      </div>

      {/* ── Recent Activity Feed ───────────────────────────────────────────── */}
      <div className="aesthetic-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/60">
          <h2 className="text-sm font-semibold">Recent Activity</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Latest permit events across all jobs</p>
        </div>
        <div className="divide-y divide-border/40">
          {recentActivity.slice(0, 8).map((event) => (
            <div
              key={event.id}
              className="aesthetic-hover px-5 py-3 flex items-start gap-3"
            >
              <span
                className={cn(
                  "inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5",
                  getActivityBadgeStyle(event.eventType)
                )}
              >
                {getActivityLabel(event.eventType)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-mono font-medium text-foreground/60">
                    {event.jobNumber}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {event.county} County
                  </span>
                </div>
                <p className="text-xs text-foreground/80 mt-0.5 leading-relaxed line-clamp-2">
                  {event.description}
                </p>
                {event.drName && (
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {event.drName}
                  </p>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0 tabular-nums">
                {new Date(event.timestamp).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Proposal Banner ────────────────────────────────────────────────── */}
      <div className="p-4 rounded-lg border border-primary/15 bg-gradient-to-r from-primary/5 to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">
            Live demo built for{" "}
            {APP_CONFIG.clientName ?? APP_CONFIG.projectName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Humam · Full-Stack Developer · Available now
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/challenges"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            My approach →
          </a>
          <a
            href="/proposal"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Work with me
          </a>
        </div>
      </div>
    </div>
  );
}
