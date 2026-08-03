import type { ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/** Renders the line-based markdown-lite format used in `src/data/journal.ts`. */
export function JournalBody({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="space-y-5">
      {lines.map((line, i) =>
        line.startsWith("## ") ? (
          <p key={i} className="label !text-foreground pt-6 first:pt-0">
            {line.slice(3)}
          </p>
        ) : (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {renderInline(line)}
          </p>
        ),
      )}
    </div>
  );
}
