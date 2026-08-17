"use client";

import { FormEvent, useState } from "react";
import { Player } from "@/lib/types";
import { PlayerTotal } from "@/lib/scoring";

interface Props {
  players: Player[];
  totals: PlayerTotal[];
  onSubmit: (scores: Record<string, number>) => void;
}

export default function RoundForm({ players, totals, onSubmit }: Props) {
  const [scores, setScores] = useState<Record<string, string>>({});

  const outIds = new Set(totals.filter((t) => t.isOut).map((t) => t.player.id));
  const activePlayers = players.filter((p) => !outIds.has(p.id));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed: Record<string, number> = {};
    for (const p of activePlayers) {
      const raw = scores[p.id];
      parsed[p.id] = raw ? Number(raw) : 0;
    }
    onSubmit(parsed);
    setScores({});
  }

  if (players.length === 0) return null;

  if (activePlayers.length === 0) {
    return (
      <section className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-sm text-black/50 dark:text-white/50">
          Every player has hit the target score. Start a new game to keep
          playing.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
        Add Round
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
        {activePlayers.map((p) => (
          <label key={p.id} className="flex flex-col gap-1 text-sm">
            <span className="text-black/60 dark:text-white/60">{p.name}</span>
            <input
              type="number"
              inputMode="numeric"
              value={scores[p.id] ?? ""}
              onChange={(e) =>
                setScores((s) => ({ ...s, [p.id]: e.target.value }))
              }
              placeholder="0"
              className="w-24 rounded-lg border border-black/15 bg-white px-3 py-2 outline-none focus:border-emerald-500 dark:border-white/15 dark:bg-black/30"
            />
          </label>
        ))}
        <button
          type="submit"
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
        >
          Add Round
        </button>
      </form>
    </section>
  );
}
