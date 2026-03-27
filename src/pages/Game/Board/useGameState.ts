import { useState } from 'react';

const STORAGE_KEY = 'mono3d-game-state';
const TOTAL_SQUARES = 36;
const START_BONUS = 200;

interface GameState {
  playerPositions: [number, number];
  playerMoney: [number, number];
  currentPlayer: 0 | 1;
}

const DEFAULT_STATE: GameState = {
  playerPositions: [0, 0],
  playerMoney: [0, 0],
  currentPlayer: 0,
};

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<GameState>) };
    }
  } catch {
    // ignore corrupt data
  }

  return DEFAULT_STATE;
}

function saveState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useGameState() {
  const [state, setState] = useState<GameState>(loadState);

  const handleRoll = ([v1, v2]: [number, number]): void => {
    const steps = v1 + v2;

    setState((prev) => {
      const oldPosition = prev.playerPositions[prev.currentPlayer];
      const crossedStart = oldPosition + steps >= TOTAL_SQUARES;

      const positions: [number, number] = [...prev.playerPositions] as [
        number,
        number,
      ];
      positions[prev.currentPlayer] = (oldPosition + steps) % TOTAL_SQUARES;

      const money: [number, number] = [...prev.playerMoney] as [number, number];
      if (crossedStart) {
        money[prev.currentPlayer] += START_BONUS;
      }

      const next: GameState = {
        playerPositions: positions,
        playerMoney: money,
        currentPlayer: prev.currentPlayer === 0 ? 1 : 0,
      };

      saveState(next);

      return next;
    });
  };

  return { ...state, handleRoll };
}
