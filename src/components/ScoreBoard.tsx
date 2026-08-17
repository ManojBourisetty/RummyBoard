"use client";

import { GameState } from "@/lib/types";
import { PlayerTotal } from "@/lib/scoring";

interface Props {
  game: GameState;
  totals: PlayerTotal[];
  onRemoveRound: (roundId: string) => void;
}

export default function ScoreBoard({ game, totals, onRemoveRound }: Props) {
  if (game.players.length === 0) return null;

  const leaderTotal = totals.length
    ? Math.min(...totals.filter((t) => !t.isOut).map((t) => t.total))
    : null;

  return (
    <section className="rounded-2xl border border-black/10 bg-white/60 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
        Scoreboard
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-transparent px-3 py-2 text-left font-medium text-black/50 dark:text-white/50">
                Round
              </th>
              {game.players.map((p) => {
                const t = totals.find((x) => x.player.id === p.id);
                return (
                  <th
                    key={p.id}
                    className={`px-3 py-2 text-right font-medium ${
                      t?.isOut
                        ? "text-red-500"
                        : t?.total === leaderTotal
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-black/70 dark:text-white/70"
                    }`}
                  >
                    {p.name}
                    {t?.isOut && (
                      <span className="ml-1 rounded bg-red-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-red-500">
                        OUT
                      </span>
                    )}
                  </th>
                );
              })}
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {game.rounds.map((round, idx) => (
              <tr key={round.id} className="border-t border-black/5 dark:border-white/10">
                <td className="sticky left-0 bg-transparent px-3 py-2 text-black/40 dark:text-white/40">
                  {idx + 1}
                </td>
                {game.players.map((p) => (
                  <td key={p.id} className="px-3 py-2 text-right tabular-nums">
                    {round.scores[p.id] ?? "–"}
                  </td>
                ))}
                <td className="px-1 text-right">
                  <button
                    onClick={() => onRemoveRound(round.id)}
                    aria-label={`Remove round ${idx + 1}`}
                    className="text-black/30 hover:text-red-500 dark:text-white/30"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
            {game.rounds.length === 0 && (
              <tr>
                <td
                  colSpan={game.players.length + 2}
                  className="px-3 py-4 text-center text-black/40 dark:text-white/40"
                >
                  No rounds yet.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-black/10 font-semibold dark:border-white/20">
              <td className="sticky left-0 bg-transparent px-3 py-2">
                Total
              </td>
              {game.players.map((p) => {
                const t = totals.find((x) => x.player.id === p.id);
                return (
                  <td
                    key={p.id}
                    className={`px-3 py-2 text-right tabular-nums ${
                      t?.isOut
                        ? "text-red-500"
                        : t?.total === leaderTotal
                          ? "text-emerald-600 dark:text-emerald-400"
                          : ""
                    }`}
                  >
                    {t?.total ?? 0}
                  </td>
                );
              })}
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
