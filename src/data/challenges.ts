import type { Challenge } from "@/lib/types";

export const executiveSummary = {
  commonApproach:
    "Most developers build septic permitting apps as generic job trackers — status dropdowns, file uploads, a calendar. They don't understand that a DR firm's bottleneck isn't scheduling, it's the ADH handoff: six conditional permit paths, GPS coordinates that break site plans, and a paper-based EHP-19 form that takes 45 minutes to fill out manually.",
  differentApproach:
    "I model the full ADH permit lifecycle — conditional branching for pumped, gravity, and ATU systems, auto-calculated field sizing from perc test data, and a single-submission pipeline that pushes data through Jobber, OneDrive, and the ADH portal without re-entering anything.",
  accentWord: "single-submission pipeline",
};

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Six permit paths — one workflow engine",
    description:
      "Each service type (Individual, Non-Individual, Conceptual Plan, PercTest Letter, Inspection, Surface Discharge) follows a different ADH approval path. Conventional, ATU, and pumped LPP systems each require different EHP-19 fields, different supporting documents, and different revision loops. A flat status dropdown breaks on the first revision request.",
    visualizationType: "flow",
    outcome:
      "Could compress permit turnaround from 2 weeks to under 2 hours by automating handoffs between Field Work → Drafting → ADH Submission stages",
  },
  {
    id: "challenge-2",
    title: "GPS site plans with auto-calculated field lines",
    description:
      "DRs collect GPS coordinates in the field with a Geode receiver, but translating those coordinates into a scaled 11×17 site plan — with setback lines, on-contour field placement, and loading-rate-driven absorption area — currently happens manually in separate software. Any change to the perc rate invalidates the entire drawing.",
    visualizationType: "architecture",
    outcome:
      "Could eliminate manual drawing of site plans by auto-calculating septic field line placement from soil pit data and property boundary inputs",
  },
  {
    id: "challenge-3",
    title: "Jobber → app → OneDrive → ADH: one source of truth",
    description:
      "Currently, a job lives in Jobber for scheduling, a spreadsheet for permit tracking, and email for ADH correspondence. When ADH requests a revision, the correction has to be made in three places. The integration layer — Jobber webhooks, Microsoft Graph API for OneDrive sync, and ADH portal form fill — is the load-bearing infrastructure of the whole system.",
    visualizationType: "architecture",
    outcome:
      "Could eliminate duplicate data entry across Jobber, paper forms, and the ADH portal — single source of truth for every project",
  },
  {
    id: "challenge-4",
    title: "EHP-19 auto-fill from field data capture",
    description:
      "The EHP-19/EHP-19N has over 40 fields. Most of them are computed: daily flow from bedroom count, absorption area from loading rate and daily flow, trench count from absorption area and trench dimensions. A DR doing this manually takes 30–60 minutes per permit. The auto-fill engine derives every calculated field and routes ATU systems to the EHP-19N path with its additional documentation requirements.",
    visualizationType: "before-after",
    outcome:
      "Could replace manual EHP-19/EHP-19N form completion (30–60 min per permit) with auto-generated PDFs populated directly from field data capture",
  },
];
