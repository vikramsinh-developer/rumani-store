import * as React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SORT_OPTIONS } from '../../utils/constants';

export type SortValue = 'newest' | 'priceLow' | 'priceHigh' | 'popular' | 'rating';

interface SortOptionsProps {
  sortBy: SortValue;
  onChange: (value: SortValue) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortBy, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as SortValue);
  };

  return (
    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 180 } }}>
      <InputLabel id="sort-by-label">Sort by</InputLabel>
      <Select
        labelId="sort-by-label"
        value={sortBy}
        label="Sort by"
        onChange={handleChange}
      >
        {SORT_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortOptions;
