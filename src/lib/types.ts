import type { LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Sidebar / Navigation
// ---------------------------------------------------------------------------

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// ---------------------------------------------------------------------------
// Challenge visualization types (used by Challenges Builder)
// ---------------------------------------------------------------------------

export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// ---------------------------------------------------------------------------
// Proposal types (used by Proposal Builder)
// ---------------------------------------------------------------------------

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
  outcome?: string;
  liveUrl?: string;
}

// ---------------------------------------------------------------------------
// Screen definitions for frame-based demo formats
// ---------------------------------------------------------------------------

export interface DemoScreen {
  id: string;
  label: string;
  icon?: LucideIcon;
  href: string;
}

export type ConversionVariant = "sidebar" | "inline" | "floating" | "banner";

// ---------------------------------------------------------------------------
// Domain: Onsite Wastewater / Septic Permitting (Arkansas ADH)
// ---------------------------------------------------------------------------

// Job status — exact strings from ADH/DR firm vocabulary
export type JobStatus =
  | "Site Evaluation Scheduled"
  | "Perc Test Complete — Awaiting Design"
  | "Design In Progress"
  | "Permit Submitted"
  | "Under ADH Review"
  | "Revision Requested"
  | "Approved — Awaiting Install"
  | "Installation In Progress"
  | "Inspection Scheduled"
  | "Permit Issued"
  | "Operation Permit Issued"
  | "On Hold"
  | "Permit Expired"
  | "Denied"
  | "Cancelled";

export type ServiceType =
  | "PercTest Letter"
  | "Inspection"
  | "Conceptual Plan"
  | "Individual Permit"
  | "Non-Individual Permit"
  | "Surface Discharge";

export type SystemType =
  | "Conventional Gravity"
  | "ATU — SludgeHammer S-400"
  | "ATU — SludgeHammer S-600"
  | "ATU — SludgeHammer S-800"
  | "ATU — Infiltrator Ecopod"
  | "Pumped LPP — Zoeller 151"
  | "Mound System"
  | "Surface Discharge";

export type ClientType = "Homeowner" | "Builder" | "Developer";

export type InvoiceStatus = "Billed" | "Unpaid" | "Paid" | "Partial";

export type ARCounty =
  | "Benton"
  | "Washington"
  | "Carroll"
  | "Boone"
  | "Baxter"
  | "Faulkner"
  | "Pulaski"
  | "Sebastian";

/** Primary record — each Job = one site/permit application */
export interface Job {
  id: string;                      // "job_k8m2p" format
  jobNumber: string;               // human-readable "J-2026-042"
  clientName: string;
  clientType: ClientType;
  address: string;
  county: ARCounty;
  parcelNumber: string;            // Arkansas assessor format e.g. "01-03420-000"
  bedroomCount: number;
  serviceType: ServiceType;
  systemType: SystemType | null;   // null until sizing is complete
  status: JobStatus;
  assignedDR: string;              // crewMemberId FK
  percRate: number | null;         // min/inch; null until test done
  loadingRate: number | null;      // GPD/ft²; from Appendix A
  absorptionArea: number | null;   // sq ft
  tankSize: number | null;         // gallons
  /** Dose tank size — present only for pumped/LPP/ATU systems */
  doseSize: number | null;
  estimatedCost: number;
  invoiceStatus: InvoiceStatus;
  /** ADH Plan Review Number — PR-2026-XXXX format */
  planReviewNumber: string | null;
  /** Number of revision requests from ADH on this permit */
  revisionCount: number;
  createdAt: string;               // ISO date string
  targetDate: string | null;       // target permit approval / completion date
  /** Client-facing note for On Hold, Denied, Revision Requested jobs */
  statusNote?: string;
  /** True for subdivision jobs covering multiple lots */
  isSubdivision?: boolean;
  lotCount?: number;               // present when isSubdivision = true
}

// ---------------------------------------------------------------------------
// Perc Tests
// ---------------------------------------------------------------------------

export type SoilProfile =
  | "Sandy Loam"
  | "Loam"
  | "Silt Loam"
  | "Clay Loam"
  | "Heavy Clay"
  | "Gravelly Loam";

export type PercPassFail = "Pass" | "Marginal" | "Fail";

export interface PercTest {
  id: string;                      // "prc_x4t9q"
  jobId: string;                   // FK → Job.id
  testDate: string;
  drName: string;
  holeCount: number;               // typically 3–6
  avgPercRate: number;             // min/inch
  soilProfile: SoilProfile;
  /** Seasonal high water table depth, inches below surface */
  shwtDepth: number;
  passFailStatus: PercPassFail;
  notes: string | null;
}

// ---------------------------------------------------------------------------
// EHP-19 / EHP-19N Permit Forms
// ---------------------------------------------------------------------------

export type FormType = "EHP-19" | "EHP-19N";
export type ADHStatus =
  | "Draft"
  | "Submitted"
  | "Under Review"
  | "Revision Requested"
  | "Approved"
  | "Denied";
export type FormStatus = "Draft" | "Complete" | "Signed" | "Submitted";

