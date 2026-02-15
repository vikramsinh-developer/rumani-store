import * as React from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const QuantitySelector: React.FC<{
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}> = ({ value, onChange, min = 1, max = 99 }) => {
  const clamp = (n: number) => Math.max(min, Math.min(max, n));
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton size="small" onClick={() => onChange(clamp(value - 1))}>
        <RemoveIcon />
      </IconButton>
      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value || min)))}
        inputProps={{ inputMode: 'numeric', style: { textAlign: 'center', width: 48 } }}
      />
      <IconButton size="small" onClick={() => onChange(clamp(value + 1))}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
