import * as React from 'react';
import { Box, Slider, TextField, Typography } from '@mui/material';

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
  min?: number;
  max?: number;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  onChange,
  min = 0,
  max = 200000,
}) => {
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const [low, high] = newValue as number[];
    onChange([low, high]);
  };

  const handleMinChange = (v: string) => {
    const n = Number(v || 0);
    onChange([Math.max(min, Math.min(n, priceRange[1])), priceRange[1]]);
  };

  const handleMaxChange = (v: string) => {
    const n = Number(v || 0);
    onChange([priceRange[0], Math.min(max, Math.max(n, priceRange[0]))]);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Price range
      </Typography>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{ mt: 1, mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <TextField
          label="Min"
          size="small"
          fullWidth
          value={priceRange[0]}
          onChange={(e) => handleMinChange(e.target.value)}
          InputProps={{ inputMode: 'numeric' }}
        />
        <TextField
          label="Max"
          size="small"
          fullWidth
          value={priceRange[1]}
          onChange={(e) => handleMaxChange(e.target.value)}
          InputProps={{ inputMode: 'numeric' }}
        />
      </Box>
    </Box>
  );
};

export default PriceRangeFilter;
