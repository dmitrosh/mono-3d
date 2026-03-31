import { useState } from 'react';

import { CHANCE_CARDS, COMMUNITY_CHEST_CARDS } from './cards';
import { SQUARES } from './squares';

const STORAGE_KEY = 'mono3d-game-state-v2';
const TOTAL_SQUARES = 40;
const GO_BONUS = 200;
const JAIL_POSITION = 10;
const STARTING_MONEY = 1500;

export type PendingAction =
  | {
      type: 'buy';
      squareIndex: number;
      name: string;
      price: number;
      rent: number;
    }
  | { type: 'rent'; squareName: string; amount: number; paidTo: string }
  | { type: 'tax'; squareName: string; amount: number }
  | { type: 'go-to-jail' }
  | { type: 'card'; title: string; description: string; amount: number };

export interface GameState {
  playerPositions: [number, number];
  playerMoney: [number, number];
  currentPlayer: 0 | 1;
  propertyOwners: Record<number, 0 | 1>;
  pendingAction: PendingAction | null;
}

const DEFAULT_STATE: GameState = {
  playerPositions: [0, 0],
  playerMoney: [STARTING_MONEY, STARTING_MONEY],
  currentPlayer: 0,
  propertyOwners: {},
  pendingAction: null,
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

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
    setState((prev) => {
      const steps = v1 + v2;
      const oldPosition = prev.playerPositions[prev.currentPlayer];
      const rawPosition = oldPosition + steps;
      const newPosition = rawPosition % TOTAL_SQUARES;
      const crossedStart = rawPosition >= TOTAL_SQUARES;

      const positions: [number, number] = [...prev.playerPositions] as [
        number,
        number,
      ];
      positions[prev.currentPlayer] = newPosition;

      const money: [number, number] = [...prev.playerMoney] as [number, number];
      if (crossedStart) {
        money[prev.currentPlayer] += GO_BONUS;
      }

      const square = SQUARES[newPosition];
      let pendingAction: PendingAction | null = null;
      const propertyOwners = { ...prev.propertyOwners };

      switch (square.type) {
        case 'property':
        case 'railroad':
        case 'utility': {
          const owner = prev.propertyOwners[newPosition];
          if (owner === undefined) {
            pendingAction = {
              type: 'buy',
              squareIndex: newPosition,
              name: square.name,
              price: square.price!,
              rent: square.rent!,
            };
          } else if (owner !== prev.currentPlayer) {
            const rent = square.rent!;
            money[prev.currentPlayer] = Math.max(
              0,
              money[prev.currentPlayer] - rent,
            );
            money[owner] += rent;
            pendingAction = {
              type: 'rent',
              squareName: square.name,
              amount: rent,
              paidTo: `Гравця ${owner + 1}`,
            };
          }
          break;
        }
        case 'tax': {
          const tax = square.tax!;
          money[prev.currentPlayer] = Math.max(
            0,
            money[prev.currentPlayer] - tax,
          );
          pendingAction = { type: 'tax', squareName: square.name, amount: tax };
          break;
        }
        case 'go-to-jail': {
          positions[prev.currentPlayer] = JAIL_POSITION;
          pendingAction = { type: 'go-to-jail' };
          break;
        }
        case 'chance': {
          const card = pickRandom(CHANCE_CARDS);
          if (card.goToJail) {
            positions[prev.currentPlayer] = JAIL_POSITION;
            pendingAction = { type: 'go-to-jail' };
          } else {
            if (card.moveTo !== undefined) {
              positions[prev.currentPlayer] = card.moveTo;
            }
            money[prev.currentPlayer] = Math.max(
              0,
              money[prev.currentPlayer] + card.amount,
            );
            pendingAction = {
              type: 'card',
              title: 'Chance',
              description: card.description,
              amount: card.amount,
            };
          }
          break;
        }
        case 'community-chest': {
          const card = pickRandom(COMMUNITY_CHEST_CARDS);
          if (card.goToJail) {
            positions[prev.currentPlayer] = JAIL_POSITION;
            pendingAction = { type: 'go-to-jail' };
          } else {
            if (card.moveTo !== undefined) {
              positions[prev.currentPlayer] = card.moveTo;
            }
            money[prev.currentPlayer] = Math.max(
              0,
              money[prev.currentPlayer] + card.amount,
            );
            pendingAction = {
              type: 'card',
              title: 'Community Chest',
              description: card.description,
              amount: card.amount,
            };
          }
          break;
        }
        default:
          break;
      }

      const nextPlayer = prev.currentPlayer === 0 ? 1 : 0;
      const next: GameState = {
        playerPositions: positions,
        playerMoney: money,
        propertyOwners,
        pendingAction,
        currentPlayer: pendingAction === null ? nextPlayer : prev.currentPlayer,
      };

      saveState(next);

      return next;
    });
  };

  const handleResolve = (bought = false): void => {
    setState((prev) => {
      if (!prev.pendingAction) {
        return prev;
      }

      const money: [number, number] = [...prev.playerMoney] as [number, number];
      const propertyOwners = { ...prev.propertyOwners };

      if (bought && prev.pendingAction.type === 'buy') {
        const { squareIndex, price } = prev.pendingAction;
        money[prev.currentPlayer] = Math.max(
          0,
          money[prev.currentPlayer] - price,
        );
        propertyOwners[squareIndex] = prev.currentPlayer;
      }

      const nextPlayer = prev.currentPlayer === 0 ? 1 : 0;
      const next: GameState = {
        ...prev,
        playerMoney: money,
        propertyOwners,
        pendingAction: null,
        currentPlayer: nextPlayer,
      };

      saveState(next);

      return next;
    });
  };

  return { ...state, handleRoll, handleResolve };
}
