import React from 'react';
import { useDispatch } from 'react-redux';
import { filterTodosByStatus, updateSearchByName } from 'store/reducers/Todos';

import SearchField from 'components/SearchField';
import SelectComponent from 'components/Select';
import { todoStatusOptions } from 'components/Select/constants';
import { useAppSelector } from 'hooks/redux';
import { Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import styles from './FilterTodos.module.scss';
import theme from 'theme/teme';

const FilterTodos: React.FC = () => {
  const { searchByName, statusTodo } = useAppSelector(state => state.todosReducer);
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down(940));
  const dispatch = useDispatch();

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSearchByName(e.target.value));
  };

  const onClearSearch = () => {
    dispatch(updateSearchByName(''));
  };

  const filterByStatus = (status: string) => {
    dispatch(filterTodosByStatus(status));
  };

  return (
    <Box className={styles.container}>
      <SearchField
        value={searchByName}
        placeholder="Todo name"
        onChange={onSearch}
        onClear={onClearSearch}
        size="small"
        minWidth={fullScreen ? 'auto' : 318}
      />
      <SelectComponent
        options={todoStatusOptions}
        value={statusTodo}
        filterByStatus={filterByStatus}
        minWidth={200}
      />
    </Box>
  );
};

export default FilterTodos;
