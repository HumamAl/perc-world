import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { challenges, executiveSummary } from "@/data/challenges";
import { OutcomeBadge } from "@/components/challenges/outcome-badge";
import { PermitFlowDiagram } from "@/components/challenges/permit-flow-diagram";
import { GpsArchitectureDiagram } from "@/components/challenges/gps-architecture-diagram";
import { IntegrationPipeline } from "@/components/challenges/integration-pipeline";
import { EhpBeforeAfter } from "@/components/challenges/ehp-before-after";

export default function ChallengesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>

      {/* ── Hero section ──────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-12">

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            style={{ transitionDuration: "var(--dur-fast)" }}
          >
            <ArrowLeft className="h-3 w-3" />
            Back to the live demo
          </Link>

          {/* Page title */}
          <p
            className="text-xs font-medium mb-3 tracking-wide uppercase"
            style={{
              color: "var(--primary)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.08em",
            }}
          >
            My Approach
          </p>
          <h1
            className="text-3xl sm:text-4xl font-semibold text-foreground leading-tight mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Four problems every DR firm<br className="hidden sm:block" /> lives with — and how I&apos;d solve them
          </h1>

          {/* Executive summary — split contrast */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "color-mix(in oklch, var(--destructive) 4%, var(--card))",
                borderColor: "color-mix(in oklch, var(--destructive) 12%, transparent)",
              }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                The common approach
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most developers build septic permitting apps as generic job trackers — status dropdowns, file uploads, a calendar. They don&apos;t understand that the bottleneck isn&apos;t scheduling, it&apos;s the ADH handoff.
              </p>
            </div>
            <div
              className="rounded-xl p-4 border"
              style={{
                background: "color-mix(in oklch, var(--primary) 4%, var(--card))",
                borderColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: "var(--primary)" }}
              >
                How I&apos;d build this
              </p>
              <p className="text-sm leading-relaxed text-foreground">
                I model the full ADH permit lifecycle — conditional branching for pumped, gravity, and ATU systems — with a{" "}
                <span className="font-semibold text-primary">
                  {executiveSummary.accentWord}
                </span>{" "}
                that eliminates re-entry across Jobber, OneDrive, and the ADH portal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Challenge 1 — Primary ──────────────────────────── */}
      <div
        className="border-b"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklch, var(--primary) 3%, var(--background))",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
          <div className="flex items-start gap-3">
            <span
              className="text-lg font-light shrink-0 mt-0.5"
              style={{
                color: "var(--primary)",
                opacity: 0.35,
                fontFamily: "var(--font-mono)",
              }}
            >
              01
            </span>
            <div className="space-y-1 min-w-0">
              <h2
                className="text-xl font-semibold text-foreground leading-snug"
                style={{ letterSpacing: "-0.015em" }}
              >
                {challenges[0].title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenges[0].description}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <PermitFlowDiagram />
          </div>

          <OutcomeBadge text={challenges[0].outcome ?? ""} />
        </div>
      </div>

      {/* ── Challenge 2 — Standard ──────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
          <div className="flex items-start gap-3">
            <span
              className="text-lg font-light shrink-0 mt-0.5"
              style={{
                color: "var(--primary)",
                opacity: 0.35,
                fontFamily: "var(--font-mono)",
              }}
            >
              02
            </span>
            <div className="space-y-1 min-w-0">
              <h2
                className="text-xl font-semibold text-foreground leading-snug"
                style={{ letterSpacing: "-0.015em" }}
              >
                {challenges[1].title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenges[1].description}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <GpsArchitectureDiagram />
          </div>

          <OutcomeBadge text={challenges[1].outcome ?? ""} />
        </div>
      </div>

      {/* ── Challenge 3 — Standard ──────────────────────────── */}
      <div
        className="border-b"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in oklch, var(--primary) 2%, var(--background))",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
          <div className="flex items-start gap-3">
            <span
              className="text-lg font-light shrink-0 mt-0.5"
              style={{
                color: "var(--primary)",
                opacity: 0.35,
                fontFamily: "var(--font-mono)",
              }}
            >
              03
            </span>
            <div className="space-y-1 min-w-0">
              <h2
                className="text-xl font-semibold text-foreground leading-snug"
                style={{ letterSpacing: "-0.015em" }}
              >
                {challenges[2].title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenges[2].description}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <IntegrationPipeline />
          </div>

          <OutcomeBadge text={challenges[2].outcome ?? ""} />
        </div>
      </div>

      {/* ── Challenge 4 — Interactive (before/after toggle) ── */}
      <div
        className="border-b"
        style={{ borderColor: "var(--border)", background: "var(--background)" }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">
          <div className="flex items-start gap-3">
            <span
              className="text-lg font-light shrink-0 mt-0.5"
              style={{
                color: "var(--primary)",
                opacity: 0.35,
                fontFamily: "var(--font-mono)",
              }}
            >
              04
            </span>
            <div className="space-y-1 min-w-0">
              <h2
                className="text-xl font-semibold text-foreground leading-snug"
                style={{ letterSpacing: "-0.015em" }}
              >
                {challenges[3].title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {challenges[3].description}
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border p-5"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              boxShadow: "var(--card-shadow)",
            }}
          >
            <EhpBeforeAfter />
          </div>

          <OutcomeBadge text={challenges[3].outcome ?? ""} />
        </div>
      </div>

      {/* ── CTA Closer ──────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div
          className="rounded-2xl border p-8 text-center space-y-5"
          style={{
            background: "color-mix(in oklch, var(--primary) 5%, var(--card))",
            borderColor: "color-mix(in oklch, var(--primary) 20%, transparent)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="space-y-2">
            <p className="text-base font-semibold text-foreground">
              These aren&apos;t hypotheticals.
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              They&apos;re the exact challenges I&apos;d tackle first, in this order. The proposal walks through timeline and how I work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/proposal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              style={{
                background: "var(--primary)",
                transitionDuration: "var(--dur-fast)",
              }}
            >
              See the proposal
              <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-xs text-muted-foreground hidden sm:block">or</span>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Reply on Upwork to start</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
