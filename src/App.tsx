import { Box, Button, Link, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dice, GetValueHandle } from 'src/components/Dice';
import sleep from 'src/tools/sleep';

import './App.css';
import logoSrc from './logo.svg';
import * as styles from './styles';

function App() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);
  const dice1 = useRef<GetValueHandle>(null);
  const dice2 = useRef<GetValueHandle>(null);
  const logo = useRef<HTMLImageElement>(null);

  return (
    <Box sx={styles.root}>
      <Box component="header" sx={styles.header}>
        <img src={logoSrc} className="App-logo" ref={logo} alt="logo" />
        <Typography variant="body1" sx={styles.bodyText}>
          Edit <code>src/App.tsx</code> and save to reload.
        </Typography>
        <Link
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          color="#61dafb">
          Learn React
        </Link>
        <Stack direction="row" gap={2} sx={styles.buttons}>
          <Button
            variant="contained"
            size="large"
            sx={styles.moveButton}
            disabled={progress}
            onClick={async () => {
              setProgress(true);
              logo?.current?.classList.remove('animated');

              const [value1, value2] = await Promise.all([
                dice1.current?.getValue(),
                dice2.current?.getValue(),
              ]);

              if (value1 === value2) {
                logo?.current?.classList.add('animated');
                await sleep(1000);
              }

              setProgress(false);
            }}>
            Move
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={styles.playButton}
            onClick={() => navigate('/game')}>
            Play
          </Button>
        </Stack>
      </Box>

      <Stack direction="row" gap={4} sx={styles.dices}>
        <Dice ref={dice1} />
        <Dice ref={dice2} ratio={1.3} />
      </Stack>
    </Box>
  );
}

export default App;
