"use client";

import { useState, useMemo } from "react";
import { CheckCircle2, Circle, Clock, AlertTriangle, MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { jobs, permitForms, fieldEvents, getCrewMemberById } from "@/data/mock-data";
import type { Job } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Permit journey stages (simplified for client view) ────────────────────────
interface JourneyStage {
  id: string;
  label: string;
  sublabel: string;
  statusTest: (job: Job) => "done" | "active" | "pending";
  dateField?: (job: Job) => string | null;
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "eval",
    label: "Site Evaluation",
    sublabel: "Perc test & soil profile",
    statusTest: (j) => j.percRate !== null ? "done" : j.status === "Site Evaluation Scheduled" ? "active" : "pending",
    dateField: () => null,
  },
  {
    id: "design",
    label: "System Design",
    sublabel: "Sizing & site plan drawing",
    statusTest: (j) => {
      const postDesign = ["Permit Submitted","Under ADH Review","Revision Requested","Approved — Awaiting Install","Installation In Progress","Inspection Scheduled","Permit Issued","Operation Permit Issued"];
      if (postDesign.includes(j.status)) return "done";
      if (j.status === "Perc Test Complete — Awaiting Design" || j.status === "Design In Progress") return "active";
      return "pending";
    },
  },
  {
    id: "permit",
    label: "Permit Submitted",
    sublabel: "EHP-19 filed with ADH",
    statusTest: (j) => {
      const submitted = ["Permit Submitted","Under ADH Review","Revision Requested","Approved — Awaiting Install","Installation In Progress","Inspection Scheduled","Permit Issued","Operation Permit Issued"];
      if (submitted.includes(j.status)) return "done";
      return "pending";
    },
  },
  {
    id: "review",
    label: "ADH Review",
    sublabel: "Department of Health approval",
    statusTest: (j) => {
      if (["Approved — Awaiting Install","Installation In Progress","Inspection Scheduled","Permit Issued","Operation Permit Issued"].includes(j.status)) return "done";
      if (j.status === "Under ADH Review") return "active";
      if (j.status === "Revision Requested") return "active";
      return "pending";
    },
  },
  {
    id: "install",
    label: "Installation",
    sublabel: "Licensed installer on site",
    statusTest: (j) => {
      if (["Permit Issued","Operation Permit Issued"].includes(j.status)) return "done";
      if (j.status === "Installation In Progress" || j.status === "Inspection Scheduled") return "active";
      return "pending";
    },
  },
  {
    id: "opermit",
    label: "Operation Permit",
    sublabel: "Final ADH sign-off",
    statusTest: (j) => j.status === "Operation Permit Issued" ? "done" : "pending",
  },
];

// ── Stage icon ────────────────────────────────────────────────────────────────
function StageIcon({ status }: { status: "done" | "active" | "pending" }) {
  if (status === "done") return <CheckCircle2 className="w-5 h-5 text-success" />;
  if (status === "active") return <Clock className="w-5 h-5 text-warning animate-pulse" />;
  return <Circle className="w-5 h-5 text-muted-foreground/30" />;
}

// ── Status badge for client ───────────────────────────────────────────────────
function ClientStatusBadge({ status }: { status: string }) {
  const friendly: Record<string, { label: string; cls: string }> = {
    "Site Evaluation Scheduled":          { label: "Site Visit Scheduled",      cls: "bg-muted text-muted-foreground" },
    "Perc Test Complete — Awaiting Design":{ label: "Design In Progress",        cls: "bg-primary/10 text-primary" },
    "Design In Progress":                 { label: "Design In Progress",        cls: "bg-primary/10 text-primary" },
    "Permit Submitted":                   { label: "Permit Filed",              cls: "bg-primary/10 text-primary" },
    "Under ADH Review":                   { label: "Under ADH Review",          cls: "bg-warning/10 text-warning" },
    "Revision Requested":                 { label: "ADH Revision Requested",    cls: "bg-destructive/10 text-destructive" },
    "Approved — Awaiting Install":        { label: "Permit Approved",           cls: "bg-success/10 text-success" },
    "Installation In Progress":           { label: "Installation Underway",     cls: "bg-primary/10 text-primary" },
    "Inspection Scheduled":               { label: "Inspection Scheduled",      cls: "bg-warning/10 text-warning" },
    "Permit Issued":                      { label: "Permit Issued",             cls: "bg-success/10 text-success" },
    "Operation Permit Issued":            { label: "System Approved",           cls: "bg-success/10 text-success font-bold" },
    "On Hold":                            { label: "On Hold",                   cls: "bg-muted text-muted-foreground" },
    "Permit Expired":                     { label: "Permit Expired",            cls: "bg-destructive/10 text-destructive" },
    "Denied":                             { label: "Application Denied",        cls: "bg-destructive/10 text-destructive" },
    "Cancelled":                          { label: "Cancelled",                 cls: "bg-muted text-muted-foreground" },
  };
  const c = friendly[status] ?? { label: status, cls: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("inline-flex text-xs font-semibold px-3 py-1 rounded-full", c.cls)}>
      {c.label}
    </span>
  );
}

