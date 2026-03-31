import { Box, Typography } from '@mui/material';
import React from 'react';

import DicePair from 'src/components/DicePair';
import PlayerIcon from 'src/components/PlayerIcon';

import ActionDialog from './ActionDialog';
import { SQUARES } from './squares';
import * as styles from './styles';
import { useGameState } from './useGameState';

const PLAYERS = [
  { id: 1, color: '#000000' },
  { id: 2, color: '#ffffff' },
];

function generatePath(): { row: number; col: number }[] {
  // 11x11 grid — 40 squares clockwise from Go (bottom-right corner)
  const bottomRow = [...Array(11).keys()].map((i) => ({
    row: 10,
    col: 10 - i,
  }));
  const leftCol = [...Array(9).keys()].map((i) => ({ row: 9 - i, col: 0 }));
  const topRow = [...Array(11).keys()].map((i) => ({ row: 0, col: i }));
  const rightCol = [...Array(9).keys()].map((i) => ({ row: i + 1, col: 10 }));

  return [...bottomRow, ...leftCol, ...topRow, ...rightCol];
}

const PATH = generatePath();

function Board() {
  const {
    playerPositions,
    playerMoney,
    currentPlayer,
    propertyOwners,
    pendingAction,
    handleRoll,
    handleResolve,
  } = useGameState();

  return (
    <>
      <Box sx={styles.board}>
        {PATH.map(({ row, col }, index) => {
          const square = SQUARES[index];
          const ownerIndex = propertyOwners[index];
          const playersHere = PLAYERS.filter(
            (player, i) => playerPositions[i] === index,
          );

          return (
            <Box
              key={`${row}-${col}`}
              sx={styles.square(
                square.type,
                square.groupColor,
                row,
                col,
                index,
              )}>
              <Typography variant="caption" sx={styles.squareName}>
                {square.name}
              </Typography>
              {(square.price !== undefined || square.tax !== undefined) && (
                <Typography sx={styles.squarePrice}>
                  {square.price ?? square.tax}₴
                </Typography>
              )}
              {ownerIndex !== undefined && (
                <Box sx={styles.ownerDot(PLAYERS[ownerIndex].color)} />
              )}
              {playersHere.length > 0 && (
                <Box sx={styles.players}>
                  {playersHere.map((player) => {
                    const playerIndex = PLAYERS.indexOf(player);
                    const isActive = playerIndex === currentPlayer;

                    return (
                      <Box
                        key={player.id}
                        sx={styles.playerToken(isActive, player.color)}>
                        <PlayerIcon size={20} style={{ color: player.color }} />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          );
        })}

        <Box sx={styles.center}>
          <Typography variant="subtitle1" sx={styles.turnLabel}>
            Хід Гравця {currentPlayer + 1}
          </Typography>
          <Box sx={styles.moneyPanel}>
            {PLAYERS.map((player, i) => (
              <Box key={player.id} sx={styles.moneyBadge(player.color)}>
                <PlayerIcon size={16} style={{ color: player.color }} />
                <Typography sx={styles.moneyText(player.color)}>
                  {playerMoney[i]}₴
                </Typography>
              </Box>
            ))}
          </Box>
          <DicePair
            label={`Хід Гравця ${currentPlayer + 1}`}
            disabled={pendingAction !== null}
            onRoll={handleRoll}
          />
        </Box>
      </Box>

      <ActionDialog
        action={pendingAction}
        playerMoney={playerMoney[currentPlayer]}
        onResolve={handleResolve}
      />
    </>
  );
}

export default Board;
