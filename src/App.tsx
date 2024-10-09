import React, { useRef, useState } from 'react';

import { Dice, GetValueHandle } from 'src/components/Dice';

import './App.css';
import logo from './logo.svg';

function App() {
  const [progress, setProgress] = useState(false);
  const dice1 = useRef<GetValueHandle>(null);
  const dice2 = useRef<GetValueHandle>(null);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React
        </a>
        <br />
        <button
          type="button"
          onClick={async () => {
            setProgress(true);

            const [value1, value2] = await Promise.all([
              dice1.current?.getValue(),
              dice2.current?.getValue(),
            ]);

            if (value1 === value2) {
              alert('Double!');
            }

            setProgress(false);
          }}
          disabled={progress}>
          Move
        </button>
      </header>

      <div className="dices">
        <Dice ref={dice1} />
        <Dice ref={dice2} ratio={1.3} />
      </div>
    </div>
  );
}

export default App;
