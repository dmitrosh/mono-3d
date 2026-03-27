import { Box, Typography } from '@mui/material';
import React from 'react';

import DicePair from 'src/components/DicePair';
import PlayerIcon from 'src/components/PlayerIcon';

import * as styles from './styles';

const SQUARE_COLORS = [...Array(36).keys()].map(
  (i) => `hsl(${Math.round((i * 360) / 36)}, 65%, 45%)`,
);

const PLAYERS = [
  { id: 1, color: '#000000' },
  { id: 2, color: '#ffffff' },
];

function generatePath(): { row: number; col: number }[] {
  const topRow = [...Array(10).keys()].map((col) => ({ row: 0, col }));
  const rightCol = [...Array(9).keys()].map((i) => ({
    row: i + 1,
    col: 9,
  }));
  const bottomRow = [...Array(9).keys()].map((i) => ({
    row: 9,
    col: 8 - i,
  }));
  const leftCol = [...Array(8).keys()].map((i) => ({
    row: 8 - i,
    col: 0,
  }));

  return [...topRow, ...rightCol, ...bottomRow, ...leftCol];
}

const PATH = generatePath();

function Board() {
  const playerPositions = [0, 0];

  return (
    <Box sx={styles.board}>
      {PATH.map(({ row, col }, index) => {
        const playersHere = PLAYERS.filter(
          (player, i) => playerPositions[i] === index,
        );

        return (
          <Box
            key={`${row}-${col}`}
            sx={styles.square(SQUARE_COLORS[index], row, col)}>
            {index === 0 && (
              <Typography variant="caption" sx={styles.startLabel}>
                Start
              </Typography>
            )}
            {playersHere.length > 0 && (
              <Box sx={styles.players}>
                {playersHere.map((player) => (
                  <PlayerIcon
                    key={player.id}
                    size={22}
                    style={{ color: player.color }}
                  />
                ))}
              </Box>
            )}
          </Box>
        );
      })}
      <Box sx={styles.center}>
        <DicePair />
      </Box>
    </Box>
  );
}

export default Board;
