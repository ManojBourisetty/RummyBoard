"use client";

import { FormEvent, useState } from "react";
import { Player } from "@/lib/types";

interface Props {
  players: Player[];
  disabled: boolean;
  onAdd: (name: string) => void;
  onRemove: (playerId: string) => void;
}

export default function PlayerManager({
  players,
  disabled,
  onAdd,
  onRemove,
}: Props) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  }

  return (
    <section className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
        Players
      </h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
          className="min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 dark:border-white/15 dark:bg-black/30"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-40"
          disabled={!name.trim()}
        >
          Add
        </button>
      </form>

      {players.length === 0 ? (
        <p className="text-sm text-black/40 dark:text-white/40">
          Add at least two players to start a game.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {players.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1.5 text-sm dark:bg-white/10"
            >
              <span>{p.name}</span>
              <button
                onClick={() => onRemove(p.id)}
                disabled={disabled}
                aria-label={`Remove ${p.name}`}
                className="text-black/40 hover:text-red-500 disabled:opacity-30 dark:text-white/40"
                title={
                  disabled
                    ? "Clear round history to remove players"
                    : "Remove player"
                }
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
