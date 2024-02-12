import React from 'react';
import { useDispatch } from 'react-redux';
import { onChangeCurrentPage } from 'store/reducers/Todos';

import { useAppSelector } from 'hooks/redux';
import { ITodo } from 'interfaces/interfaces';
import { Box, Pagination, Typography } from '@mui/material';

import styles from './PaginationComponent.module.scss';

type PaginationComponentProps = {
  todos: ITodo[];
  totalPages: number;
};
const PaginationComponent: React.FC<PaginationComponentProps> = ({ todos, totalPages }) => {
  const { currentPage, todosPerPage } = useAppSelector(state => state.todosReducer);
  const dispatch = useDispatch();

  const startIndex = (currentPage - 1) * todosPerPage + 1;
  const endIndex =
    startIndex + todosPerPage - 1 < todos.length ? startIndex + todosPerPage - 1 : todos.length;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(onChangeCurrentPage(page));
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.paragraph}>
        {startIndex}-{endIndex} out of {todos.length}
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        className={styles.pagination}
      />
    </Box>
  );
};

export default PaginationComponent;
