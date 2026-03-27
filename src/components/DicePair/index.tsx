import { Box, Button, Stack } from '@mui/material';
import React, { useRef, useState } from 'react';

import { Dice, GetValueHandle } from 'src/components/Dice';

import * as styles from './styles';

interface DicePairProps {
  label?: string;
  onRoll?: (values: [number, number]) => void;
}

function DicePair({ label = 'Move', onRoll }: DicePairProps) {
  const [progress, setProgress] = useState(false);
  const dice1 = useRef<GetValueHandle>(null);
  const dice2 = useRef<GetValueHandle>(null);

  const handleMove = async () => {
    setProgress(true);

    const [value1, value2] = await Promise.all([
      dice1.current?.getValue() ?? 1,
      dice2.current?.getValue() ?? 1,
    ]);

    onRoll?.([value1, value2]);
    setProgress(false);
  };

  return (
    <Box sx={styles.root}>
      <Stack direction="row" sx={styles.dices}>
        <Dice ref={dice1} />
        <Dice ref={dice2} ratio={1.3} />
      </Stack>
      <Button
        variant="contained"
        size="large"
        sx={styles.moveButton}
        disabled={progress}
        onClick={handleMove}>
        {label}
      </Button>
    </Box>
  );
}

export default DicePair;
