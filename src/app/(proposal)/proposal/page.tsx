import Link from "next/link";
import { ExternalLink, TrendingUp, ArrowLeft } from "lucide-react";
import { APP_CONFIG } from "@/lib/config";
import { profile, portfolioProjects } from "@/data/proposal";

// ---------------------------------------------------------------------------
// PERC WORLD — "Work With Me" page
// Hero: Asymmetric Split (dark 65% / stats sidebar 35%)
// Portfolio: Stacked Stories (2-3 strong matches)
// Process: Vertical Timeline
// Skills: Inline Groups
// CTA: Minimal Close
// ---------------------------------------------------------------------------

export default function ProposalPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Section 1: Hero — Asymmetric Split ─────────────────────────── */}
      <section className="w-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_300px]"
          style={{ background: "oklch(0.10 0.02 var(--primary-h, 148))" }}
        >
          {/* Left: main content */}
          <div className="px-10 py-14 space-y-6">
            {/* Pulsing badge */}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/10 border border-white/10 text-white/80 px-3 py-1 rounded-full">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              Built this demo for your project
            </span>

            {/* Name + value prop */}
            <div className="space-y-3">
              <h1 className="text-3xl font-light text-white/60 leading-tight">
                Hi, I&apos;m{" "}
                <span
                  className="font-bold text-white"
                  style={{ color: "oklch(0.72 0.16 148)" }}
                >
                  Humam
                </span>
              </h1>
              <p className="text-xl font-semibold text-white leading-snug max-w-lg">
                {profile.tagline}
              </p>
            </div>

            {/* Project name reference */}
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              Your {APP_CONFIG.projectName} app is 10–15 hours in. I can scope
              what&apos;s left, build it cleanly, and have it live before your
              April 1 deadline.
            </p>
          </div>

          {/* Right: stats sidebar */}
          <div
            className="flex flex-col justify-center gap-6 px-8 py-14 lg:border-l border-white/10"
            style={{ background: "oklch(0.08 0.015 var(--primary-h, 148))" }}
          >
            <StatItem value="24+" label="Projects Shipped" />
            <div className="w-full h-px bg-white/10" />
            <StatItem value="15+" label="Industries" />
            <div className="w-full h-px bg-white/10" />
            <StatItem value="< 48hr" label="Demo Turnaround" />
          </div>
        </div>
      </section>

      {/* ── Section 2: Proof of Work — Stacked Stories ──────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="mb-10">
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
            Relevant Projects
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            Work that lines up with yours
          </h2>
        </div>

        <div className="space-y-0">
          {portfolioProjects.map((project, i) => (
            <div
              key={project.id}
              className={`py-8 ${i < portfolioProjects.length - 1 ? "border-b border-border/60" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Step number */}
                <span
                  className="text-4xl font-light shrink-0 w-10 text-right hidden sm:block"
                  style={{ color: "oklch(0.52 0.16 148 / 0.15)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 space-y-3">
                  {/* Title + link */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {project.title}
                    </h3>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${project.title} live`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Outcome badge */}
                  {project.outcome && (
                    <div className="flex items-start gap-1.5">
                      <TrendingUp
                        className="h-3.5 w-3.5 mt-0.5 shrink-0"
                        style={{ color: "var(--success)" }}
                      />
                      <span
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--success)" }}
                      >
                        {project.outcome}
                      </span>
                    </div>
                  )}

                  {/* Relevance note */}
                  {project.relevance && (
                    <p className="text-xs text-muted-foreground/70 italic">
                      {project.relevance}
                    </p>
                  )}

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono border"
                        style={{
                          background: "oklch(0.52 0.16 148 / 0.06)",
                          borderColor: "oklch(0.52 0.16 148 / 0.2)",
                          color: "oklch(0.35 0.10 148)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: How I Work — Vertical Timeline ───────────────────── */}
      <section
        style={{ background: "oklch(0.985 0.008 145)" }}
        className="py-16"
      >
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
              My Approach
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              How this project gets done
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              2 weeks to functional MVP — daily updates throughout.
            </p>
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-4 top-4 bottom-4 w-px"
              style={{ background: "oklch(0.52 0.16 148 / 0.2)" }}
            />

            <div className="space-y-0">
              {profile.approach.map((step, i) => {
                const timelines = [
                  "Day 1–2",
                  "Day 2–3",
                  "Day 3 – Week 2",
                  "Week 2",
                ];
                return (
                  <div key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
                    {/* Node */}
                    <div className="relative z-10 shrink-0 mt-0.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-semibold border-2 bg-background"
                        style={{
                          borderColor: "oklch(0.52 0.16 148)",
                          color: "oklch(0.52 0.16 148)",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-0.5 pb-2">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-sm font-semibold text-foreground">
                          {step.title}
                        </h3>
                        <span
                          className="text-xs font-mono px-2 py-0.5 rounded-full border"
                          style={{
                            background: "oklch(0.52 0.16 148 / 0.08)",
                            borderColor: "oklch(0.52 0.16 148 / 0.2)",
                            color: "oklch(0.40 0.12 148)",
                          }}
                        >
                          {timelines[i]}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Skills — Inline Groups ────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase mb-2">
            Stack
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            Relevant skills for this build
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {profile.skillCategories.map((category) => (
            <div key={category.name} className="space-y-2.5">
              <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                {category.name}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border"
                    style={{
                      background: "oklch(0.995 0.005 145)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 5: CTA — Minimal Close ───────────────────────────────── */}
      <section className="border-t border-border/60 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          {/* Availability indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "var(--success)" }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: "var(--success)" }}
              />
            </span>
            <span className="text-xs text-muted-foreground">
              Currently available for new projects
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-semibold text-foreground leading-snug">
            Your April 1 deadline is tight.{" "}
            <span style={{ color: "oklch(0.52 0.16 148)" }}>
              Let&apos;s not waste time.
            </span>
          </h2>

          {/* Body */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            I can audit your existing Dreamflow build today and have a scope
            list back to you by tomorrow. No meetings required before that.
          </p>

          {/* CTA text — not a dead link */}
          <p className="text-base font-semibold" style={{ color: "oklch(0.52 0.16 148)" }}>
            Reply on Upwork to start
          </p>

          {/* Back link */}
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to the demo
            </Link>
          </div>

          {/* Signature */}
          <p className="text-sm text-muted-foreground/60 pt-2">— Humam</p>
        </div>
      </section>

    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-component: Stat item (used in hero sidebar)
// ---------------------------------------------------------------------------

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="text-2xl font-bold font-mono"
        style={{ color: "oklch(0.72 0.16 148)" }}
      >
        {value}
      </p>
      <p className="text-xs text-white/40 mt-0.5">{label}</p>
    </div>
  );
}
