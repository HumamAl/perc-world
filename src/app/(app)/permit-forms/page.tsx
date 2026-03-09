"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, ChevronRight, FileText, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { permitForms } from "@/data/mock-data";
import type { PermitForm, FormStatus, FormType } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Status badge ───────────────────────────────────────────────────────────────
function FormStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    Draft:     { label: "Draft",     cls: "bg-muted text-muted-foreground" },
    Complete:  { label: "Complete",  cls: "bg-primary/10 text-primary" },
    Signed:    { label: "Signed",    cls: "bg-warning/10 text-warning" },
    Submitted: { label: "Submitted", cls: "bg-success/10 text-success" },
  };
  const c = config[status] ?? { label: status, cls: "bg-muted text-muted-foreground" };
  return (
    <span className={cn("inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full", c.cls)}>
      {c.label}
    </span>
  );
}

function ADHStatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Draft:               "bg-muted text-muted-foreground",
    "Under Review":      "bg-warning/10 text-warning",
    "Revision Requested":"bg-destructive/10 text-destructive",
    Approved:            "bg-success/10 text-success",
    Denied:              "bg-destructive/10 text-destructive",
    Submitted:           "bg-primary/10 text-primary",
  };
  const cls = config[status] ?? "bg-muted text-muted-foreground";
  return (
    <span className={cn("inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full", cls)}>
      {status}
    </span>
  );
}

