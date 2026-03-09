"use client";

import { useEffect, useRef, useCallback } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ContourLine {
  /** Control points for the closed loop */
  points: { x: number; y: number }[];
  /** Base radius from center */
  baseRadius: number;
  /** z-depth: 0 (farthest / most muted) to 1 (closest / strongest) */
  z: number;
  /** How fast this contour's noise phase evolves */
  phaseSpeed: number;
  /** Current noise offset */
  phase: number;
  /** Number of vertices on the loop */
  segments: number;
  /** Per-vertex noise phase offset */
  vertexPhases: number[];
  /** Amplitude of vertex perturbation */
  amplitude: number;
  /** Whether this is an "amber" accent contour */
  isAccent: boolean;
}

interface MouseRef {
  x: number;
  y: number;
}

interface Props {
  className?: string;
  lineCount?: number;
}

// ── Colors (from Creative Brief) ──────────────────────────────────────────────
// Forest green: oklch(0.52 0.16 148) ≈ rgb(42, 116, 68)
// Warm amber:   oklch(0.72 0.15 85)  ≈ rgb(195, 148, 30)
const GREEN = { r: 42, g: 116, b: 68 };
const AMBER = { r: 195, g: 148, b: 30 };

// ── Component ─────────────────────────────────────────────────────────────────
export function TopoCanvas({ className, lineCount = 110 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contoursRef = useRef<ContourLine[]>([]);
  const mouseRef = useRef<MouseRef>({ x: -9999, y: -9999 });
  const frameRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  const initContours = useCallback(
    (w: number, h: number) => {
      const lines: ContourLine[] = [];
      const maxRadius = Math.max(w, h) * 0.72;
      const minRadius = Math.min(w, h) * 0.018;

      for (let i = 0; i < lineCount; i++) {
        const t = i / (lineCount - 1); // 0 → 1 from inner to outer
        const baseRadius = minRadius + t * (maxRadius - minRadius);
        const z = 1 - t * 0.75; // inner contours are "closer"

        // Accent lines are sparse — roughly every 8th contour near midrange
        const isAccent = i > lineCount * 0.3 && i < lineCount * 0.7 && i % 8 === 3;

        const segments = 32 + Math.floor(Math.random() * 16);
        const amplitude = baseRadius * (0.08 + Math.random() * 0.12);
        const phase = Math.random() * Math.PI * 2;
        const phaseSpeed = 0.0008 + Math.random() * 0.0006;

        const vertexPhases: number[] = [];
        for (let j = 0; j < segments; j++) {
          vertexPhases.push(Math.random() * Math.PI * 2);
        }

        lines.push({
          points: [],
          baseRadius,
          z,
          phaseSpeed,
          phase,
          segments,
          vertexPhases,
          amplitude,
          isAccent,
        });
      }

      contoursRef.current = lines;
    },
    [lineCount]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };

      if (contoursRef.current.length === 0) {
        initContours(rect.width, rect.height);
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // ── Mouse tracking ──────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ── Draw loop ───────────────────────────────────────────────────────────
    const draw = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      timeRef.current++;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseInfluence = 120; // px radius around cursor

      const contours = contoursRef.current;

      for (let ci = 0; ci < contours.length; ci++) {
        const c = contours[ci];
        c.phase += c.phaseSpeed;

        const pts: { x: number; y: number }[] = [];

        for (let si = 0; si < c.segments; si++) {
          const angle = (si / c.segments) * Math.PI * 2;

          // Base position on circle
          const baseX = cx + Math.cos(angle) * c.baseRadius;
          const baseY = cy + Math.sin(angle) * c.baseRadius;

          // Organic perturbation — two harmonics for natural contour shape
          const noise1 = Math.sin(c.vertexPhases[si] + c.phase * 1.0) * c.amplitude;
          const noise2 =
            Math.sin(c.vertexPhases[si] * 1.7 + c.phase * 1.6) * c.amplitude * 0.4;
          const totalNoise = noise1 + noise2;

          const radialX = baseX + Math.cos(angle) * totalNoise;
          const radialY = baseY + Math.sin(angle) * totalNoise;

          // Mouse proximity — subtle brightening push (outward)
          let px = radialX;
          let py = radialY;
          const mdx = radialX - mx;
          const mdy = radialY - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouseInfluence && mDist > 0.1) {
            const strength = (1 - mDist / mouseInfluence) * 6;
            px += (mdx / mDist) * strength;
            py += (mdy / mDist) * strength;
          }

          pts.push({ x: px, y: py });
        }

        c.points = pts;

        // ── Determine if near mouse (brighten) ─────────────────────────────
        // Check if mouse is near the contour's average radius
        const mDxCenter = cx - mx;
        const mDyCenter = cy - my;
        const mouseDistFromCenter = Math.sqrt(
          mDxCenter * mDxCenter + mDyCenter * mDyCenter
        );
        const isNearMouse =
          Math.abs(mouseDistFromCenter - c.baseRadius) < mouseInfluence * 0.5;

        // ── Color and opacity by depth ──────────────────────────────────────
        const color = c.isAccent ? AMBER : GREEN;
        const baseOpacity = c.isAccent
          ? 0.10 + c.z * 0.20
          : 0.06 + c.z * 0.16;
        const opacity = isNearMouse ? Math.min(baseOpacity * 2.2, 0.55) : baseOpacity;

        const lineWidth = c.isAccent
          ? 0.6 + c.z * 0.6
          : 0.3 + c.z * 0.5;

        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);

        // Catmull-Rom smooth curve through all points
        for (let si = 0; si < pts.length; si++) {
          const p0 = pts[(si - 1 + pts.length) % pts.length];
          const p1 = pts[si];
          const p2 = pts[(si + 1) % pts.length];
          const p3 = pts[(si + 2) % pts.length];

          // Catmull-Rom → cubic bezier conversion
          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        ctx.closePath();
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [initContours]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
