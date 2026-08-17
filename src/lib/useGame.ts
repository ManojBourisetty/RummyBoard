"use client";

import { useCallback, useEffect, useState } from "react";
import { GameState, Round, STORAGE_KEY, emptyGame } from "./types";

function loadGame(): GameState {
  if (typeof window === "undefined") return emptyGame;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyGame;
    const parsed = JSON.parse(raw) as GameState;
    return {
      players: parsed.players ?? [],
      rounds: parsed.rounds ?? [],
      targetScore: parsed.targetScore ?? null,
    };
  } catch {
    return emptyGame;
  }
}

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function useGame() {
  const [game, setGame] = useState<GameState>(emptyGame);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage after mount
    setGame(loadGame());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
  }, [game, hydrated]);

  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGame((g) => ({
      ...g,
      players: [...g.players, { id: makeId(), name: trimmed }],
    }));
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setGame((g) => ({
      ...g,
      players: g.players.filter((p) => p.id !== playerId),
      rounds: g.rounds.map((r) => {
        const rest = { ...r.scores };
        delete rest[playerId];
        return { ...r, scores: rest };
      }),
    }));
  }, []);

  const setTargetScore = useCallback((value: number | null) => {
    setGame((g) => ({ ...g, targetScore: value }));
  }, []);

  const addRound = useCallback((scores: Record<string, number>) => {
    const round: Round = { id: makeId(), scores };
    setGame((g) => ({ ...g, rounds: [...g.rounds, round] }));
  }, []);

  const removeRound = useCallback((roundId: string) => {
    setGame((g) => ({
      ...g,
      rounds: g.rounds.filter((r) => r.id !== roundId),
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGame((g) => ({ ...g, rounds: [] }));
  }, []);

  const resetAll = useCallback(() => {
    setGame(emptyGame);
  }, []);

  return {
    game,
    hydrated,
    addPlayer,
    removePlayer,
    setTargetScore,
    addRound,
    removeRound,
    resetGame,
    resetAll,
  };
}
