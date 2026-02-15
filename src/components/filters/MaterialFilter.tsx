import * as React from 'react';
import { Box, Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { MATERIALS } from '../../utils/constants';

interface MaterialFilterProps {
  selectedMaterials: string[];
  onChange: (materials: string[]) => void;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({
  selectedMaterials,
  onChange,
}) => {
  const toggle = (name: string) => {
    const set = new Set(selectedMaterials);
    if (set.has(name)) set.delete(name);
    else set.add(name);
    onChange(Array.from(set));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        Material
      </Typography>
      <FormGroup>
        {MATERIALS.map((m) => (
          <FormControlLabel
            key={m}
            control={
              <Checkbox
                size="small"
                checked={selectedMaterials.includes(m)}
                onChange={() => toggle(m)}
              />
            }
            label={m}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default MaterialFilter;
