import type {
  Job,
  PercTest,
  PermitForm,
  SitePlan,
  CrewMember,
  FieldEvent,
  DashboardStats,
  MonthlyMetric,
  PermitPipelineCount,
  JobsByCounty,
  SystemTypeBreakdown,
  ActivityEvent,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Crew Members — 11 staff per brief (3 DRs, 3 Installers, 3 Field Techs, 1 Office)
// ---------------------------------------------------------------------------
export const crewMembers: CrewMember[] = [
  { id: "crw_bd1p2", name: "Bodie Drake", role: "DR / Lead", licenseNumber: "DR-0047", phone: "(479) 555-0182", email: "bodie.drake@percpro.com", activeJobs: 9, scheduledDays: ["Mon", "Tue", "Thu"] },
  { id: "crw_kk3r7", name: "Kriss Kelley", role: "DR", licenseNumber: "DR-0091", phone: "(479) 555-0247", email: "kriss.kelley@percpro.com", activeJobs: 6, scheduledDays: ["Tue", "Thu", "Fri"] },
  { id: "crw_dh5m4", name: "Daniel Howard", role: "DR", licenseNumber: "DR-0103", phone: "(479) 555-0319", email: "daniel.howard@percpro.com", activeJobs: 5, scheduledDays: ["Mon", "Wed", "Thu"] },
  { id: "crw_am8q1", name: "Abner Martinez", role: "Installer", licenseNumber: "Installer-0218", phone: "(479) 555-0433", email: "abner.martinez@percpro.com", activeJobs: 4, scheduledDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  { id: "crw_sh6x9", name: "Shannon Holiday", role: "Installer", licenseNumber: "Installer-0241", phone: "(479) 555-0508", email: "shannon.holiday@percpro.com", activeJobs: 3, scheduledDays: ["Mon", "Wed", "Fri"] },
  { id: "crw_rc2n5", name: "Robert Collins", role: "Field Tech", licenseNumber: null, phone: "(479) 555-0617", email: "robert.collins@percpro.com", activeJobs: 4, scheduledDays: ["Mon", "Tue", "Wed", "Thu"] },
  { id: "crw_aj9t3", name: "Annette Joyner", role: "Office Manager", licenseNumber: null, phone: "(479) 555-0724", email: "annette.joyner@percpro.com", activeJobs: 0, scheduledDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  { id: "crw_cc4v8", name: "Chelsey Cash", role: "Field Tech", licenseNumber: null, phone: "(479) 555-0836", email: "chelsey.cash@percpro.com", activeJobs: 3, scheduledDays: ["Tue", "Thu"] },
  { id: "crw_vv7w2", name: "Valeria Vazques", role: "DR", licenseNumber: "DR-0127", phone: "(479) 555-0941", email: "valeria.vazques@percpro.com", activeJobs: 5, scheduledDays: ["Mon", "Wed", "Fri"] },
  { id: "crw_ac1r6", name: "Adriano Castro", role: "Installer", licenseNumber: "Installer-0263", phone: "(479) 555-1027", email: "adriano.castro@percpro.com", activeJobs: 3, scheduledDays: ["Mon", "Tue", "Thu", "Fri"] },
  { id: "crw_jd5k0", name: "Jessie Drake", role: "Field Tech", licenseNumber: null, phone: "(479) 555-1142", email: "jessie.drake@percpro.com", activeJobs: 2, scheduledDays: ["Wed", "Thu", "Fri"] },
];

// ---------------------------------------------------------------------------
// Jobs — 17 records; full status distribution + all required edge cases
// ---------------------------------------------------------------------------
export const jobs: Job[] = [
  // Active pipeline
  {
    id: "job_k8m2p", jobNumber: "J-2026-041", clientName: "Bentonville Custom Homes", clientType: "Builder",
    address: "14823 NW Claybrook Rd, Garfield, AR 72732", county: "Benton", parcelNumber: "01-07841-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Under ADH Review", assignedDR: "crw_bd1p2",
    percRate: 18, loadingRate: 0.45, absorptionArea: 778, tankSize: 1000, doseSize: null,
    estimatedCost: 6850.00, invoiceStatus: "Billed", planReviewNumber: "PR-2026-0214",
    revisionCount: 0, createdAt: "2026-01-28T08:42:17Z", targetDate: "2026-03-15",
  },
  {
    id: "job_7x3q1", jobNumber: "J-2026-038", clientName: "Ozark Ridge Development LLC", clientType: "Developer",
    address: "6200 Ridgecrest Ln, Bentonville, AR 72712", county: "Benton", parcelNumber: "01-04389-000",
    bedroomCount: 4, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Approved — Awaiting Install", assignedDR: "crw_kk3r7",
    percRate: 22, loadingRate: 0.45, absorptionArea: 1000, tankSize: 1250, doseSize: null,
    estimatedCost: 8320.50, invoiceStatus: "Paid", planReviewNumber: "PR-2026-0187",
    revisionCount: 0, createdAt: "2026-01-12T10:14:33Z", targetDate: "2026-02-28",
  },
  // EDGE CASE: Pumped LPP with Zoeller 151 — steep slope, dose tank
  {
    id: "job_p9n4r", jobNumber: "J-2026-044", clientName: "Three Forks Construction", clientType: "Builder",
    address: "3107 Horseshoe Bend Rd, Cave Springs, AR 72718", county: "Benton", parcelNumber: "01-09213-001",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "Pumped LPP — Zoeller 151",
    status: "Design In Progress", assignedDR: "crw_dh5m4",
    percRate: 38, loadingRate: 0.3, absorptionArea: 1167, tankSize: 1000, doseSize: 500,
    estimatedCost: 9450.75, invoiceStatus: "Unpaid", planReviewNumber: null,
    revisionCount: 0, createdAt: "2026-02-04T09:07:52Z", targetDate: "2026-03-25",
    statusNote: "Steep slope (14%) — gravity flow not achievable. Pumped LPP with Zoeller 151; 500-gal dose tank.",
  },
  {
    id: "job_f2v8t", jobNumber: "J-2026-039", clientName: "Staghorn Properties LLC", clientType: "Developer",
    address: "8940 Staghorn Hollow Rd, Gravette, AR 72736", county: "Benton", parcelNumber: "01-11042-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Permit Submitted", assignedDR: "crw_bd1p2",
    percRate: 14, loadingRate: 0.5, absorptionArea: 700, tankSize: 1000, doseSize: null,
    estimatedCost: 6200.25, invoiceStatus: "Billed", planReviewNumber: "PR-2026-0231",
    revisionCount: 0, createdAt: "2026-01-31T11:23:08Z", targetDate: "2026-03-10",
  },
  // EDGE CASE: Revision Requested — revisionCount = 2
  {
    id: "job_r4c6w", jobNumber: "J-2026-027", clientName: "Razorback Land & Excavation", clientType: "Builder",
    address: "2417 County Road 108, Siloam Springs, AR 72761", county: "Benton", parcelNumber: "01-06188-000",
    bedroomCount: 4, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Revision Requested", assignedDR: "crw_kk3r7",
    percRate: 29, loadingRate: 0.35, absorptionArea: 1286, tankSize: 1250, doseSize: null,
    estimatedCost: 7640.00, invoiceStatus: "Unpaid", planReviewNumber: "PR-2026-0142",
    revisionCount: 2, createdAt: "2025-12-18T14:32:19Z", targetDate: "2026-02-28",
    statusNote: "ADH: 'Loading rate does not match Appendix A; adjacent parcel well setback undocumented.' Second revision — resubmitting 3/3.",
  },
  // EDGE CASE: Failing perc (72 min/in) → ATU SludgeHammer S-600
  {
    id: "job_q1h7b", jobNumber: "J-2026-046", clientName: "Beaver Lake Properties Inc.", clientType: "Developer",
    address: "17240 Lakeview Heights Dr, Rogers, AR 72756", county: "Benton", parcelNumber: "01-14820-000",
    bedroomCount: 4, serviceType: "Individual Permit", systemType: "ATU — SludgeHammer S-600",
    status: "Design In Progress", assignedDR: "crw_bd1p2",
    percRate: 72, loadingRate: 0.2, absorptionArea: 2250, tankSize: 1500, doseSize: 400,
    estimatedCost: 14850.00, invoiceStatus: "Unpaid", planReviewNumber: null,
    revisionCount: 0, createdAt: "2026-02-11T07:58:44Z", targetDate: "2026-04-10",
    statusNote: "FAILING PERC — 72 min/in, heavy clay (Cecil series). Conventional not feasible. EHP-19N for SludgeHammer S-600 ATU in progress.",
  },
  // EDGE CASE: Permit Expired — client delay past 12-month validity
  {
    id: "job_e5z2n", jobNumber: "J-2025-089", clientName: "White River Homes", clientType: "Builder",
    address: "731 Persimmon Creek Rd, Bull Shoals, AR 72619", county: "Baxter", parcelNumber: "07-02941-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Permit Expired", assignedDR: "crw_dh5m4",
    percRate: 15, loadingRate: 0.5, absorptionArea: 700, tankSize: 1000, doseSize: null,
    estimatedCost: 5750.00, invoiceStatus: "Paid", planReviewNumber: "PR-2025-0812",
    revisionCount: 0, createdAt: "2025-01-14T13:47:00Z", targetDate: "2025-04-30",
    statusNote: "Permit issued 2025-02-18; expired 2026-02-18. Client delayed construction. Revalidation request submitted to Baxter County ADH.",
  },
  // EDGE CASE: Denied — rocky site, shallow bedrock
  {
    id: "job_d8y4k", jobNumber: "J-2026-031", clientName: "Carroll County Builders Association", clientType: "Builder",
    address: "4891 Rock Ledge Way, Eureka Springs, AR 72632", county: "Carroll", parcelNumber: "12-05473-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: null,
    status: "Denied", assignedDR: "crw_vv7w2",
    percRate: null, loadingRate: null, absorptionArea: null, tankSize: null, doseSize: null,
    estimatedCost: 1200.00, invoiceStatus: "Paid", planReviewNumber: "PR-2026-0163",
    revisionCount: 1, createdAt: "2026-01-20T10:12:00Z", targetDate: null,
    statusNote: "ADH denial: shallow bedrock (Boone Formation limestone) at 14 in. No feasible trench placement. Site deemed unbuildable for onsite wastewater.",
  },
  // EDGE CASE: On Hold — client financing delay
  {
    id: "job_h3g0v", jobNumber: "J-2026-034", clientName: "NWA Land Development Group", clientType: "Developer",
    address: "12040 Pinnacle Valley Rd, Little Rock, AR 72223", county: "Pulaski", parcelNumber: "42-08120-001",
    bedroomCount: 4, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "On Hold", assignedDR: "crw_vv7w2",
    percRate: 20, loadingRate: 0.45, absorptionArea: 1000, tankSize: 1250, doseSize: null,
    estimatedCost: 7150.50, invoiceStatus: "Unpaid", planReviewNumber: null,
    revisionCount: 0, createdAt: "2026-01-26T15:01:33Z", targetDate: "2026-05-01",
    statusNote: "60-day client hold — financing contingency on adjacent land purchase pending.",
  },
  // EDGE CASE: Subdivision — 8 lots, multiple parcels
  {
    id: "job_s6l1x", jobNumber: "J-2026-036", clientName: "Pinnacle Ridge Excavating", clientType: "Developer",
    address: "Whispering Pines Estates Phase 2, Springdale, AR 72764", county: "Washington", parcelNumber: "02-18340-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Perc Test Complete — Awaiting Design", assignedDR: "crw_bd1p2",
    percRate: 16, loadingRate: 0.5, absorptionArea: 700, tankSize: 1000, doseSize: null,
    estimatedCost: 43200.00, invoiceStatus: "Partial", planReviewNumber: null,
    revisionCount: 0, createdAt: "2026-01-07T09:44:28Z", targetDate: "2026-04-15",
    statusNote: "8-lot subdivision plat. 6 lots pass conventional, Lot 3 marginal (Conceptual Plan), Lot 7 failing (ATU).",
    isSubdivision: true, lotCount: 8,
  },
  // Additional active pipeline
  {
    id: "job_w2c9j", jobNumber: "J-2026-042", clientName: "Homeowner — Gary & Pam Whitfield", clientType: "Homeowner",
    address: "5582 Millstone Creek Rd, Fayetteville, AR 72701", county: "Washington", parcelNumber: "02-07291-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Inspection Scheduled", assignedDR: "crw_kk3r7",
    percRate: 11, loadingRate: 0.6, absorptionArea: 583, tankSize: 1000, doseSize: null,
    estimatedCost: 6480.25, invoiceStatus: "Paid", planReviewNumber: "PR-2026-0208",
    revisionCount: 0, createdAt: "2025-12-05T08:30:00Z", targetDate: "2026-02-20",
  },
  {
    id: "job_m0t5f", jobNumber: "J-2026-043", clientName: "Homeowner — Debra Sims", clientType: "Homeowner",
    address: "1923 Turkey Creek Hollow, Berryville, AR 72616", county: "Carroll", parcelNumber: "12-03184-000",
    bedroomCount: 3, serviceType: "PercTest Letter", systemType: null,
    status: "Site Evaluation Scheduled", assignedDR: "crw_dh5m4",
    percRate: null, loadingRate: null, absorptionArea: null, tankSize: null, doseSize: null,
    estimatedCost: 550.00, invoiceStatus: "Unpaid", planReviewNumber: null,
    revisionCount: 0, createdAt: "2026-02-24T16:02:41Z", targetDate: "2026-03-06",
  },
  {
    id: "job_b6u3s", jobNumber: "J-2026-040", clientName: "Baxter County Home Builders", clientType: "Builder",
    address: "441 Overlook Point Dr, Mountain Home, AR 72653", county: "Baxter", parcelNumber: "07-06710-000",
    bedroomCount: 4, serviceType: "Individual Permit", systemType: "Conventional Gravity",
    status: "Installation In Progress", assignedDR: "crw_vv7w2",
    percRate: 24, loadingRate: 0.4, absorptionArea: 1125, tankSize: 1250, doseSize: null,
    estimatedCost: 8740.00, invoiceStatus: "Paid", planReviewNumber: "PR-2026-0193",
    revisionCount: 0, createdAt: "2025-12-22T11:18:54Z", targetDate: "2026-03-01",
  },
  // EDGE CASE: ATU — Infiltrator Ecopod with dose tank, marginal site
  {
    id: "job_n1e4a", jobNumber: "J-2026-045", clientName: "Homeowner — Travis Norwood", clientType: "Homeowner",
    address: "8814 Blackberry Hill Rd, Conway, AR 72032", county: "Faulkner", parcelNumber: "30-04891-000",
    bedroomCount: 3, serviceType: "Individual Permit", systemType: "ATU — Infiltrator Ecopod",
    status: "Under ADH Review", assignedDR: "crw_bd1p2",
    percRate: 55, loadingRate: 0.25, absorptionArea: 1400, tankSize: 1500, doseSize: 300,
    estimatedCost: 13200.00, invoiceStatus: "Billed", planReviewNumber: "PR-2026-0238",
    revisionCount: 0, createdAt: "2026-02-07T08:55:29Z", targetDate: "2026-03-28",
    statusNote: "Marginal perc (55 min/in), SHWT at 48 in. ATU — Infiltrator Ecopod with 300-gal dose tank.",
  },
  // EDGE CASE: Surface Discharge variant (light commercial)
  {
    id: "job_v9r3l", jobNumber: "J-2026-047", clientName: "Ozarks Rural Electric Cooperative", clientType: "Developer",
    address: "11900 Hwy 412 W, Huntsville, AR 72740", county: "Washington", parcelNumber: "02-21849-000",
    bedroomCount: 0, serviceType: "Surface Discharge", systemType: "Surface Discharge",
    status: "Under ADH Review", assignedDR: "crw_vv7w2",
    percRate: null, loadingRate: null, absorptionArea: null, tankSize: 2000, doseSize: 750,
    estimatedCost: 18450.00, invoiceStatus: "Billed", planReviewNumber: "PR-2026-0247",
    revisionCount: 0, createdAt: "2026-02-17T09:31:44Z", targetDate: "2026-04-20",
    statusNote: "RV park facility — surface discharge to drainage ditch. NPDES coordination required.",
  },
  {
    id: "job_c7o9r", jobNumber: "J-2026-037", clientName: "Homeowner — Carl & Ruth Bledsoe", clientType: "Homeowner",
    address: "3309 Garrison Ave Extension, Fort Smith, AR 72901", county: "Sebastian", parcelNumber: "66-09241-000",
    bedroomCount: 3, serviceType: "Inspection", systemType: "Conventional Gravity",
    status: "Operation Permit Issued", assignedDR: "crw_kk3r7",
    percRate: 19, loadingRate: 0.45, absorptionArea: 778, tankSize: 1000, doseSize: null,
    estimatedCost: 5980.00, invoiceStatus: "Paid", planReviewNumber: "PR-2025-1048",
    revisionCount: 0, createdAt: "2025-11-03T13:29:00Z", targetDate: "2026-01-15",
  },
  {
    id: "job_t4i8u", jobNumber: "J-2026-033", clientName: "Three Forks Construction", clientType: "Builder",
    address: "780 Boxley Valley Ln, Harrison, AR 72601", county: "Boone", parcelNumber: "09-03712-000",
    bedroomCount: 3, serviceType: "Conceptual Plan", systemType: "Conventional Gravity",
    status: "Permit Issued", assignedDR: "crw_dh5m4",
    percRate: 12, loadingRate: 0.6, absorptionArea: 583, tankSize: 1000, doseSize: null,
    estimatedCost: 6100.75, invoiceStatus: "Paid", planReviewNumber: "PR-2026-0171",
    revisionCount: 0, createdAt: "2025-12-09T07:43:12Z", targetDate: "2026-02-10",
  },
];

// ---------------------------------------------------------------------------
// Perc Tests — 12 records; edge cases: failing 72 min/in, marginal, shallow SHWT
// ---------------------------------------------------------------------------
export const percTests: PercTest[] = [
  { id: "prc_x4t9q", jobId: "job_k8m2p", testDate: "2026-01-23T09:00:00Z", drName: "Bodie Drake", holeCount: 4, avgPercRate: 18, soilProfile: "Silt Loam", shwtDepth: 68, passFailStatus: "Pass", notes: "4 holes within 10 ft, good consistency. No mottling above 68 in. Benchmark set at NE corner." },
  { id: "prc_m2a7r", jobId: "job_7x3q1", testDate: "2026-01-07T08:30:00Z", drName: "Kriss Kelley", holeCount: 5, avgPercRate: 22, soilProfile: "Loam", shwtDepth: 72, passFailStatus: "Pass", notes: "Wooded lot, favorable loam profile. Loading rate 0.45 GPD/ft²." },
  { id: "prc_d6k1n", jobId: "job_p9n4r", testDate: "2026-01-30T08:00:00Z", drName: "Daniel Howard", holeCount: 4, avgPercRate: 38, soilProfile: "Clay Loam", shwtDepth: 54, passFailStatus: "Marginal", notes: "Clay loam subsoil, 14% slope. Gravity flow not achievable. Pumped LPP with Zoeller 151 recommended." },
  { id: "prc_y8p3w", jobId: "job_f2v8t", testDate: "2026-01-28T09:30:00Z", drName: "Bodie Drake", holeCount: 4, avgPercRate: 14, soilProfile: "Sandy Loam", shwtDepth: 84, passFailStatus: "Pass", notes: "Fast draining sandy loam. No mottling to 84 in." },
  { id: "prc_z3s8v", jobId: "job_r4c6w", testDate: "2025-12-12T08:00:00Z", drName: "Kriss Kelley", holeCount: 5, avgPercRate: 29, soilProfile: "Clay Loam", shwtDepth: 60, passFailStatus: "Pass", notes: "ADH revision cited loading rate entered as 0.40 instead of 0.35 per Appendix A. Corrected on resubmit." },
  // EDGE CASE: FAILING — 72 min/in, heavy clay
  { id: "prc_f9g4h", jobId: "job_q1h7b", testDate: "2026-02-06T08:00:00Z", drName: "Bodie Drake", holeCount: 5, avgPercRate: 72, soilProfile: "Heavy Clay", shwtDepth: 42, passFailStatus: "Fail", notes: "FAILING. 72 min/in exceeds 60 min/in max for conventional. Heavy clay (Cecil series). Mottling at 42 in. ATU required — SludgeHammer S-600 on EHP-19N." },
  { id: "prc_w5j2m", jobId: "job_w2c9j", testDate: "2025-12-02T09:00:00Z", drName: "Kriss Kelley", holeCount: 4, avgPercRate: 11, soilProfile: "Sandy Loam", shwtDepth: 90, passFailStatus: "Pass", notes: "Fast absorbing site. Loading rate 0.60 GPD/ft². No restrictive horizons to 90 in." },
  { id: "prc_b8n6t", jobId: "job_b6u3s", testDate: "2025-12-18T08:30:00Z", drName: "Valeria Vazques", holeCount: 4, avgPercRate: 24, soilProfile: "Loam", shwtDepth: 66, passFailStatus: "Pass", notes: "Standard loam. Loading rate 0.40 GPD/ft²." },
  // EDGE CASE: Marginal, shallow SHWT — ATU Ecopod
  { id: "prc_r1c5x", jobId: "job_n1e4a", testDate: "2026-02-04T08:00:00Z", drName: "Bodie Drake", holeCount: 4, avgPercRate: 55, soilProfile: "Clay Loam", shwtDepth: 48, passFailStatus: "Marginal", notes: "55 min/in, SHWT at 48 in. ATU path — Infiltrator Ecopod with reduced loading rate 0.25 GPD/ft²." },
  { id: "prc_e2h9k", jobId: "job_t4i8u", testDate: "2025-12-04T08:30:00Z", drName: "Daniel Howard", holeCount: 5, avgPercRate: 12, soilProfile: "Gravelly Loam", shwtDepth: 96, passFailStatus: "Pass", notes: "Gravelly loam, excellent drainage. Loading rate 0.60 GPD/ft²." },
  // EDGE CASE: Subdivision bulk test — 8 lots
  { id: "prc_k3v1y", jobId: "job_s6l1x", testDate: "2026-01-22T07:30:00Z", drName: "Bodie Drake", holeCount: 6, avgPercRate: 16, soilProfile: "Silt Loam", shwtDepth: 78, passFailStatus: "Pass", notes: "Subdivision 8-lot plat. Lots 1-2,4-6,8 pass (14-22 min/in). Lot 3 marginal 44 min/in. Lot 7 fail 78 min/in — ATU." },
  { id: "prc_a7u2z", jobId: "job_h3g0v", testDate: "2026-01-22T08:30:00Z", drName: "Valeria Vazques", holeCount: 4, avgPercRate: 20, soilProfile: "Loam", shwtDepth: 72, passFailStatus: "Pass", notes: "Clean test, 20 min/in. Job held at client request — financing contingency." },
];

// ---------------------------------------------------------------------------
// Permit Forms (EHP-19 / EHP-19N) — 12 records including edge cases
// ---------------------------------------------------------------------------
export const permitForms: PermitForm[] = [
  {
    id: "frm_b4n9s", jobId: "job_k8m2p", formType: "EHP-19", propertyOwner: "Bentonville Custom Homes",
    address: "14823 NW Claybrook Rd, Garfield, AR 72732", county: "Benton", parcelNumber: "01-07841-000",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 18, loadingRate: 0.45, absorptionAreaSqFt: 778,
    soilType: "Silt Loam", seasonalWaterTableDepth: 68, tankSizeGallons: 1000, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 260, trenchCount: 3, trenchWidthIn: 24, trenchDepthIn: 30,
    formStatus: "Submitted", adhStatus: "Under Review", submittedDate: "2026-02-03T10:00:00Z",
    revisionCount: 0, approvalDate: null, expiryDate: null, planReviewNumber: "PR-2026-0214",
  },
  {
    id: "frm_h7t2w", jobId: "job_7x3q1", formType: "EHP-19", propertyOwner: "Ozark Ridge Development LLC",
    address: "6200 Ridgecrest Ln, Bentonville, AR 72712", county: "Benton", parcelNumber: "01-04389-000",
    bedroomCount: 4, dailyFlowGPD: 450, percRate: 22, loadingRate: 0.45, absorptionAreaSqFt: 1000,
    soilType: "Loam", seasonalWaterTableDepth: 72, tankSizeGallons: 1250, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 300, trenchCount: 3, trenchWidthIn: 30, trenchDepthIn: 32,
    formStatus: "Submitted", adhStatus: "Approved", submittedDate: "2026-01-21T10:00:00Z",
    revisionCount: 0, approvalDate: "2026-02-06T00:00:00Z", expiryDate: "2027-02-06T00:00:00Z", planReviewNumber: "PR-2026-0187",
  },
  // EDGE CASE: Revision Requested — revisionCount = 2
  {
    id: "frm_v1k8m", jobId: "job_r4c6w", formType: "EHP-19", propertyOwner: "Razorback Land & Excavation",
    address: "2417 County Road 108, Siloam Springs, AR 72761", county: "Benton", parcelNumber: "01-06188-000",
    bedroomCount: 4, dailyFlowGPD: 450, percRate: 29, loadingRate: 0.35, absorptionAreaSqFt: 1286,
    soilType: "Clay Loam", seasonalWaterTableDepth: 60, tankSizeGallons: 1250, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 390, trenchCount: 4, trenchWidthIn: 30, trenchDepthIn: 30,
    formStatus: "Complete", adhStatus: "Revision Requested", submittedDate: "2026-01-04T10:00:00Z",
    revisionCount: 2, approvalDate: null, expiryDate: null, planReviewNumber: "PR-2026-0142",
  },
  // EDGE CASE: EHP-19N for ATU — failing perc, SludgeHammer S-600
  {
    id: "frm_c8p4z", jobId: "job_q1h7b", formType: "EHP-19N", propertyOwner: "Beaver Lake Properties Inc.",
    address: "17240 Lakeview Heights Dr, Rogers, AR 72756", county: "Benton", parcelNumber: "01-14820-000",
    bedroomCount: 4, dailyFlowGPD: 450, percRate: 72, loadingRate: 0.2, absorptionAreaSqFt: 2250,
    soilType: "Heavy Clay", seasonalWaterTableDepth: 42, tankSizeGallons: 1500, doseTankGallons: 400,
    systemType: "ATU — SludgeHammer S-600", fieldLineLengthFt: 450, trenchCount: 5, trenchWidthIn: 36, trenchDepthIn: 24,
    formStatus: "Draft", adhStatus: "Draft", submittedDate: null,
    revisionCount: 0, approvalDate: null, expiryDate: null, planReviewNumber: null,
  },
  // EDGE CASE: Pumped LPP with Zoeller 151
  {
    id: "frm_m5j7q", jobId: "job_p9n4r", formType: "EHP-19", propertyOwner: "Three Forks Construction",
    address: "3107 Horseshoe Bend Rd, Cave Springs, AR 72718", county: "Benton", parcelNumber: "01-09213-001",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 38, loadingRate: 0.3, absorptionAreaSqFt: 1167,
    soilType: "Clay Loam", seasonalWaterTableDepth: 54, tankSizeGallons: 1000, doseTankGallons: 500,
    systemType: "Pumped LPP — Zoeller 151", fieldLineLengthFt: 350, trenchCount: 4, trenchWidthIn: 24, trenchDepthIn: 24,
    formStatus: "Complete", adhStatus: "Draft", submittedDate: null,
    revisionCount: 0, approvalDate: null, expiryDate: null, planReviewNumber: null,
  },
  {
    id: "frm_r9n2v", jobId: "job_w2c9j", formType: "EHP-19", propertyOwner: "Gary & Pam Whitfield",
    address: "5582 Millstone Creek Rd, Fayetteville, AR 72701", county: "Washington", parcelNumber: "02-07291-000",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 11, loadingRate: 0.6, absorptionAreaSqFt: 583,
    soilType: "Sandy Loam", seasonalWaterTableDepth: 90, tankSizeGallons: 1000, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 180, trenchCount: 2, trenchWidthIn: 24, trenchDepthIn: 30,
    formStatus: "Signed", adhStatus: "Approved", submittedDate: "2025-12-15T10:00:00Z",
    revisionCount: 0, approvalDate: "2025-12-30T00:00:00Z", expiryDate: "2026-12-30T00:00:00Z", planReviewNumber: "PR-2026-0208",
  },
  {
    id: "frm_a1o6k", jobId: "job_b6u3s", formType: "EHP-19", propertyOwner: "Baxter County Home Builders",
    address: "441 Overlook Point Dr, Mountain Home, AR 72653", county: "Baxter", parcelNumber: "07-06710-000",
    bedroomCount: 4, dailyFlowGPD: 450, percRate: 24, loadingRate: 0.4, absorptionAreaSqFt: 1125,
    soilType: "Loam", seasonalWaterTableDepth: 66, tankSizeGallons: 1250, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 300, trenchCount: 3, trenchWidthIn: 30, trenchDepthIn: 30,
    formStatus: "Submitted", adhStatus: "Approved", submittedDate: "2026-01-05T10:00:00Z",
    revisionCount: 0, approvalDate: "2026-01-22T00:00:00Z", expiryDate: "2027-01-22T00:00:00Z", planReviewNumber: "PR-2026-0193",
  },
  // EDGE CASE: ATU Infiltrator Ecopod — EHP-19N with dose tank
  {
    id: "frm_n4y8b", jobId: "job_n1e4a", formType: "EHP-19N", propertyOwner: "Travis Norwood",
    address: "8814 Blackberry Hill Rd, Conway, AR 72032", county: "Faulkner", parcelNumber: "30-04891-000",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 55, loadingRate: 0.25, absorptionAreaSqFt: 1400,
    soilType: "Clay Loam", seasonalWaterTableDepth: 48, tankSizeGallons: 1500, doseTankGallons: 300,
    systemType: "ATU — Infiltrator Ecopod", fieldLineLengthFt: 420, trenchCount: 5, trenchWidthIn: 24, trenchDepthIn: 18,
    formStatus: "Submitted", adhStatus: "Under Review", submittedDate: "2026-02-18T10:00:00Z",
    revisionCount: 0, approvalDate: null, expiryDate: null, planReviewNumber: "PR-2026-0238",
  },
  {
    id: "frm_g6d3p", jobId: "job_t4i8u", formType: "EHP-19", propertyOwner: "Three Forks Construction",
    address: "780 Boxley Valley Ln, Harrison, AR 72601", county: "Boone", parcelNumber: "09-03712-000",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 12, loadingRate: 0.6, absorptionAreaSqFt: 583,
    soilType: "Gravelly Loam", seasonalWaterTableDepth: 96, tankSizeGallons: 1000, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 180, trenchCount: 2, trenchWidthIn: 24, trenchDepthIn: 28,
    formStatus: "Submitted", adhStatus: "Approved", submittedDate: "2025-12-18T10:00:00Z",
    revisionCount: 0, approvalDate: "2026-01-07T00:00:00Z", expiryDate: "2027-01-07T00:00:00Z", planReviewNumber: "PR-2026-0171",
  },
  // EDGE CASE: Permit Expired — past 12-month validity
  {
    id: "frm_x2w5e", jobId: "job_e5z2n", formType: "EHP-19", propertyOwner: "White River Homes",
    address: "731 Persimmon Creek Rd, Bull Shoals, AR 72619", county: "Baxter", parcelNumber: "07-02941-000",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 15, loadingRate: 0.5, absorptionAreaSqFt: 700,
    soilType: "Sandy Loam", seasonalWaterTableDepth: 84, tankSizeGallons: 1000, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 200, trenchCount: 2, trenchWidthIn: 24, trenchDepthIn: 30,
    formStatus: "Signed", adhStatus: "Approved", submittedDate: "2025-01-24T10:00:00Z",
    revisionCount: 0, approvalDate: "2025-02-18T00:00:00Z", expiryDate: "2026-02-18T00:00:00Z", planReviewNumber: "PR-2025-0812",
  },
  {
    id: "frm_l8r1c", jobId: "job_c7o9r", formType: "EHP-19", propertyOwner: "Carl & Ruth Bledsoe",
    address: "3309 Garrison Ave Extension, Fort Smith, AR 72901", county: "Sebastian", parcelNumber: "66-09241-000",
    bedroomCount: 3, dailyFlowGPD: 350, percRate: 19, loadingRate: 0.45, absorptionAreaSqFt: 778,
    soilType: "Silt Loam", seasonalWaterTableDepth: 72, tankSizeGallons: 1000, doseTankGallons: null,
    systemType: "Conventional Gravity", fieldLineLengthFt: 260, trenchCount: 3, trenchWidthIn: 24, trenchDepthIn: 30,
    formStatus: "Submitted", adhStatus: "Approved", submittedDate: "2025-11-18T10:00:00Z",
    revisionCount: 0, approvalDate: "2025-12-04T00:00:00Z", expiryDate: "2026-12-04T00:00:00Z", planReviewNumber: "PR-2025-1048",
  },
  // EDGE CASE: Surface Discharge — commercial, no perc required
  {
    id: "frm_o9b6f", jobId: "job_v9r3l", formType: "EHP-19N", propertyOwner: "Ozarks Rural Electric Cooperative",
    address: "11900 Hwy 412 W, Huntsville, AR 72740", county: "Washington", parcelNumber: "02-21849-000",
    bedroomCount: 0, dailyFlowGPD: 800, percRate: 0, loadingRate: 0, absorptionAreaSqFt: 0,
    soilType: "Loam", seasonalWaterTableDepth: 60, tankSizeGallons: 2000, doseTankGallons: 750,
    systemType: "Surface Discharge", fieldLineLengthFt: 0, trenchCount: 0, trenchWidthIn: 0, trenchDepthIn: 0,
    formStatus: "Submitted", adhStatus: "Under Review", submittedDate: "2026-02-24T10:00:00Z",
    revisionCount: 0, approvalDate: null, expiryDate: null, planReviewNumber: "PR-2026-0247",
  },
];

// ---------------------------------------------------------------------------
// Site Plans — 8 records; NW Arkansas GPS coordinates (~36.3°N, 94.2°W)
// ---------------------------------------------------------------------------
export const sitePlans: SitePlan[] = [
  { id: "spl_m7r4k", jobId: "job_k8m2p", address: "14823 NW Claybrook Rd, Garfield, AR 72732", gpsLat: 36.4182, gpsLng: -94.1074, tankPlacement: "25 ft NE of dwelling, 12 ft from property line", fieldLineLayout: "Three 90-ft trenches on-contour, NW→SE gradient; D-box at tank outlet", setbackPropertyLineFt: 12, setbackWellFt: 112, setbackDwellingFt: 25, setbackWaterBodyFt: null, benchmarkElevation: 1248.4, soilPitCount: 4, drawingStatus: "Approved", drawnBy: "Bodie Drake", createdAt: "2026-01-27T14:30:00Z" },
  { id: "spl_r2t8n", jobId: "job_7x3q1", address: "6200 Ridgecrest Ln, Bentonville, AR 72712", gpsLat: 36.3729, gpsLng: -94.2184, tankPlacement: "18 ft E of dwelling, downslope from kitchen", fieldLineLayout: "Three 100-ft trenches on-contour, W→E; 8 ft center-to-center", setbackPropertyLineFt: 14, setbackWellFt: null, setbackDwellingFt: 18, setbackWaterBodyFt: null, benchmarkElevation: 1318.7, soilPitCount: 5, drawingStatus: "Approved", drawnBy: "Kriss Kelley", createdAt: "2026-01-10T13:15:00Z" },
  { id: "spl_j9v5p", jobId: "job_p9n4r", address: "3107 Horseshoe Bend Rd, Cave Springs, AR 72718", gpsLat: 36.2688, gpsLng: -94.2019, tankPlacement: "20 ft SE of dwelling; dose tank 6 ft downslope from septic", fieldLineLayout: "Four 90-ft LPP laterals on-contour; Zoeller 151 pump in dose tank", setbackPropertyLineFt: 11, setbackWellFt: 104, setbackDwellingFt: 20, setbackWaterBodyFt: null, benchmarkElevation: 1384.2, soilPitCount: 4, drawingStatus: "Under Review", drawnBy: "Daniel Howard", createdAt: "2026-02-06T11:00:00Z" },
  { id: "spl_b4w1q", jobId: "job_f2v8t", address: "8940 Staghorn Hollow Rd, Gravette, AR 72736", gpsLat: 36.4311, gpsLng: -94.4582, tankPlacement: "22 ft S of dwelling, 15 ft from driveway", fieldLineLayout: "Two 100-ft trenches on-contour, E→W gradient", setbackPropertyLineFt: 15, setbackWellFt: null, setbackDwellingFt: 22, setbackWaterBodyFt: null, benchmarkElevation: 1172.6, soilPitCount: 4, drawingStatus: "Approved", drawnBy: "Bodie Drake", createdAt: "2026-01-30T15:45:00Z" },
  { id: "spl_x6c3m", jobId: "job_q1h7b", address: "17240 Lakeview Heights Dr, Rogers, AR 72756", gpsLat: 36.3358, gpsLng: -94.1842, tankPlacement: "28 ft NW of dwelling; 1500-gal ATU tank with 400-gal dose tank adjacent", fieldLineLayout: "Five 90-ft ATU laterals at 0.20 GPD/ft²; D-box to manifold", setbackPropertyLineFt: 13, setbackWellFt: null, setbackDwellingFt: 28, setbackWaterBodyFt: 108, benchmarkElevation: 1241.8, soilPitCount: 5, drawingStatus: "Draft", drawnBy: "Bodie Drake", createdAt: "2026-02-13T10:00:00Z" },
  // EDGE CASE: Revision Needed — well setback not documented
  { id: "spl_y5f2h", jobId: "job_r4c6w", address: "2417 County Road 108, Siloam Springs, AR 72761", gpsLat: 36.1881, gpsLng: -94.5194, tankPlacement: "24 ft SE of dwelling; adjacent parcel well setback undocumented", fieldLineLayout: "Four 100-ft trenches on-contour; D-box to lateral manifold", setbackPropertyLineFt: 10, setbackWellFt: null, setbackDwellingFt: 24, setbackWaterBodyFt: null, benchmarkElevation: 1094.8, soilPitCount: 5, drawingStatus: "Revision Needed", drawnBy: "Kriss Kelley", createdAt: "2025-12-30T10:00:00Z" },
  { id: "spl_k1h9r", jobId: "job_w2c9j", address: "5582 Millstone Creek Rd, Fayetteville, AR 72701", gpsLat: 36.0613, gpsLng: -94.1579, tankPlacement: "16 ft SE of dwelling footprint", fieldLineLayout: "Two 90-ft trenches on-contour, S gradient", setbackPropertyLineFt: 10, setbackWellFt: null, setbackDwellingFt: 16, setbackWaterBodyFt: null, benchmarkElevation: 1418.3, soilPitCount: 4, drawingStatus: "Approved", drawnBy: "Kriss Kelley", createdAt: "2025-12-04T13:30:00Z" },
  { id: "spl_d8o4t", jobId: "job_b6u3s", address: "441 Overlook Point Dr, Mountain Home, AR 72653", gpsLat: 36.3348, gpsLng: -92.3791, tankPlacement: "20 ft E of dwelling, 12 ft from garage", fieldLineLayout: "Three 100-ft trenches on-contour, SE gradient; 8 ft center-to-center", setbackPropertyLineFt: 12, setbackWellFt: null, setbackDwellingFt: 20, setbackWaterBodyFt: null, benchmarkElevation: 942.7, soilPitCount: 4, drawingStatus: "Approved", drawnBy: "Valeria Vazques", createdAt: "2025-12-20T09:45:00Z" },
];

// ---------------------------------------------------------------------------
// Field Events / Calendar — 15 entries
// ---------------------------------------------------------------------------
export const fieldEvents: FieldEvent[] = [
  { id: "evt_9q2r1", jobId: "job_m0t5f", eventType: "Perc Test", date: "2026-03-05", timeSlot: "08:00 AM", drAssigned: "Daniel Howard", address: "1923 Turkey Creek Hollow, Berryville, AR 72616", county: "Carroll", status: "Scheduled", notes: "Pre-soak holes dug 3/3. Bring laser level for benchmark." },
  { id: "evt_3n8k2", jobId: "job_p9n4r", eventType: "Site Survey", date: "2026-03-06", timeSlot: "09:00 AM", drAssigned: "Daniel Howard", address: "3107 Horseshoe Bend Rd, Cave Springs, AR 72718", county: "Benton", status: "Scheduled", notes: "Final shot sheet and grade check before EHP-19 submission." },
  { id: "evt_7h4v3", jobId: "job_q1h7b", eventType: "Retest", date: "2026-03-13", timeSlot: "08:00 AM", drAssigned: "Bodie Drake", address: "17240 Lakeview Heights Dr, Rogers, AR 72756", county: "Benton", status: "Scheduled", notes: "ATU confirmation test — NW corner alternate holes. Original 72 min/in." },
  { id: "evt_1t9p5", jobId: "job_w2c9j", eventType: "Inspection", date: "2026-03-04", timeSlot: "Afternoon", drAssigned: "Kriss Kelley", address: "5582 Millstone Creek Rd, Fayetteville, AR 72701", county: "Washington", status: "Scheduled", notes: "ADH inspector confirmed. Operation permit expected same day." },
  { id: "evt_5c6w4", jobId: "job_b6u3s", eventType: "Installation", date: "2026-02-27", timeSlot: "07:30 AM", drAssigned: "Abner Martinez", address: "441 Overlook Point Dr, Mountain Home, AR 72653", county: "Baxter", status: "Completed", notes: "1250-gal tank set. Three trenches excavated. Field lines and D-box installed." },
  { id: "evt_8r1x6", jobId: "job_s6l1x", eventType: "Perc Test", date: "2026-01-23", timeSlot: "07:30 AM", drAssigned: "Bodie Drake", address: "Whispering Pines Estates Phase 2, Springdale, AR 72764", county: "Washington", status: "Completed", notes: "8-lot subdivision. All holes done. Lot 3 marginal, Lot 7 failing — ATU path." },
  { id: "evt_2m5b7", jobId: "job_k8m2p", eventType: "Site Survey", date: "2026-01-24", timeSlot: "08:00 AM", drAssigned: "Bodie Drake", address: "14823 NW Claybrook Rd, Garfield, AR 72732", county: "Benton", status: "Completed", notes: "Shot sheet done. Benchmark set at NE corner of pad. EHP-19 submitted 2/3." },
  { id: "evt_6k3j8", jobId: "job_r4c6w", eventType: "Site Survey", date: "2026-02-20", timeSlot: "09:00 AM", drAssigned: "Kriss Kelley", address: "2417 County Road 108, Siloam Springs, AR 72761", county: "Benton", status: "Completed", notes: "Second revision site visit. Adjacent well setback confirmed. Resubmitting week of 3/3." },
  { id: "evt_4o7m9", jobId: "job_t4i8u", eventType: "Inspection", date: "2026-01-23", timeSlot: "10:00 AM", drAssigned: "Daniel Howard", address: "780 Boxley Valley Ln, Harrison, AR 72601", county: "Boone", status: "Completed", notes: "ADH inspection passed. Operation Permit issued on site." },
  { id: "evt_u8d4n", jobId: "job_n1e4a", eventType: "Perc Test", date: "2026-02-05", timeSlot: "08:00 AM", drAssigned: "Bodie Drake", address: "8814 Blackberry Hill Rd, Conway, AR 72032", county: "Faulkner", status: "Completed", notes: "55 min/in marginal, SHWT 48 in. ATU Infiltrator Ecopod selected." },
  { id: "evt_q5e8p", jobId: "job_v9r3l", eventType: "Site Survey", date: "2026-02-19", timeSlot: "08:30 AM", drAssigned: "Valeria Vazques", address: "11900 Hwy 412 W, Huntsville, AR 72740", county: "Washington", status: "Completed", notes: "RV park surface discharge. 2000-gal tank, 750-gal dose tank. GPS logged. NPDES note added." },
  { id: "evt_w7t6s", jobId: "job_h3g0v", eventType: "Perc Test", date: "2026-01-22", timeSlot: "09:00 AM", drAssigned: "Valeria Vazques", address: "12040 Pinnacle Valley Rd, Little Rock, AR 72223", county: "Pulaski", status: "Completed", notes: "Test complete, 20 min/in. Job placed on hold — client financing contingency." },
  { id: "evt_i3r9q", jobId: "job_f2v8t", eventType: "Site Survey", date: "2026-01-30", timeSlot: "08:00 AM", drAssigned: "Bodie Drake", address: "8940 Staghorn Hollow Rd, Gravette, AR 72736", county: "Benton", status: "Completed", notes: "Shot sheet complete. EHP-19 submitted to Benton County ADH 2/11." },
  { id: "evt_l9k2w", jobId: "job_q1h7b", eventType: "Perc Test", date: "2026-02-06", timeSlot: "08:00 AM", drAssigned: "Bodie Drake", address: "17240 Lakeview Heights Dr, Rogers, AR 72756", county: "Benton", status: "Completed", notes: "Failing 72 min/in — heavy clay. ATU design initiated." },
  { id: "evt_0a2h0", jobId: "job_c7o9r", eventType: "Property Transfer Inspection", date: "2025-12-18", timeSlot: "09:30 AM", drAssigned: "Kriss Kelley", address: "3309 Garrison Ave Extension, Fort Smith, AR 72901", county: "Sebastian", status: "Completed", notes: "Pre-sale inspection passed. Tank in good condition. Operation permit on file." },
];

// ---------------------------------------------------------------------------
// Dashboard Stats
// ---------------------------------------------------------------------------
export const dashboardStats: DashboardStats = {
  activePermits: 7,
  activePermitsChange: 16.7,
  jobsThisMonth: 12,
  jobsThisMonthChange: 9.1,
  pendingInvoices: 28640.75,
  pendingInvoicesChange: -4.3,
  avgReviewDays: 13.4,
  avgReviewDaysChange: -1.8,
  revisionsPending: 2,
  percTestsScheduled: 3,
  approvalRate: 78.6,
};

// ---------------------------------------------------------------------------
// Monthly Metrics — 12 months; seasonal: spring peak (Mar–May), winter slow (Dec–Feb)
// ---------------------------------------------------------------------------
export const monthlyMetrics: MonthlyMetric[] = [
  { month: "Mar", permitsSubmitted: 8,  permitsApproved: 6,  revisionCount: 2, avgTurnaroundDays: 14.2, conceptualPlans: 3, percTests: 11, revenue: 48720.50 },
  { month: "Apr", permitsSubmitted: 11, permitsApproved: 9,  revisionCount: 1, avgTurnaroundDays: 12.8, conceptualPlans: 4, percTests: 15, revenue: 67340.00 },
  { month: "May", permitsSubmitted: 14, permitsApproved: 12, revisionCount: 3, avgTurnaroundDays: 13.1, conceptualPlans: 5, percTests: 18, revenue: 82150.75 },
  { month: "Jun", permitsSubmitted: 13, permitsApproved: 11, revisionCount: 2, avgTurnaroundDays: 14.7, conceptualPlans: 3, percTests: 16, revenue: 74820.00 },
  { month: "Jul", permitsSubmitted: 10, permitsApproved: 8,  revisionCount: 2, avgTurnaroundDays: 15.3, conceptualPlans: 2, percTests: 13, revenue: 61480.25 },
  { month: "Aug", permitsSubmitted: 9,  permitsApproved: 7,  revisionCount: 1, avgTurnaroundDays: 14.9, conceptualPlans: 2, percTests: 12, revenue: 57210.00 },
  { month: "Sep", permitsSubmitted: 11, permitsApproved: 10, revisionCount: 1, avgTurnaroundDays: 12.4, conceptualPlans: 3, percTests: 14, revenue: 68900.50 },
  { month: "Oct", permitsSubmitted: 12, permitsApproved: 10, revisionCount: 2, avgTurnaroundDays: 13.2, conceptualPlans: 4, percTests: 15, revenue: 72140.75 },
  { month: "Nov", permitsSubmitted: 10, permitsApproved: 8,  revisionCount: 3, avgTurnaroundDays: 15.8, conceptualPlans: 3, percTests: 12, revenue: 63480.00 },
  { month: "Dec", permitsSubmitted: 5,  permitsApproved: 4,  revisionCount: 1, avgTurnaroundDays: 12.1, conceptualPlans: 1, percTests: 5,  revenue: 31200.50 },
  { month: "Jan", permitsSubmitted: 6,  permitsApproved: 5,  revisionCount: 2, avgTurnaroundDays: 13.6, conceptualPlans: 2, percTests: 7,  revenue: 38750.00 },
  { month: "Feb", permitsSubmitted: 9,  permitsApproved: 7,  revisionCount: 2, avgTurnaroundDays: 13.4, conceptualPlans: 3, percTests: 11, revenue: 54380.25 },
];

// ---------------------------------------------------------------------------
// Permit Pipeline — ADH stage counts
// ---------------------------------------------------------------------------
export const permitPipeline: PermitPipelineCount[] = [
  { stage: "Design In Progress",       count: 3, color: "hsl(207, 80%, 54%)" },
  { stage: "Permit Submitted",         count: 2, color: "hsl(207, 65%, 44%)" },
  { stage: "Under ADH Review",         count: 3, color: "hsl(38, 90%, 54%)"  },
  { stage: "Revision Requested",       count: 2, color: "hsl(22, 90%, 54%)"  },
  { stage: "Approved — Awaiting Install", count: 1, color: "hsl(145, 60%, 40%)" },
];

// ---------------------------------------------------------------------------
// Jobs by County — categorical
// ---------------------------------------------------------------------------
export const jobsByCounty: JobsByCounty[] = [
  { county: "Benton",    jobs: 8, revenue: 87420.50 },
  { county: "Washington",jobs: 3, revenue: 34180.00 },
  { county: "Baxter",    jobs: 2, revenue: 22190.75 },
  { county: "Carroll",   jobs: 2, revenue: 8320.00  },
  { county: "Faulkner",  jobs: 1, revenue: 13200.00 },
  { county: "Pulaski",   jobs: 1, revenue: 7150.50  },
  { county: "Sebastian", jobs: 1, revenue: 5980.00  },
  { county: "Boone",     jobs: 1, revenue: 6100.75  },
];

// ---------------------------------------------------------------------------
// System Type Breakdown — categorical
// ---------------------------------------------------------------------------
export const systemTypeBreakdown: SystemTypeBreakdown[] = [
  { systemType: "Conventional Gravity",       count: 11, percentage: 64.7 },
  { systemType: "ATU — SludgeHammer",         count: 2,  percentage: 11.8 },
  { systemType: "Pumped LPP — Zoeller 151",   count: 1,  percentage: 5.9  },
  { systemType: "ATU — Infiltrator Ecopod",   count: 1,  percentage: 5.9  },
  { systemType: "Surface Discharge",          count: 1,  percentage: 5.9  },
  { systemType: "Pending / Not Sized",        count: 1,  percentage: 5.9  },
];

// ---------------------------------------------------------------------------
// Recent Activity Feed — 16 timeline events
// ---------------------------------------------------------------------------
export const recentActivity: ActivityEvent[] = [
  { id: "act_h2n4m", jobId: "job_b6u3s", jobNumber: "J-2026-040", eventType: "installation_started",  description: "Installation started — 1250-gal tank delivered, excavation underway",                                          drName: "Abner Martinez",  timestamp: "2026-02-27T07:41:22Z", county: "Baxter"    },
  { id: "act_k4r1p", jobId: "job_v9r3l", jobNumber: "J-2026-047", eventType: "permit_submitted",       description: "EHP-19N submitted to Washington County ADH — surface discharge, RV park facility",                          drName: "Valeria Vazques", timestamp: "2026-02-24T10:18:44Z", county: "Washington" },
  { id: "act_q7t9w", jobId: "job_n1e4a", jobNumber: "J-2026-045", eventType: "permit_submitted",       description: "EHP-19N submitted to Faulkner County ADH — ATU Infiltrator Ecopod, PR-2026-0238 assigned",                  drName: "Bodie Drake",     timestamp: "2026-02-18T10:05:19Z", county: "Faulkner"  },
  { id: "act_z5v3o", jobId: "job_e5z2n", jobNumber: "J-2025-089", eventType: "permit_expired",         description: "Permit PR-2025-0812 expired — 12-month validity lapsed 2026-02-18. Revalidation request filed.",             drName: null,              timestamp: "2026-02-18T00:00:00Z", county: "Baxter"    },
  { id: "act_n7u2a", jobId: "job_d8y4k", jobNumber: "J-2026-031", eventType: "site_flagged",           description: "ADH denial issued — shallow bedrock (Boone Fm limestone) at 14 in. Site deemed unbuildable.",                drName: null,              timestamp: "2026-02-10T11:20:33Z", county: "Carroll"   },
  { id: "act_r6p1z", jobId: "job_r4c6w", jobNumber: "J-2026-027", eventType: "revision_requested",     description: "Second ADH revision — loading rate discrepancy and adjacent well setback undocumented.",                    drName: null,              timestamp: "2026-02-14T09:04:22Z", county: "Benton"    },
  { id: "act_f3m6x", jobId: "job_q1h7b", jobNumber: "J-2026-046", eventType: "perc_test_completed",    description: "Perc test complete — FAILING at 72 min/in (heavy clay). ATU path required.",                               drName: "Bodie Drake",     timestamp: "2026-02-06T12:47:33Z", county: "Benton"    },
  { id: "act_b8s2n", jobId: "job_n1e4a", jobNumber: "J-2026-045", eventType: "perc_test_completed",    description: "Perc test complete — marginal 55 min/in. ATU Infiltrator Ecopod design initiated.",                        drName: "Bodie Drake",     timestamp: "2026-02-05T13:22:10Z", county: "Faulkner"  },
  { id: "act_j1c7v", jobId: "job_f2v8t", jobNumber: "J-2026-039", eventType: "permit_submitted",       description: "EHP-19 submitted to Benton County ADH — PR-2026-0231 assigned",                                            drName: "Bodie Drake",     timestamp: "2026-02-11T10:31:07Z", county: "Benton"    },
  { id: "act_e2a9h", jobId: "job_k8m2p", jobNumber: "J-2026-041", eventType: "permit_submitted",       description: "EHP-19 submitted to Benton County ADH — PR-2026-0214 assigned",                                            drName: "Bodie Drake",     timestamp: "2026-02-03T10:11:38Z", county: "Benton"    },
  { id: "act_d5o3k", jobId: "job_p9n4r", jobNumber: "J-2026-044", eventType: "perc_test_completed",    description: "Perc test complete — marginal 38 min/in. Pumped LPP with Zoeller 151 recommended.",                       drName: "Daniel Howard",   timestamp: "2026-01-30T14:15:48Z", county: "Benton"    },
  { id: "act_g4n8q", jobId: "job_7x3q1", jobNumber: "J-2026-038", eventType: "permit_approved",        description: "Permit approved by ADH — PR-2026-0187. Approved for construction.",                                        drName: null,              timestamp: "2026-02-06T00:00:00Z", county: "Benton"    },
  { id: "act_c3l5m", jobId: "job_s6l1x", jobNumber: "J-2026-036", eventType: "perc_test_completed",    description: "Subdivision perc tests complete — 8 lots. 6 pass, 1 marginal, 1 fail (ATU). Design commencing.",            drName: "Bodie Drake",     timestamp: "2026-01-23T15:48:00Z", county: "Washington" },
  { id: "act_t1w8b", jobId: "job_b6u3s", jobNumber: "J-2026-040", eventType: "permit_approved",        description: "Permit approved — PR-2026-0193. Installation authorized. Client notified.",                                drName: null,              timestamp: "2026-01-22T00:00:00Z", county: "Baxter"    },
  { id: "act_y9f4c", jobId: "job_w2c9j", jobNumber: "J-2026-042", eventType: "client_signature_received", description: "EHP-19 signed by property owner via DocuSign. Ready for final permit submission.",                     drName: "Kriss Kelley",    timestamp: "2026-01-14T16:33:52Z", county: "Washington" },
  { id: "act_h8k6j", jobId: "job_c7o9r", jobNumber: "J-2026-037", eventType: "operation_permit_issued", description: "Operation Permit issued — ADH post-install inspection passed. System legally operational.",               drName: "Kriss Kelley",    timestamp: "2025-12-19T14:09:27Z", county: "Sebastian"  },
];

// ---------------------------------------------------------------------------
// Lookup helpers — downstream Feature Builder joins these
// ---------------------------------------------------------------------------
export const getJobById = (id: string): Job | undefined => jobs.find((j) => j.id === id);
export const getPercTestByJobId = (jobId: string): PercTest | undefined => percTests.find((p) => p.jobId === jobId);
export const getPermitFormByJobId = (jobId: string): PermitForm | undefined => permitForms.find((f) => f.jobId === jobId);
export const getSitePlanByJobId = (jobId: string): SitePlan | undefined => sitePlans.find((s) => s.jobId === jobId);
export const getCrewMemberById = (id: string): CrewMember | undefined => crewMembers.find((c) => c.id === id);
export const getFieldEventsByJobId = (jobId: string): FieldEvent[] => fieldEvents.filter((e) => e.jobId === jobId);
export const getActivityByJobId = (jobId: string): ActivityEvent[] => recentActivity.filter((a) => a.jobId === jobId);
export const getJobsByStatus = (status: Job["status"]): Job[] => jobs.filter((j) => j.status === status);
export const getJobsByCounty = (county: Job["county"]): Job[] => jobs.filter((j) => j.county === county);
export const getJobsByDR = (drId: string): Job[] => jobs.filter((j) => j.assignedDR === drId);