// ── Expanded detail panel ──────────────────────────────────────────────────────
function ExpandedDetail({ form }: { form: PermitForm }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-3 text-xs">
      {/* Soil data */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Soil Data</p>
        <div>
          <p className="text-muted-foreground">Perc Rate</p>
          <p className="font-mono font-medium">
            {form.percRate > 0 ? `${form.percRate} min/in` : "—"}
            {form.percRate >= 60 && form.percRate > 0 && (
              <span className="ml-1.5 text-[10px] text-destructive font-semibold">FAILING</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Loading Rate</p>
          <p className="font-mono font-medium">
            {form.loadingRate > 0 ? `${form.loadingRate} GPD/ft²` : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">SHWT Depth</p>
          <p className="font-mono font-medium">{form.seasonalWaterTableDepth}&Prime; below surface</p>
        </div>
        <div>
          <p className="text-muted-foreground">Soil Type</p>
          <p className="font-medium">{form.soilType}</p>
        </div>
      </div>

      {/* System specs */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">System Specs</p>
        <div>
          <p className="text-muted-foreground">Absorption Area</p>
          <p className="font-mono font-medium">
            {form.absorptionAreaSqFt > 0 ? `${form.absorptionAreaSqFt.toLocaleString()} ft²` : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Daily Flow</p>
          <p className="font-mono font-medium">{form.dailyFlowGPD > 0 ? `${form.dailyFlowGPD} GPD` : "—"}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Tank Size</p>
          <p className="font-mono font-medium">{form.tankSizeGallons.toLocaleString()} gal</p>
        </div>
        {form.doseTankGallons && (
          <div>
            <p className="text-muted-foreground">Dose Tank</p>
            <p className="font-mono font-medium">{form.doseTankGallons} gal</p>
          </div>
        )}
      </div>

      {/* Field lines */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Field Lines</p>
        <div>
          <p className="text-muted-foreground">Total Length</p>
          <p className="font-mono font-medium">
            {form.fieldLineLengthFt > 0 ? `${form.fieldLineLengthFt} ft` : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Trench Count</p>
          <p className="font-mono font-medium">
            {form.trenchCount > 0 ? form.trenchCount : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Trench Width × Depth</p>
          <p className="font-mono font-medium">
            {form.trenchWidthIn > 0 ? `${form.trenchWidthIn}&Prime; × ${form.trenchDepthIn}&Prime;` : "—"}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Bedrooms</p>
          <p className="font-mono font-medium">{form.bedroomCount > 0 ? form.bedroomCount : "N/A"}</p>
        </div>
      </div>

      {/* ADH tracking */}
      <div className="space-y-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">ADH Tracking</p>
        {form.planReviewNumber && (
          <div>
            <p className="text-muted-foreground">Plan Review No.</p>
            <span className="permit-code mt-0.5 inline-block">{form.planReviewNumber}</span>
          </div>
        )}
        <div>
          <p className="text-muted-foreground">Submitted</p>
          <p className="font-mono font-medium">
            {form.submittedDate
              ? new Date(form.submittedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "Not yet submitted"}
          </p>
        </div>
        {form.approvalDate && (
          <div>
            <p className="text-muted-foreground">Approved</p>
            <p className="font-mono font-medium text-success">
              {new Date(form.approvalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        )}
        {form.expiryDate && (
          <div>
            <p className="text-muted-foreground">Expires</p>
            <p className="font-mono font-medium">
              {new Date(form.expiryDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
          </div>
        )}
        {form.revisionCount > 0 && (
          <div>
            <p className="text-muted-foreground">Revisions</p>
            <p className="font-mono font-medium text-destructive">{form.revisionCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page component ─────────────────────────────────────────────────────────────
type SortKey = "propertyOwner" | "formType" | "formStatus" | "adhStatus" | "submittedDate";

export default function PermitFormsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FormStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<FormType | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("submittedDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  }

  const displayed = useMemo(() => {
    return permitForms
      .filter(f =>
        (statusFilter === "all" || f.formStatus === statusFilter) &&
        (typeFilter === "all" || f.formType === typeFilter) &&
        (search === "" ||
          f.propertyOwner.toLowerCase().includes(search.toLowerCase()) ||
          f.address.toLowerCase().includes(search.toLowerCase()) ||
          (f.planReviewNumber ?? "").toLowerCase().includes(search.toLowerCase()))
      )
      .sort((a, b) => {
        let av: string | null = "", bv: string | null = "";
        if (sortKey === "submittedDate") { av = a.submittedDate; bv = b.submittedDate; }
        else if (sortKey === "propertyOwner") { av = a.propertyOwner; bv = b.propertyOwner; }
        else if (sortKey === "formType") { av = a.formType; bv = b.formType; }
        else if (sortKey === "formStatus") { av = a.formStatus; bv = b.formStatus; }
        else if (sortKey === "adhStatus") { av = a.adhStatus; bv = b.adhStatus; }
        if (!av) return sortDir === "asc" ? 1 : -1;
        if (!bv) return sortDir === "asc" ? -1 : 1;
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
  }, [search, statusFilter, typeFilter, sortKey, sortDir]);

  const columns: { key: SortKey; label: string }[] = [
    { key: "propertyOwner", label: "Property Owner" },
    { key: "formType", label: "Form Type" },
    { key: "formStatus", label: "Form Status" },
    { key: "adhStatus", label: "ADH Status" },
    { key: "submittedDate", label: "Submitted" },
  ];

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">EHP-19 Permit Forms</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Individual and non-individual onsite wastewater permit applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm" className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> New Form
          </Button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by owner, address, or plan review no..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v as FormStatus | "all")}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Form status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Complete">Complete</SelectItem>
            <SelectItem value="Signed">Signed</SelectItem>
            <SelectItem value="Submitted">Submitted</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={v => setTypeFilter(v as FormType | "all")}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Form type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All forms</SelectItem>
            <SelectItem value="EHP-19">EHP-19</SelectItem>
            <SelectItem value="EHP-19N">EHP-19N</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} of {permitForms.length} forms
        </span>
      </div>

      {/* Table */}
      <div className="aesthetic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60">
                <th className="w-8 bg-muted/30 px-3 py-2.5" />
                {/* Address column — not sortable */}
                <th className="bg-muted/30 px-4 py-2.5 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Address
                  </span>
                </th>
                {columns.map(col => (
                  <th
                    key={col.key}
                    className="bg-muted/30 px-4 py-2.5 text-left cursor-pointer select-none group"
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                      {col.label}
                      {sortKey === col.key && (
                        sortDir === "asc"
                          ? <ChevronUp className="w-3 h-3" />
                          : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                    No permit forms match this filter.
                  </td>
                </tr>
              ) : (
                displayed.map(form => (
                  <>
                    <tr
                      key={form.id}
                      className={cn(
                        "border-b border-border/40 cursor-pointer transition-colors duration-150",
                        "hover:bg-[color:var(--surface-hover)]",
                        expandedId === form.id && "bg-[color:var(--surface-active)]",
                        // Left-border color encoding
                        form.adhStatus === "Approved" ? "border-l-[3px] border-l-[oklch(0.65_0.19_155)]" :
                        form.adhStatus === "Under Review" || form.adhStatus === "Submitted" ? "border-l-[3px] border-l-[oklch(0.52_0.16_148)]" :
                        form.adhStatus === "Revision Requested" ? "border-l-[3px] border-l-[oklch(0.60_0.22_27)]" :
                        "border-l-[3px] border-l-transparent"
                      )}
                      onClick={() => setExpandedId(expandedId === form.id ? null : form.id)}
                    >
                      <td className="px-3 py-3">
                        <ChevronRight
                          className={cn(
                            "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                            expandedId === form.id && "rotate-90"
                          )}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-foreground truncate max-w-[200px]">
                          {form.address.split(",")[0]}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {form.county} County
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium truncate max-w-[180px]">{form.propertyOwner}</p>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{form.parcelNumber}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded",
                          form.formType === "EHP-19N"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        )}>
                          <FileText className="w-3 h-3" />
                          {form.formType}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <FormStatusBadge status={form.formStatus} />
                      </td>
                      <td className="px-4 py-3">
                        <ADHStatusBadge status={form.adhStatus} />
                        {form.revisionCount > 0 && (
                          <p className="text-[10px] text-destructive mt-0.5 font-medium">
                            {form.revisionCount} revision{form.revisionCount > 1 ? "s" : ""}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {form.submittedDate ? (
                          <span className="text-xs font-mono tabular-nums text-muted-foreground">
                            {new Date(form.submittedDate).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "2-digit"
                            })}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground/60">—</span>
                        )}
                        {form.planReviewNumber && (
                          <div className="mt-0.5">
                            <span className="permit-code">{form.planReviewNumber}</span>
                          </div>
                        )}
                      </td>
                    </tr>

                    {expandedId === form.id && (
                      <tr key={`${form.id}-detail`} className="border-b border-border/40">
                        <td colSpan={7} className="bg-muted/20 px-6 py-4">
                          <ExpandedDetail form={form} />
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
