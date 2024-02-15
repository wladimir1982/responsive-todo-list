import React from 'react';

import { ITodoOption } from 'interfaces/interfaces';
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const selectStyles = {
  borderRadius: '20px',
  '.MuiOutlinedInput-input': {
    padding: '8.5px 9px'
  },
  '.MuiSvgIcon-root': {
    right: '3px'
  }
};

type SelectComponentProps = {
  options: ITodoOption[];
  value: string;
  filterByStatus: (status: string) => void;
  minWidth: number | string;
};
const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  value,
  filterByStatus,
  minWidth
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    filterByStatus(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth, width: '100%' }}>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={selectStyles}
        MenuProps={{
          disableScrollLock: true
        }}
      >
        {options.map((option: ITodoOption) => (
          <MenuItem key={option.value} value={option.value}>
            <span>{option.label}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
