import { GameState, Player } from "./types";

export interface PlayerTotal {
  player: Player;
  total: number;
  isOut: boolean;
}

export function computeTotals(game: GameState): PlayerTotal[] {
  const totals = new Map<string, number>();
  for (const p of game.players) totals.set(p.id, 0);

  for (const round of game.rounds) {
    for (const [playerId, score] of Object.entries(round.scores)) {
      totals.set(playerId, (totals.get(playerId) ?? 0) + score);
    }
  }

  return game.players.map((player) => {
    const total = totals.get(player.id) ?? 0;
    const isOut = game.targetScore != null && total >= game.targetScore;
    return { player, total, isOut };
  });
}

export function newlyOutPlayers(
  before: PlayerTotal[],
  after: PlayerTotal[]
): PlayerTotal[] {
  const wasOut = new Set(
    before.filter((p) => p.isOut).map((p) => p.player.id)
  );
  return after.filter((p) => p.isOut && !wasOut.has(p.player.id));
}
