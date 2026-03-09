import type { Profile, PortfolioProject } from "@/lib/types";

// ---------------------------------------------------------------------------
// Proposal data for PERC WORLD — Septic Permit Workflow App
// Tailored to William @ PercPro LLC, Arkansas
// ---------------------------------------------------------------------------

export const profile: Profile = {
  name: "Humam",
  tagline:
    "I'll finish your Dreamflow app and take it live — mapping, signatures, ADH submission, all done by April 1.",
  bio: "Full-stack developer with field-service app experience — built multi-module SaaS platforms for construction, fleet management, and operations teams that needed something real, not a demo.",
  approach: [
    {
      title: "Audit your existing build",
      description:
        "I read through your 10–15 hours of Dreamflow work first. No restarts, no wasted progress — I pick up where you left off.",
    },
    {
      title: "Map the remaining workflows",
      description:
        "Forms, mapping, signatures, ADH submission — I scope exactly what's left and send you a clear list before touching any code.",
    },
    {
      title: "Build daily with visible progress",
      description:
        "You'll see updates every day. Working screens, not status reports. If something needs a decision, I flag it fast.",
    },
    {
      title: "Test with real permit data and deploy",
      description:
        "I'll test against actual EHP-19 workflows before go-live. No surprises on submission day.",
    },
  ],
  skillCategories: [
    {
      name: "App Platform",
      skills: ["Dreamflow", "FlutterFlow", "Firebase", "Supabase"],
    },
    {
      name: "Field & Mapping",
      skills: ["GPS / Mapping APIs", "Geolocation", "Site Plans", "PDF Generation"],
    },
    {
      name: "Integrations",
      skills: ["Microsoft OneDrive", "Digital Signatures", "Jobber API", "Webhook Automation"],
    },
    {
      name: "Delivery",
      skills: ["Mobile App Build", "App Store Deploy", "Project Management", "Daily Updates"],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "construction-iq",
    title: "ConstructionIQ",
    description:
      "Construction project intelligence platform with permit monitoring, site tracking, and regional analytics across multiple markets.",
    outcome:
      "Multi-region project intelligence dashboard tracking pipeline, permits, and supplier matches across 8 markets",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    liveUrl: "https://construction-intel-ivory.vercel.app",
    relevance: "Permit tracking and field operations — same domain, different stack",
  },
  {
    id: "fleet-saas",
    title: "Fleet Maintenance SaaS",
    description:
      "Asset tracking, work orders, preventive maintenance scheduling, inspections, and parts inventory — the full field-service lifecycle.",
    outcome:
      "6-module SaaS covering the full maintenance lifecycle — from asset registry to work orders to parts inventory",
    tech: ["Next.js", "TypeScript", "Recharts", "shadcn/ui"],
    relevance: "Multi-workflow field operations app — same pattern as septic permit workflows",
  },
  {
    id: "lead-crm",
    title: "Lead Intake CRM",
    description:
      "End-to-end lead management with public intake forms, pipeline management, lead scoring, and configurable automation rules.",
    outcome:
      "End-to-end lead flow — public intake form to scored pipeline with configurable automation rules",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance: "Form-to-workflow automation — the same pattern as perc test → permit submission",
  },
];