export interface PermitForm {
  id: string;                      // "frm_b4n9s"
  jobId: string;                   // FK → Job.id
  formType: FormType;
  propertyOwner: string;
  address: string;
  county: ARCounty;
  parcelNumber: string;
  bedroomCount: number;
  /** Gallons per day: 150 + 100 per additional BR */
  dailyFlowGPD: number;
  percRate: number;                // min/inch
  loadingRate: number;             // GPD/ft²
  absorptionAreaSqFt: number;
  soilType: SoilProfile;
  /** Seasonal high water table depth in inches */
  seasonalWaterTableDepth: number;
  tankSizeGallons: number;
  doseTankGallons: number | null;
  systemType: SystemType;
  /** Total field line length in feet */
  fieldLineLengthFt: number;
  /** Number of field line trenches */
  trenchCount: number;
  /** Trench width in inches */
  trenchWidthIn: number;
  /** Trench depth in inches */
  trenchDepthIn: number;
  formStatus: FormStatus;
  adhStatus: ADHStatus;
  submittedDate: string | null;
  revisionCount: number;
  approvalDate: string | null;
  /** 12 months from approvalDate; null until approved */
  expiryDate: string | null;
  planReviewNumber: string | null;
}

// ---------------------------------------------------------------------------
// Site Plans
// ---------------------------------------------------------------------------

export type DrawingStatus = "Draft" | "Under Review" | "Approved" | "Revision Needed";

export interface SitePlan {
  id: string;                      // "spl_m7r4k"
  jobId: string;                   // FK → Job.id
  address: string;
  /** WGS84 coordinates — NW Arkansas area ~36.3°N, 94.2°W */
  gpsLat: number;
  gpsLng: number;
  tankPlacement: string;           // descriptive: "NE corner of dwelling, 15 ft from foundation"
  fieldLineLayout: string;         // descriptive: "Three 100-ft trenches on-contour, E→W"
  setbackPropertyLineFt: number;
  setbackWellFt: number | null;    // null if no well on site
  setbackDwellingFt: number;
  setbackWaterBodyFt: number | null;
  benchmarkElevation: number;      // feet above datum
  soilPitCount: number;
  drawingStatus: DrawingStatus;
  drawnBy: string;                 // crew member name
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Crew / Team Members
// ---------------------------------------------------------------------------

export type CrewRole = "DR" | "DR / Lead" | "Installer" | "Field Tech" | "Office Manager";

export interface CrewMember {
  id: string;                      // "crw_p3k7n"
  name: string;
  role: CrewRole;
  /** DR-XXXX or Installer-XXXX per Arkansas licensing */
  licenseNumber: string | null;
  phone: string;
  email: string;                   // @percpro.com
  activeJobs: number;
  scheduledDays: string[];         // days of week typically in field: ["Mon", "Tue", "Wed"]
}

// ---------------------------------------------------------------------------
// Calendar / Field Events
// ---------------------------------------------------------------------------

export type FieldEventType =
  | "Perc Test"
  | "Retest"
  | "Installation"
  | "Inspection"
  | "Site Survey"
  | "Property Transfer Inspection";

export type FieldEventStatus = "Scheduled" | "Completed" | "Cancelled" | "Rescheduled";

export interface FieldEvent {
  id: string;                      // "evt_9q2r1"
  jobId: string;                   // FK → Job.id
  eventType: FieldEventType;
  date: string;                    // ISO date
  timeSlot: string;                // "08:00 AM" or "Afternoon"
  drAssigned: string;              // crew member name
  address: string;
  county: ARCounty;
  status: FieldEventStatus;
  notes: string | null;
}

// ---------------------------------------------------------------------------
// Dashboard KPIs
// ---------------------------------------------------------------------------

export interface DashboardStats {
  /** Count of permits currently in ADH pipeline (submitted/under review/revision) */
  activePermits: number;
  activePermitsChange: number;     // % vs prior period
  /** Jobs completed this calendar month */
  jobsThisMonth: number;
  jobsThisMonthChange: number;
  /** Sum of outstanding (Unpaid/Billed) invoices in dollars */
  pendingInvoices: number;
  pendingInvoicesChange: number;
  /** Average calendar days from EHP-19 submission to ADH approval */
  avgReviewDays: number;
  avgReviewDaysChange: number;     // negative = improvement
  /** Count of permits awaiting revision resubmission */
  revisionsPending: number;
  /** Perc tests scheduled in next 7 days */
  percTestsScheduled: number;
  /** Percentage of submitted permits approved without revision */
  approvalRate: number;
}

// ---------------------------------------------------------------------------
// Chart Data Types
// ---------------------------------------------------------------------------

export interface MonthlyMetric {
  month: string;                   // "Mar", "Apr", etc.
  permitsSubmitted: number;
  permitsApproved: number;
  revisionCount: number;
  avgTurnaroundDays: number;
  conceptualPlans: number;
  percTests: number;
  revenue: number;
}

export interface ChartDataPoint {
  month: string;
  value: number;
  target?: number;
}

export interface PermitPipelineCount {
  stage: string;
  count: number;
  color: string;
}

export interface JobsByCounty {
  county: string;
  jobs: number;
  revenue: number;
}

export interface SystemTypeBreakdown {
  systemType: string;
  count: number;
  percentage: number;
}

// ---------------------------------------------------------------------------
// Activity Feed
// ---------------------------------------------------------------------------

export type ActivityEventType =
  | "perc_test_completed"
  | "permit_submitted"
  | "permit_approved"
  | "revision_requested"
  | "client_signature_received"
  | "installation_started"
  | "operation_permit_issued"
  | "job_created"
  | "design_completed"
  | "inspection_passed"
  | "permit_expired"
  | "site_flagged";

export interface ActivityEvent {
  id: string;                      // "act_h2n4m"
  jobId: string;                   // FK → Job.id
  jobNumber: string;               // for display
  eventType: ActivityEventType;
  description: string;
  drName: string | null;
  timestamp: string;               // ISO datetime
  county: ARCounty;
}
