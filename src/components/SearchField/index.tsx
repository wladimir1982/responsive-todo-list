import React from 'react';

import { Close, Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import styles from './SearchField.module.scss';

type SearchFieldProps = {
  value: string;
  placeholder: string;
  size: 'small' | 'medium';
  minWidth: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};
const SearchField: React.FC<SearchFieldProps> = ({
  value,
  placeholder,
  minWidth,
  size,
  onChange,
  onClear
}) => {
  const ClearFieldButton = (
    <IconButton data-testid="remove-btn" size="small" aria-label="delete" onClick={onClear}>
      <Close fontSize="small" />
    </IconButton>
  );

  const searchIcon = (
    <IconButton
      id="search-icon"
      data-testid="search-icon"
      size="small"
      className={styles.searchIcon}
    >
      <Search fontSize="small" />
    </IconButton>
  );

  return (
    <TextField
      id="todo-name-search"
      data-testid="input"
      placeholder={placeholder}
      size={size}
      onChange={onChange}
      sx={{ minWidth, width: '100%' }}
      value={value}
      InputProps={{
        className: styles.textFieldInput,
        startAdornment: <InputAdornment position="start">{searchIcon}</InputAdornment>,
        endAdornment: <InputAdornment position="end">{value && ClearFieldButton}</InputAdornment>
      }}
    />
  );
};

export default SearchField;
