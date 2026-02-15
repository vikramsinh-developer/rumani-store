import * as React from 'react';
import { Box, TextField } from '@mui/material';

const OTPInput: React.FC<{
  length?: number;
  value: string;
  onChange: (val: string) => void;
}> = ({ length = 6, value, onChange }) => {
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const setChar = (index: number, ch: string) => {
    const next = value.split('');
    next[index] = ch;
    onChange(next.join('').slice(0, length).replace(/[^0-9]/g, ''));
  };

  return (
    <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.2 }, justifyContent: 'center' }}>
      {chars.map((c, i) => (
        <TextField
          key={i}
          value={c}
          onChange={(e) => setChar(i, e.target.value.slice(-1))}
          inputProps={{ maxLength: 1, inputMode: 'numeric', style: { textAlign: 'center' } }}
          sx={{ width: { xs: 40, sm: 48 } }}
        />
      ))}
    </Box>
  );
};

export default OTPInput;
