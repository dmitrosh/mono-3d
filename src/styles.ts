import { SxProps, Theme } from '@mui/material';

export const root: SxProps<Theme> = {
  textAlign: 'center',
};

export const header: SxProps<Theme> = {
  backgroundColor: '#282c34',
  minHeight: 'calc(100vh - 160px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'calc(10px + 2vmin)',
  color: 'white',
};

export const bodyText: SxProps<Theme> = {
  fontSize: 'inherit',
};

export const buttons: SxProps<Theme> = {
  mt: 2,
};

export const moveButton: SxProps<Theme> = {
  fontSize: '1.5rem',
  px: 3,
};

export const playButton: SxProps<Theme> = {
  fontSize: '1.5rem',
  px: 3,
};

export const dices: SxProps<Theme> = {
  p: '40px 80px',
};
