import { HOW_TO_MEASURE, SCARF_SIZE_CHART, SIZE_HELP_NOTE, type ScarfSizeRow, type SizeRow } from "@/data/size-chart";

export function SizeChartTable({ rows, unit = "inches" }: { rows: SizeRow[]; unit?: string }) {
  const hasShoulder = rows.some((r) => r.shoulder !== undefined);
  const hasSleeve = rows.some((r) => r.sleeve !== undefined);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-left label">Size</th>
            <th className="py-3 pr-4 text-left label">Chest ({unit})</th>
            <th className="py-3 pr-4 text-left label">Length ({unit})</th>
            {hasShoulder && <th className="py-3 pr-4 text-left label">Shoulder ({unit})</th>}
            {hasSleeve && <th className="py-3 pr-4 text-left label">Sleeve ({unit})</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.size} className="border-b border-border/60">
              <td className="py-3 pr-4 font-mono font-medium">{r.size}</td>
              <td className="py-3 pr-4 font-mono">{r.chest}</td>
              <td className="py-3 pr-4 font-mono">{r.length}</td>
              {hasShoulder && <td className="py-3 pr-4 font-mono">{r.shoulder ?? "—"}</td>}
              {hasSleeve && <td className="py-3 pr-4 font-mono">{r.sleeve ?? "—"}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ScarfSizeChartTable({ rows = SCARF_SIZE_CHART }: { rows?: ScarfSizeRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-left label">Size</th>
            <th className="py-3 pr-4 text-left label">Metric</th>
            <th className="py-3 pr-4 text-left label">Imperial</th>
            <th className="py-3 pr-4 text-left label">Best For</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.size} className="border-b border-border/60">
              <td className="py-3 pr-4 font-mono font-medium text-foreground">{r.size}</td>
              <td className="py-3 pr-4 font-mono text-muted-foreground">{r.dimensionsCm}</td>
              <td className="py-3 pr-4 font-mono text-muted-foreground">{r.dimensionsInches}</td>
              <td className="py-3 pr-4 text-xs text-muted-foreground">{r.recommendedUse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function HowToMeasure() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {HOW_TO_MEASURE.map((step) => (
        <div key={step.title}>
          <p className="label mb-2">{step.title}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
        </div>
      ))}
    </div>
  );
}

export function SizeHelpNote() {
  return <p className="text-sm leading-relaxed text-muted-foreground">{SIZE_HELP_NOTE}</p>;
}