// ── Client-visible jobs ───────────────────────────────────────────────────────
const clientJobs = jobs.filter(j =>
  j.status !== "Denied" && j.status !== "Cancelled" && j.status !== "Permit Expired"
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ClientPortalPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>(clientJobs[0]?.id ?? "");

  const job = useMemo(() => clientJobs.find(j => j.id === selectedJobId), [selectedJobId]);
  const form = useMemo(() => job ? permitForms.find(f => f.jobId === job.id) : undefined, [job]);
  const dr = useMemo(() => job ? getCrewMemberById(job.assignedDR) : undefined, [job]);
  const upcomingEvents = useMemo(() =>
    job ? fieldEvents.filter(e => e.jobId === job.id && e.status === "Scheduled") : [],
  [job]);

  if (!job) return null;

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Client Portal</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Simplified permit status view for property owners and builders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Viewing as client:</span>
          <Select value={selectedJobId} onValueChange={setSelectedJobId}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clientJobs.map(j => (
                <SelectItem key={j.id} value={j.id}>
                  {j.jobNumber} — {j.clientName.length > 28 ? j.clientName.slice(0, 28) + "…" : j.clientName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Portal content — what a client actually sees */}
      <div className="max-w-2xl space-y-5">

        {/* Project overview card */}
        <div
          className={cn(
            "aesthetic-card p-5 border-l-[3px]",
            job.status === "Approved — Awaiting Install" || job.status === "Permit Issued" || job.status === "Operation Permit Issued"
              ? "border-l-[oklch(0.65_0.19_155)]"
              : job.status === "Revision Requested"
              ? "border-l-[oklch(0.60_0.22_27)]"
              : job.status === "Under ADH Review" || job.status === "Permit Submitted"
              ? "border-l-[oklch(0.52_0.16_148)]"
              : "border-l-[oklch(0.75_0.18_85)]"
          )}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground">{job.jobNumber}</span>
                <ClientStatusBadge status={job.status} />
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{job.address}</span>
              </div>
              {form?.planReviewNumber && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>ADH Plan Review:</span>
                  <span className="permit-code">{form.planReviewNumber}</span>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">System type</p>
              <p className="text-sm font-medium">{job.systemType ?? "Pending assessment"}</p>
              {job.bedroomCount > 0 && (
                <p className="text-xs text-muted-foreground mt-0.5">{job.bedroomCount}-bedroom</p>
              )}
            </div>
          </div>

          {job.status === "Revision Requested" && job.statusNote && (
            <div className="mt-4 p-3 rounded bg-destructive/5 border border-destructive/15 text-xs text-destructive/80">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px text-destructive" />
                <p className="leading-relaxed">{job.statusNote}</p>
              </div>
            </div>
          )}
        </div>

        {/* Permit journey timeline */}
        <div className="aesthetic-card p-5">
          <h2 className="text-sm font-semibold mb-5">Permit Journey</h2>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[9px] top-5 bottom-5 w-px bg-border/60" />

            <div className="space-y-5">
              {JOURNEY_STAGES.map((stage, i) => {
                const status = stage.statusTest(job);
                return (
                  <div key={stage.id} className="flex items-start gap-4 relative">
                    <div className="shrink-0 relative z-10 bg-card">
                      <StageIcon status={status} />
                    </div>
                    <div className={cn("pb-0 min-w-0 flex-1", i < JOURNEY_STAGES.length - 1 && "pb-1")}>
                      <div className="flex items-center gap-3">
                        <p className={cn(
                          "text-sm font-medium",
                          status === "done" ? "text-foreground" :
                          status === "active" ? "text-foreground" :
                          "text-muted-foreground"
                        )}>
                          {stage.label}
                        </p>
                        {status === "active" && (
                          <span className="text-[10px] font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-xs mt-0.5",
                        status === "pending" ? "text-muted-foreground/50" : "text-muted-foreground"
                      )}>
                        {stage.sublabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming field events */}
        {upcomingEvents.length > 0 && (
          <div className="aesthetic-card p-5">
            <h2 className="text-sm font-semibold mb-3">Upcoming Schedule</h2>
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  <div>
                    <p className="font-medium">{event.eventType}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" })} at {event.timeSlot}
                    </p>
                    {event.notes && (
                      <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{event.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved documents */}
        {form?.approvalDate && (
          <div className="aesthetic-card p-5">
            <h2 className="text-sm font-semibold mb-3">Approved Documents</h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between py-2 border-b border-border/40">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Permit for Construction</span>
                </div>
                <span className="permit-code">{form.planReviewNumber}</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1 pt-1">
                <div className="flex justify-between">
                  <span>Approved</span>
                  <span className="font-mono">
                    {new Date(form.approvalDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                {form.expiryDate && (
                  <div className="flex justify-between">
                    <span>Permit valid until</span>
                    <span className="font-mono">
                      {new Date(form.expiryDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Your DR contact */}
        {dr && (
          <div className="aesthetic-card p-5">
            <h2 className="text-sm font-semibold mb-3">Your Designated Representative</h2>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-medium">{dr.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{dr.role}</p>
                {dr.licenseNumber && (
                  <span className="permit-code mt-1 inline-block">{dr.licenseNumber}</span>
                )}
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{dr.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{dr.email}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
