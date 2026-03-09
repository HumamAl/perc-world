"use client";

import { useState, useMemo } from "react";
import { Search, LayoutGrid, List, MapPin, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { sitePlans, getJobById } from "@/data/mock-data";
import type { DrawingStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Drawing status badge ───────────────────────────────────────────────────────
function DrawingStatusBadge({ status }: { status: DrawingStatus }) {
  const config: Record<DrawingStatus, { cls: string; icon: React.ReactNode }> = {
    Approved:          { cls: "bg-success/10 text-success",         icon: <CheckCircle2 className="w-3 h-3" /> },
    "Under Review":    { cls: "bg-warning/10 text-warning",         icon: <Clock className="w-3 h-3" /> },
    "Revision Needed": { cls: "bg-destructive/10 text-destructive", icon: <AlertTriangle className="w-3 h-3" /> },
    Draft:             { cls: "bg-muted text-muted-foreground",      icon: null },
  };
  const c = config[status] ?? { cls: "bg-muted text-muted-foreground", icon: null };
  return (
    <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full", c.cls)}>
      {c.icon}
      {status}
    </span>
  );
}

// ── Setback compliance indicator ──────────────────────────────────────────────
function SetbackCheck({ value, min, label }: { value: number | null; min: number; label: string }) {
  if (value === null) return null;
  const ok = value >= min;
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0 mt-px", ok ? "bg-success" : "bg-destructive")} />
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-mono font-medium tabular-nums", ok ? "text-foreground" : "text-destructive")}>
        {value} ft
      </span>
    </div>
  );
}

// ── Site plan sketch ──────────────────────────────────────────────────────────
function SitePlanSketch({ plan }: { plan: (typeof sitePlans)[0] }) {
  return (
    <div className="relative w-full aspect-[4/3] bg-muted/30 rounded overflow-hidden border border-border/40">
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        {[1,2,3,4,5].map(i => (
          <line key={`h${i}`} x1="0" y1={`${i * 20}%`} x2="100%" y2={`${i * 20}%`} stroke="currentColor" strokeWidth="0.5" />
        ))}
        {[1,2,3,4].map(i => (
          <line key={`v${i}`} x1={`${i * 25}%`} y1="0" x2={`${i * 25}%`} y2="100%" stroke="currentColor" strokeWidth="0.5" />
        ))}
      </svg>
      {/* Property boundary */}
      <div className="absolute inset-2 border border-dashed border-border/60 rounded" />
      {/* Dwelling */}
      <div
        className="absolute bg-card border-2 border-border/80 rounded-sm flex items-center justify-center"
        style={{ left: "14%", top: "16%", width: "28%", height: "22%" }}
      >
        <span className="text-[8px] font-semibold text-muted-foreground uppercase tracking-wide">Dwelling</span>
      </div>
      {/* Septic tank */}
      <div
        className="absolute bg-primary/10 border border-primary/30 rounded-sm flex items-center justify-center"
        style={{ left: "50%", top: "24%", width: "14%", height: "10%" }}
      >
        <span className="text-[7px] font-medium text-primary">Tank</span>
      </div>
      {/* Field lines */}
      {[0,1,2].map(i => (
        <div key={i} className="absolute h-[2px] bg-success/50 rounded" style={{ left: "44%", top: `${50 + i * 9}%`, width: "38%" }} />
      ))}
      <span className="absolute text-[7px] font-medium text-success/70" style={{ left: "44%", top: "72%" }}>Field Lines</span>
      {/* Benchmark */}
      <div className="absolute w-3 h-3 rounded-full bg-accent/60 border border-accent flex items-center justify-center" style={{ left: "6%", top: "12%" }}>
        <span className="text-[5px] font-bold text-accent-foreground">BM</span>
      </div>
      {/* Soil pits */}
      {[{ l: "36%", t: "42%" }, { l: "62%", t: "16%" }, { l: "78%", t: "42%" }, { l: "52%", t: "62%" }]
        .slice(0, Math.min(plan.soilPitCount, 4))
        .map((pos, i) => (
          <div key={i} className="absolute w-2 h-2 rounded-full border border-border bg-muted" style={{ left: pos.l, top: pos.t }} />
        ))}
      <div className="absolute bottom-2 right-2 text-[8px] text-muted-foreground font-semibold">N↑</div>
      <div className="absolute bottom-2 left-2 text-[8px] text-muted-foreground font-mono">BM {plan.benchmarkElevation.toFixed(1)} ft</div>
    </div>
  );
}

// ── Card view ─────────────────────────────────────────────────────────────────
function SitePlanCard({ plan, index }: { plan: (typeof sitePlans)[0]; index: number }) {
  const job = getJobById(plan.jobId);
  const leftBorderColor =
    plan.drawingStatus === "Approved"          ? "oklch(0.65 0.19 155)" :
    plan.drawingStatus === "Under Review"      ? "oklch(0.52 0.16 148)" :
    plan.drawingStatus === "Revision Needed"   ? "oklch(0.60 0.22 27)"  :
    "transparent";

  return (
    <div
      className="aesthetic-card border-l-[3px] overflow-hidden animate-fade-up-in"
      style={{
        borderLeftColor: leftBorderColor,
        animationDelay: `${index * 60}ms`,
        animationDuration: "220ms",
        animationFillMode: "both",
      }}
    >
      <div className="p-3 pb-0">
        <SitePlanSketch plan={plan} />
      </div>
      <div className="p-3 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate">{plan.address.split(",")[0]}</p>
            <p className="text-[10px] text-muted-foreground">{plan.address.split(",").slice(1).join(",").trim()}</p>
          </div>
          <DrawingStatusBadge status={plan.drawingStatus} />
        </div>

        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
          <span className="permit-code">
            {plan.gpsLat.toFixed(4)}°N, {Math.abs(plan.gpsLng).toFixed(4)}°W
          </span>
        </div>

        <div className="text-[10px] text-muted-foreground space-y-0.5">
          <p className="truncate" title={plan.tankPlacement}>
            <span className="font-medium text-foreground/70">Tank: </span>{plan.tankPlacement}
          </p>
          <p className="truncate" title={plan.fieldLineLayout}>
            <span className="font-medium text-foreground/70">Lines: </span>{plan.fieldLineLayout}
          </p>
        </div>

        <div className="pt-1.5 border-t border-border/40 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Setbacks</p>
          <SetbackCheck value={plan.setbackPropertyLineFt} min={10} label="Property line" />
          <SetbackCheck value={plan.setbackDwellingFt} min={10} label="Dwelling" />
          {plan.setbackWellFt !== null && <SetbackCheck value={plan.setbackWellFt} min={100} label="Well" />}
          {plan.setbackWaterBodyFt !== null && <SetbackCheck value={plan.setbackWaterBodyFt} min={100} label="Water body" />}
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
          <span>{plan.soilPitCount} soil pits · {plan.drawnBy.split(" ")[0]}</span>
          {job && <span className="font-mono">{job.jobNumber}</span>}
        </div>
      </div>
    </div>
  );
}

// ── List row view ─────────────────────────────────────────────────────────────
function SitePlanRow({ plan }: { plan: (typeof sitePlans)[0] }) {
  const job = getJobById(plan.jobId);
  const leftBorderColor =
    plan.drawingStatus === "Approved"         ? "oklch(0.65 0.19 155)" :
    plan.drawingStatus === "Under Review"     ? "oklch(0.52 0.16 148)" :
    plan.drawingStatus === "Revision Needed"  ? "oklch(0.60 0.22 27)"  :
    "transparent";

  return (
    <div
      className="aesthetic-hover px-5 py-3.5 border-b border-border/40 border-l-[3px] flex items-center gap-4 flex-wrap"
      style={{ borderLeftColor: leftBorderColor }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-xs font-semibold">{plan.address.split(",")[0]}</p>
          {job && <span className="font-mono text-[10px] text-foreground/60">{job.jobNumber}</span>}
          <DrawingStatusBadge status={plan.drawingStatus} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {plan.address.split(",").slice(1).join(",").trim()} · drawn by {plan.drawnBy}
        </p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <MapPin className="w-3 h-3 text-muted-foreground" />
        <span className="permit-code text-[10px]">
          {plan.gpsLat.toFixed(4)}°N, {Math.abs(plan.gpsLng).toFixed(4)}°W
        </span>
      </div>
      <div className="text-xs text-muted-foreground shrink-0 hidden md:block">
        {plan.soilPitCount} pits · BM {plan.benchmarkElevation.toFixed(1)} ft
      </div>
      <div className="flex flex-col gap-1 shrink-0">
        <SetbackCheck value={plan.setbackPropertyLineFt} min={10} label="P.L." />
        {plan.setbackWellFt !== null && <SetbackCheck value={plan.setbackWellFt} min={100} label="Well" />}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SiteMappingPage() {
  const [search, setSearch] = useState("");
  const [countyFilter, setCountyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<DrawingStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const counties = useMemo(() =>
    Array.from(new Set(sitePlans.map(p => getJobById(p.jobId)?.county ?? "Unknown"))),
  []);

  const displayed = useMemo(() => {
    return sitePlans.filter(p => {
      const job = getJobById(p.jobId);
      return (
        (statusFilter === "all" || p.drawingStatus === statusFilter) &&
        (countyFilter === "all" || (job?.county ?? "") === countyFilter) &&
        (search === "" ||
          p.address.toLowerCase().includes(search.toLowerCase()) ||
          p.drawnBy.toLowerCase().includes(search.toLowerCase()) ||
          (job?.jobNumber ?? "").toLowerCase().includes(search.toLowerCase()))
      );
    });
  }, [search, countyFilter, statusFilter]);

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Site Plans & Drawings</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            System drawings, GPS coordinates, setback compliance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5", viewMode === "grid" && "bg-muted")}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Grid
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn("gap-1.5", viewMode === "list" && "bg-muted")}
            onClick={() => setViewMode("list")}
          >
            <List className="w-3.5 h-3.5" /> List
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by address, DR, or job number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={countyFilter} onValueChange={setCountyFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All counties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All counties</SelectItem>
            {counties.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v as DrawingStatus | "all")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Drawing status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Revision Needed">Revision Needed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} of {sitePlans.length} drawings
        </span>
      </div>

      {/* Content */}
      {displayed.length === 0 ? (
        <div className="aesthetic-card h-40 flex items-center justify-center text-sm text-muted-foreground">
          No site plans match this filter.
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map((plan, i) => (
            <SitePlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      ) : (
        <div className="aesthetic-card overflow-hidden">
          {displayed.map(plan => <SitePlanRow key={plan.id} plan={plan} />)}
        </div>
      )}
    </div>
  );
}
