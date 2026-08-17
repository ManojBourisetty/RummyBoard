"use client";

import { PlayerTotal } from "@/lib/scoring";

interface Props {
  outPlayers: PlayerTotal[];
  targetScore: number;
  onDismiss: () => void;
}

export default function AlertBanner({ outPlayers, targetScore, onDismiss }: Props) {
  if (outPlayers.length === 0) return null;

  return (
    <div role="alert" className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <div className="flex w-full max-w-xl items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 shadow-lg dark:border-red-900 dark:bg-red-950">
        <span className="text-xl">🚨</span>
        <div className="flex-1 text-sm text-red-800 dark:text-red-200">
          {outPlayers.map((p) => (
            <p key={p.player.id}>
              <strong>{p.player.name}</strong> reached {p.total} points (target{" "}
              {targetScore}) and is out!
            </p>
          ))}
        </div>
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700 dark:text-red-300"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
