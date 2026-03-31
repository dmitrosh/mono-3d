import { SxProps, Theme } from '@mui/material';

export const balance: SxProps<Theme> = {
  mt: 2,
  color: 'text.secondary',
};

export const amount = (positive: boolean): SxProps<Theme> => ({
  mt: 1,
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: positive ? 'success.main' : 'error.main',
});
