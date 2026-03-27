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
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
};

export const turnLabel: SxProps<Theme> = {
  color: '#fff',
  fontWeight: 'bold',
  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
};

export const playerToken = (
  active: boolean,
  color: string,
): SxProps<Theme> => ({
  display: 'flex',
  filter: active
    ? `drop-shadow(0 0 3px ${color === '#000000' ? '#fff' : '#000'})`
    : 'none',
});

export const moneyPanel: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
};

export const moneyBadge = (color: string): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 1.5,
  py: 0.75,
  borderRadius: 2,
  border: `2px solid ${color}`,
  backgroundColor:
    color === '#000000' ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
});

export const moneyText = (color: string): SxProps<Theme> => ({
  color: color === '#000000' ? '#000000' : '#ffffff',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  lineHeight: 1,
});
