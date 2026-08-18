"use client";

interface Props {
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function TargetScore({ value, onChange }: Props) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
        Target Score
      </h2>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? null : Math.max(1, Number(v)));
          }}
          placeholder="e.g. 200"
          className="w-32 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-white/15 dark:bg-black/30"
        />
        <span className="text-sm text-black/50 dark:text-white/50">
          — reaching this eliminates a player
        </span>
      </div>
    </section>
  );
}
