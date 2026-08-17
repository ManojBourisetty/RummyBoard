export interface Round {
  id: string;
  scores: Record<string, number>; // playerId -> score added this round
}

export interface Player {
  id: string;
  name: string;
}

export interface GameState {
  players: Player[];
  rounds: Round[];
  targetScore: number | null;
}

export const STORAGE_KEY = "rummyboard.game.v1";

export const emptyGame: GameState = {
  players: [],
  rounds: [],
  targetScore: null,
};
