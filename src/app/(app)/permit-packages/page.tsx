"use client";

import { useState, useMemo } from "react";
import { Search, ChevronRight, CheckCircle2, Circle, AlertCircle, FileCheck, PackageCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { jobs, permitForms, sitePlans } from "@/data/mock-data";
import type { Job } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Package readiness status ───────────────────────────────────────────────────
type PackageReadiness = "Ready to Submit" | "Submitted" | "Under Review" | "Approved" | "Revision Needed" | "Incomplete";

function getPackageStatus(job: Job): PackageReadiness {
  const form = permitForms.find(f => f.jobId === job.id);
  const plan = sitePlans.find(s => s.jobId === job.id);
  if (!form) return "Incomplete";
  if (form.adhStatus === "Approved") return "Approved";
  if (form.adhStatus === "Revision Requested") return "Revision Needed";
  if (form.adhStatus === "Under Review") return "Under Review";
  if (form.adhStatus === "Submitted" || form.formStatus === "Submitted") return "Submitted";
  if (form.formStatus === "Signed" && plan && plan.drawingStatus !== "Draft" && plan.drawingStatus !== "Revision Needed") return "Ready to Submit";
  return "Incomplete";
}

function PackageStatusBadge({ status }: { status: PackageReadiness }) {
  const config: Record<PackageReadiness, string> = {
    "Ready to Submit": "bg-primary/10 text-primary",
    "Submitted":       "bg-warning/10 text-warning",
    "Under Review":    "bg-warning/10 text-warning",
    "Approved":        "bg-success/10 text-success",
    "Revision Needed": "bg-destructive/10 text-destructive",
    "Incomplete":      "bg-muted text-muted-foreground",
  };
  return (
    <span className={cn("inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full", config[status])}>
      {status}
    </span>
  );
}

// ── Completeness check ────────────────────────────────────────────────────────
interface CheckItem {
  label: string;
  done: boolean;
  note?: string;
}

function getPackageChecklist(job: Job): CheckItem[] {
  const form = permitForms.find(f => f.jobId === job.id);
  const plan = sitePlans.find(s => s.jobId === job.id);
  return [
    {
      label: "Perc test complete",
      done: job.percRate !== null,
      note: job.percRate !== null ? `${job.percRate} min/in` : "Not yet conducted",
    },
    {
      label: "System sized",
      done: job.absorptionArea !== null && job.tankSize !== null,
      note: job.absorptionArea !== null ? `${job.absorptionArea} ft² · ${job.tankSize?.toLocaleString()} gal` : "Pending perc results",
    },
    {
      label: `${form?.formType ?? "EHP-19"} form complete`,
      done: form !== undefined && form.formStatus !== "Draft",
      note: form ? form.formStatus : "Not started",
    },
    {
      label: "Property owner signature",
      done: form !== undefined && (form.formStatus === "Signed" || form.formStatus === "Submitted"),
      note: form?.formStatus === "Draft" ? "Awaiting signature" : undefined,
    },
    {
      label: "Site plan drawing",
      done: plan !== undefined && plan.drawingStatus !== "Draft",
      note: plan ? plan.drawingStatus : "Not drawn",
    },
    {
      label: "Submitted to ADH",
      done: form !== undefined && form.submittedDate !== null,
      note: form?.submittedDate
        ? new Date(form.submittedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "Pending",
    },
  ];
}

function completionPct(checklist: CheckItem[]): number {
  return Math.round((checklist.filter(c => c.done).length / checklist.length) * 100);
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ pct }: { pct: number }) {
  const color = pct === 100 ? "bg-success" : pct >= 67 ? "bg-primary" : pct >= 33 ? "bg-warning" : "bg-muted-foreground/30";
  return (
    <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
      <div className={cn("h-full rounded-full transition-all duration-300", color)} style={{ width: `${pct}%` }} />
    </div>
  );
}

// ── Expanded package detail ───────────────────────────────────────────────────
function PackageDetail({ job }: { job: Job }) {
  const checklist = getPackageChecklist(job);
  const form = permitForms.find(f => f.jobId === job.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
      {/* Checklist */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Package Checklist</p>
        <div className="space-y-2">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              {item.done
                ? <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-px" />
                : <Circle className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 mt-px" />
              }
              <div>
                <p className={cn("font-medium", item.done ? "text-foreground" : "text-muted-foreground")}>
                  {item.label}
                </p>
                {item.note && (
                  <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{item.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADH details */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">ADH Submission</p>
        <div className="space-y-2.5">
          {form?.planReviewNumber && (
            <div>
              <p className="text-muted-foreground text-[10px]">Plan Review No.</p>
              <span className="permit-code mt-0.5 inline-block">{form.planReviewNumber}</span>
            </div>
          )}
          <div>
            <p className="text-muted-foreground text-[10px]">Form Type</p>
            <p className="font-medium">{form?.formType ?? "Not assigned"}</p>
          </div>
          {form?.submittedDate && (
            <div>
              <p className="text-muted-foreground text-[10px]">Submitted</p>
              <p className="font-mono font-medium">
                {new Date(form.submittedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          )}
          {form?.approvalDate && (
            <div>
              <p className="text-muted-foreground text-[10px]">Approved</p>
              <p className="font-mono font-medium text-success">
                {new Date(form.approvalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          )}
          {form?.expiryDate && (
            <div>
              <p className="text-muted-foreground text-[10px]">Permit Expires</p>
              <p className="font-mono font-medium">
                {new Date(form.expiryDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          )}
          {job.revisionCount > 0 && (
            <div className="flex items-center gap-1.5 text-destructive">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="font-medium">{job.revisionCount} revision{job.revisionCount > 1 ? "s" : ""} from ADH</span>
            </div>
          )}
          {job.statusNote && (
            <div className="p-2.5 bg-muted/50 rounded text-[10px] text-muted-foreground italic leading-relaxed">
              {job.statusNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
type ReadinessFilter = "all" | "Ready to Submit" | "Submitted" | "Under Review" | "Approved" | "Revision Needed" | "Incomplete";

export default function PermitPackagesPage() {
  const [search, setSearch] = useState("");
  const [readinessFilter, setReadinessFilter] = useState<ReadinessFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Only show jobs that have or need a permit form (exclude PercTest Letter and Inspection standalone jobs)
  const packageJobs = useMemo(() =>
    jobs.filter(j => j.serviceType !== "PercTest Letter" && j.serviceType !== "Inspection"),
  []);

  const displayed = useMemo(() => {
    return packageJobs
      .filter(j => {
        const status = getPackageStatus(j);
        return (
          (readinessFilter === "all" || status === readinessFilter) &&
          (search === "" ||
            j.clientName.toLowerCase().includes(search.toLowerCase()) ||
            j.address.toLowerCase().includes(search.toLowerCase()) ||
            j.jobNumber.toLowerCase().includes(search.toLowerCase()) ||
            (j.planReviewNumber ?? "").toLowerCase().includes(search.toLowerCase()))
        );
      })
      .sort((a, b) => {
        const order: Record<PackageReadiness, number> = {
          "Revision Needed": 0, "Ready to Submit": 1, "Under Review": 2,
          "Submitted": 3, "Incomplete": 4, "Approved": 5,
        };
        return order[getPackageStatus(a)] - order[getPackageStatus(b)];
      });
  }, [search, readinessFilter, packageJobs]);

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Permit Packages</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Compiled EHP-19/EHP-19N submission packages with checklist status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileCheck className="w-3.5 h-3.5" /> Batch Export
          </Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {([
          { label: "Ready to Submit", count: packageJobs.filter(j => getPackageStatus(j) === "Ready to Submit").length, cls: "text-primary" },
          { label: "Under ADH Review", count: packageJobs.filter(j => ["Submitted", "Under Review"].includes(getPackageStatus(j))).length, cls: "text-warning" },
          { label: "Revision Needed", count: packageJobs.filter(j => getPackageStatus(j) === "Revision Needed").length, cls: "text-destructive" },
          { label: "Approved", count: packageJobs.filter(j => getPackageStatus(j) === "Approved").length, cls: "text-success" },
        ] as const).map(stat => (
          <div key={stat.label} className="aesthetic-card p-4">
            <p className={cn("text-2xl font-semibold font-mono tabular-nums", stat.cls)}>{stat.count}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by client, address, or plan review no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={readinessFilter} onValueChange={v => setReadinessFilter(v as ReadinessFilter)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="All packages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All packages</SelectItem>
            <SelectItem value="Ready to Submit">Ready to Submit</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Revision Needed">Revision Needed</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Incomplete">Incomplete</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} of {packageJobs.length} packages
        </span>
      </div>

      {/* Package list */}
      <div className="aesthetic-card overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[2.5fr_1.5fr_1.8fr_1fr_3fr] gap-x-4 px-5 py-2.5 border-b border-border/60 bg-muted/30">
          {["Job / Client", "County", "Package Status", "Completion", "Progress"].map(h => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</span>
          ))}
        </div>

        <div className="divide-y divide-border/40">
          {displayed.length === 0 && (
            <div className="px-5 py-10 text-sm text-muted-foreground text-center">
              No permit packages match this filter.
            </div>
          )}
          {displayed.map(job => {
            const status = getPackageStatus(job);
            const checklist = getPackageChecklist(job);
            const pct = completionPct(checklist);
            const leftBorderColor =
              status === "Approved"        ? "oklch(0.65 0.19 155)" :
              status === "Under Review" || status === "Submitted" ? "oklch(0.52 0.16 148)" :
              status === "Ready to Submit" ? "oklch(0.75 0.18 85)"  :
              status === "Revision Needed" ? "oklch(0.60 0.22 27)"  :
              "transparent";
            const isExpanded = expandedId === job.id;

            return (
              <>
                <div
                  key={job.id}
                  className={cn(
                    "border-l-[3px] cursor-pointer transition-colors duration-150",
                    "hover:bg-[color:var(--surface-hover)]",
                    isExpanded && "bg-[color:var(--surface-active)]"
                  )}
                  style={{ borderLeftColor: leftBorderColor }}
                  onClick={() => setExpandedId(isExpanded ? null : job.id)}
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid grid-cols-[2.5fr_1.5fr_1.8fr_1fr_3fr] gap-x-4 px-5 py-3.5 items-center">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-90")} />
                        <span className="text-xs font-mono font-semibold text-foreground/70">{job.jobNumber}</span>
                        {job.isSubdivision && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase tracking-wide">
                            {job.lotCount} lots
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium truncate ml-5 mt-0.5">{job.clientName}</p>
                      <p className="text-[10px] text-muted-foreground truncate ml-5">{job.address.split(",")[0]}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{job.county}</span>
                    <PackageStatusBadge status={status} />
                    <span className={cn("text-xs font-mono font-semibold tabular-nums", pct === 100 ? "text-success" : pct >= 50 ? "text-primary" : "text-warning")}>
                      {pct}%
                    </span>
                    <div className="pr-4">
                      <ProgressBar pct={pct} />
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-muted-foreground">
                          {checklist.filter(c => c.done).length}/{checklist.length} steps
                        </span>
                        {job.planReviewNumber && (
                          <span className="permit-code">{job.planReviewNumber}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden px-4 py-3.5 flex items-start gap-3">
                    <ChevronRight className={cn("w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0 transition-transform duration-200", isExpanded && "rotate-90")} />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-semibold text-foreground/70">{job.jobNumber}</span>
                        <PackageStatusBadge status={status} />
                      </div>
                      <p className="text-xs font-medium">{job.clientName}</p>
                      <p className="text-[10px] text-muted-foreground">{job.address.split(",")[0]} · {job.county}</p>
                      <div className="flex items-center gap-3">
                        <ProgressBar pct={pct} />
                        <span className="text-[10px] font-mono text-muted-foreground shrink-0">{pct}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div key={`${job.id}-detail`} className="px-5 py-4 bg-muted/20 border-b border-border/40 border-l-[3px]" style={{ borderLeftColor: leftBorderColor }}>
                    <PackageDetail job={job} />
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
