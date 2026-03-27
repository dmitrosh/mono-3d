import { Box } from '@mui/material';
import React from 'react';

import Board from './Board';
import * as styles from './styles';

function Game() {
  return (
    <Box sx={styles.root}>
      <Board />
    </Box>
  );
}

export default Game;
