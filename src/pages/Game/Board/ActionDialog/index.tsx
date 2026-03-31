import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import React from 'react';

import { PendingAction } from '../useGameState';
import * as styles from './styles';

interface Props {
  action: PendingAction | null;
  playerMoney: number;
  onResolve: (bought?: boolean) => void;
}

function ActionDialog({ action, playerMoney, onResolve }: Props) {
  if (!action) {
    return null;
  }

  if (action.type === 'buy') {
    const canAfford = playerMoney >= action.price;

    return (
      <Dialog open>
        <DialogTitle>Доступна власність</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {action.name}
          </Typography>
          <Typography>
            Ціна: <strong>{action.price}₴</strong>
          </Typography>
          <Typography>Оренда: {action.rent}₴</Typography>
          <Typography sx={styles.balance}>
            Ваш баланс: {playerMoney}₴
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onResolve(false)}>Пропустити</Button>
          <Button
            variant="contained"
            disabled={!canAfford}
            onClick={() => onResolve(true)}>
            Купити
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  let title = '';
  let body = '';
  let amount: number | undefined;

  switch (action.type) {
    case 'rent':
      title = 'Оренда';
      body = `Ви потрапили на ${action.squareName} — власність ${action.paidTo}.`;
      amount = -action.amount;
      break;
    case 'tax':
      title = action.squareName;
      body = 'Вам потрібно сплатити податок.';
      amount = -action.amount;
      break;
    case 'go-to-jail':
      title = "До в'язниці!";
      body =
        "Відправляйтесь прямо до в'язниці. Не проходьте Старт, не отримуйте 200₴.";
      break;
    case 'card':
      title = action.title;
      body = action.description;
      amount = action.amount;
      break;
    default:
      break;
  }

  const isPositive = amount !== undefined && amount > 0;

  return (
    <Dialog open>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>{body}</Typography>
        {amount !== undefined && amount !== 0 && (
          <Typography sx={styles.amount(isPositive)}>
            {isPositive ? `+${amount}₴` : `-${Math.abs(amount)}₴`}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onResolve()}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ActionDialog;
