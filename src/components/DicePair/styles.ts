import { SxProps, Theme } from '@mui/material';

export const root: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 3,
  width: '100%',
};

export const dices: SxProps<Theme> = {
  gap: 4,
  width: '100%',
  px: 2,
};

export const moveButton: SxProps<Theme> = {
  fontSize: '1.2rem',
  px: 4,
};
