import * as React from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

interface CategoryFilterProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onChange,
}) => {
  const toggle = (name: string) => {
    const set = new Set(selectedCategories);
    if (set.has(name)) set.delete(name);
    else set.add(name);
    onChange(Array.from(set));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Category
      </Typography>
      <FormGroup>
        {PRODUCT_CATEGORIES.map((cat) => (
          <FormControlLabel
            key={cat.id}
            control={
              <Checkbox
                size="small"
                checked={selectedCategories.includes(cat.name)}
                onChange={() => toggle(cat.name)}
              />
            }
            label={cat.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CategoryFilter;
