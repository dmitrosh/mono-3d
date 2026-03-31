import { SxProps, Theme } from '@mui/material';

import { SquareType, getBandEdge } from './squares';

const SQUARE_BACKGROUNDS: Record<SquareType, string> = {
  go: '#1b4332',
  property: '#1e1e1e',
  railroad: '#141414',
  utility: '#1a2e28',
  tax: '#2e1414',
  chance: '#141428',
  'community-chest': '#28141e',
  jail: '#222222',
  'free-parking': '#1a2e1a',
  'go-to-jail': '#2e1414',
};

export const board: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(11, 100px)',
  gridTemplateRows: 'repeat(11, 100px)',
  width: 1100,
  height: 1100,
};

export const square = (
  type: SquareType,
  groupColor: string | undefined,
  row: number,
  col: number,
  index: number,
): SxProps<Theme> => {
  const band = groupColor ? getBandEdge(index) : undefined;

  return {
    gridColumn: col + 1,
    gridRow: row + 1,
    width: 100,
    height: 100,
    backgroundColor: SQUARE_BACKGROUNDS[type],
    border: '1px solid rgba(255,255,255,0.08)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0.25,
    position: 'relative',
    overflow: 'hidden',
    ...(band === 'top' && groupColor
      ? { borderTop: `10px solid ${groupColor}` }
      : {}),
    ...(band === 'bottom' && groupColor
      ? { borderBottom: `10px solid ${groupColor}` }
      : {}),
    ...(band === 'left' && groupColor
      ? { borderLeft: `10px solid ${groupColor}` }
      : {}),
    ...(band === 'right' && groupColor
      ? { borderRight: `10px solid ${groupColor}` }
      : {}),
  };
};

export const squareName: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.85)',
  fontSize: '0.52rem',
  textAlign: 'center',
  lineHeight: 1.2,
  px: 0.5,
  wordBreak: 'break-word',
};

export const squarePrice: SxProps<Theme> = {
  color: 'rgba(255,255,255,0.5)',
  fontSize: '0.48rem',
};

export const ownerDot = (color: string): SxProps<Theme> => ({
  position: 'absolute',
  top: 3,
  right: 3,
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow: `0 0 4px ${color}`,
});

export const players: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: 0.5,
  justifyContent: 'center',
  flexWrap: 'wrap',
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

export const center: SxProps<Theme> = {
  gridColumn: '2 / 11',
  gridRow: '2 / 11',
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
