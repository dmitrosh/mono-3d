import { SxProps, Theme } from '@mui/material';

export const board: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(10, 100px)',
  gridTemplateRows: 'repeat(10, 100px)',
  width: 1000,
  height: 1000,
};

export const square = (
  color: string,
  row: number,
  col: number,
): SxProps<Theme> => ({
  gridColumn: col + 1,
  gridRow: row + 1,
  width: 100,
  height: 100,
  backgroundColor: color,
  border: '2px solid rgba(0, 0, 0, 0.35)',
  boxSizing: 'border-box',
  borderRadius: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.5,
});

export const players: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: 0.5,
  justifyContent: 'center',
};

export const startLabel: SxProps<Theme> = {
  color: '#fff',
  fontWeight: 'bold',
  textShadow: '0 1px 3px rgba(0,0,0,0.7)',
  userSelect: 'none',
};

export const center: SxProps<Theme> = {
  gridColumn: '2 / 10',
  gridRow: '2 / 10',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
