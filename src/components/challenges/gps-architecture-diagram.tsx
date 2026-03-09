import type { CSSProperties, ElementType } from "react";
import { MapPin, Layers, FileImage, Calculator } from "lucide-react";

interface ArchLayer {
  icon: ElementType;
  label: string;
  tech: string;
  note: string;
  type: "input" | "transform" | "output";
}

const layers: ArchLayer[] = [
  {
    icon: MapPin,
    label: "Field GPS Collection",
    tech: "Geode Receiver + Uinta",
    note: "Lat/lng of tank, D-box, field line endpoints, setback markers",
    type: "input",
  },
  {
    icon: Layers,
    label: "County GIS Overlay",
    tech: "Benton County GIS / arcountydata.com",
    note: "Parcel boundaries, existing structures, property line geometry",
    type: "input",
  },
  {
    icon: Calculator,
    label: "System Sizing Engine",
    tech: "Appendix A lookup + ADH rules",
    note: "Daily flow → loading rate → absorption area → trench count + length",
    type: "transform",
  },
  {
    icon: FileImage,
    label: "11×17 Site Plan Export",
    tech: "Scaled PDF at 1\"=20' or 1\"=40'",
    note: "On-contour field placement, setback dimensions, GPS coordinates labeled",
    type: "output",
  },
];

const typeStyle: Record<ArchLayer["type"], CSSProperties> = {
  input: {
    background: "var(--card)",
    borderColor: "var(--border)",
  },
  transform: {
    background: "color-mix(in oklch, var(--primary) 6%, var(--card))",
    borderColor: "color-mix(in oklch, var(--primary) 25%, transparent)",
  },
  output: {
    background: "color-mix(in oklch, var(--success) 6%, var(--card))",
    borderColor: "color-mix(in oklch, var(--success) 20%, transparent)",
  },
};

export function GpsArchitectureDiagram() {
  return (
    <div className="space-y-2">
      {/* Two input sources side-by-side */}
      <div className="grid grid-cols-2 gap-2">
        {layers.slice(0, 2).map((layer) => {
          const LayerIcon = layer.icon;
          return (
            <div
              key={layer.label}
              className="rounded-lg border p-3 space-y-1"
              style={typeStyle[layer.type]}
            >
              <div className="flex items-center gap-2">
                <LayerIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-semibold text-foreground leading-tight">{layer.label}</span>
              </div>
              <p
                className="text-[10px] text-primary font-medium"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {layer.tech}
              </p>
              <p className="text-[10px] text-muted-foreground leading-snug">{layer.note}</p>
            </div>
          );
        })}
      </div>

      {/* Connector from inputs to transform */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-3 bg-border" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M6 0L12 8H0L6 0Z" fill="var(--border)" />
          </svg>
        </div>
      </div>

      {/* Transform */}
      {layers.slice(2, 3).map((layer) => {
        const LayerIcon = layer.icon;
        return (
          <div
            key={layer.label}
            className="rounded-lg border p-3 space-y-1"
            style={typeStyle[layer.type]}
          >
            <div className="flex items-center gap-2">
              <LayerIcon className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-xs font-semibold text-foreground leading-tight">{layer.label}</span>
              <span
                className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                style={{
                  background: "color-mix(in oklch, var(--primary) 15%, transparent)",
                  color: "var(--primary)",
                }}
              >
                calculated
              </span>
            </div>
            <p
              className="text-[10px] text-primary font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {layer.tech}
            </p>
            <p className="text-[10px] text-muted-foreground leading-snug">{layer.note}</p>
          </div>
        );
      })}

      {/* Connector */}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-px h-3 bg-border" />
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M6 0L12 8H0L6 0Z" fill="var(--border)" />
          </svg>
        </div>
      </div>

      {/* Output */}
      {layers.slice(3).map((layer) => {
        const LayerIcon = layer.icon;
        return (
          <div
            key={layer.label}
            className="rounded-lg border p-3 space-y-1"
            style={typeStyle[layer.type]}
          >
            <div className="flex items-center gap-2">
              <LayerIcon
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: "var(--success)" }}
              />
              <span className="text-xs font-semibold text-foreground leading-tight">{layer.label}</span>
            </div>
            <p
              className="text-[10px] font-medium"
              style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}
            >
              {layer.tech}
            </p>
            <p className="text-[10px] text-muted-foreground leading-snug">{layer.note}</p>
          </div>
        );
      })}

      {/* Sample calculation */}
      <div
        className="rounded-lg px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] border"
        style={{
          background: "color-mix(in oklch, var(--primary) 4%, var(--card))",
          borderColor: "color-mix(in oklch, var(--primary) 15%, transparent)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span className="text-muted-foreground">Example:</span>
        <span className="text-foreground">3BR · Perc 18 min/in</span>
        <span className="text-muted-foreground">→</span>
        <span className="text-primary">0.45 GPD/ft²</span>
        <span className="text-muted-foreground">→</span>
        <span className="text-primary">778 ft² absorption area</span>
        <span className="text-muted-foreground">→</span>
        <span className="text-primary">8 trenches × 100 ft</span>
      </div>
    </div>
  );
}
