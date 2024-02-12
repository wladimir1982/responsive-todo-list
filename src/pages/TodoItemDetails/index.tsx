import React from 'react';
import { useLocation } from 'react-router-dom';

import { ITodo } from 'interfaces/interfaces';
import { Box, Typography } from '@mui/material';

import styles from './TodoItemDetails.module.scss';

const TodoItemDetails: React.FC = () => {
  const location = useLocation();
  const todo: ITodo = location.state;

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Typography className={styles.name}>
          <Box component="span" className={styles.span}>
            name:{' '}
          </Box>
          {todo.name}
        </Typography>
        <Typography className={styles.text}>
          <Box component="span" className={styles.span}>
            description:{' '}
          </Box>
          {todo.description}
        </Typography>
        <Typography className={styles.text}>
          <Box component="span" className={styles.span}>
            id:{' '}
          </Box>
          {todo.id}
        </Typography>
        <Typography className={styles.text}>
          <Box component="span" className={styles.span}>
            status:{' '}
          </Box>
          {todo.completed ? 'completed' : 'incomplete'}
        </Typography>
      </Box>
    </Box>
  );
};

export default TodoItemDetails;
