import { HOW_TO_MEASURE, SIZE_HELP_NOTE, type SizeRow } from "@/data/size-chart";

export function SizeChartTable({ rows, unit = "cm" }: { rows: SizeRow[]; unit?: string }) {
  const hasSleeve = rows.some((r) => r.sleeve !== undefined);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-left label">Size</th>
            <th className="py-3 pr-4 text-left label">Chest ({unit})</th>
            <th className="py-3 pr-4 text-left label">Length ({unit})</th>
            {hasSleeve && <th className="py-3 pr-4 text-left label">Sleeve ({unit})</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.size} className="border-b border-border/60">
              <td className="py-3 pr-4 font-mono">{r.size}</td>
              <td className="py-3 pr-4 font-mono">{r.chest}</td>
              <td className="py-3 pr-4 font-mono">{r.length}</td>
              {hasSleeve && <td className="py-3 pr-4 font-mono">{r.sleeve ?? "—"}</td>}
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
