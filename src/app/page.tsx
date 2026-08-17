"use client";

import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/useGame";
import { computeTotals, newlyOutPlayers, PlayerTotal } from "@/lib/scoring";
import PlayerManager from "@/components/PlayerManager";
import TargetScore from "@/components/TargetScore";
import RoundForm from "@/components/RoundForm";
import ScoreBoard from "@/components/ScoreBoard";
import AlertBanner from "@/components/AlertBanner";

export default function Home() {
  const {
    game,
    hydrated,
    addPlayer,
    removePlayer,
    setTargetScore,
    addRound,
    removeRound,
    resetGame,
    resetAll,
  } = useGame();

  const totals = computeTotals(game);
  const previousTotals = useRef<PlayerTotal[]>([]);
  const [alertPlayers, setAlertPlayers] = useState<PlayerTotal[]>([]);

  useEffect(() => {
    if (!hydrated) return;
    const justOut = newlyOutPlayers(previousTotals.current, totals);
    if (justOut.length > 0) {
      setAlertPlayers((prev) => [...prev, ...justOut]);
    }
    previousTotals.current = totals;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, hydrated]);

  const activeCount = totals.filter((t) => !t.isOut).length;
  const winner =
    game.targetScore != null && game.rounds.length > 0 && activeCount === 1
      ? totals.find((t) => !t.isOut)
      : null;

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-black/40 dark:text-white/40">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white px-4 py-8 dark:from-black dark:to-neutral-950">
      {game.targetScore != null && (
        <AlertBanner
          outPlayers={alertPlayers}
          targetScore={game.targetScore}
          onDismiss={() => setAlertPlayers([])}
        />
      )}

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              🃏 RummyBoard
            </h1>
            <p className="text-sm text-black/50 dark:text-white/50">
              Track players, scores, and elimination in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={resetGame}
              disabled={game.rounds.length === 0}
              className="rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium text-black/60 transition hover:bg-black/5 disabled:opacity-30 dark:border-white/15 dark:text-white/60 dark:hover:bg-white/10"
            >
              Clear Rounds
            </button>
            <button
              onClick={resetAll}
              className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
            >
              New Game
            </button>
          </div>
        </header>

        {winner && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-800 dark:bg-emerald-950">
            <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">
              🏆 {winner.player.name} wins with {winner.total} points!
            </p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <PlayerManager
            players={game.players}
            disabled={game.rounds.length > 0}
            onAdd={addPlayer}
            onRemove={removePlayer}
          />
          <TargetScore value={game.targetScore} onChange={setTargetScore} />
        </div>

        <RoundForm players={game.players} totals={totals} onSubmit={addRound} />

        <ScoreBoard game={game} totals={totals} onRemoveRound={removeRound} />
      </div>
    </div>
  );
}
