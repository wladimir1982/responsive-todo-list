import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toggleCompleteTodo } from 'store/reducers/Todos';
import cn from 'classnames';

import { useAppDispatch } from 'hooks/redux';
import routes from 'constants/routes';
import { ITodo } from 'interfaces/interfaces';
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Preview } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import styles from './TodoItem.module.scss';

type TodoItemProps = {
  todo: ITodo;
  handleOpenAddOrEditTodoModal: (todo: ITodo) => void;
  handleOpenRemoveTodoModal: (todo: ITodo) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  handleOpenAddOrEditTodoModal,
  handleOpenRemoveTodoModal
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleComplete = (todo: ITodo) => {
    dispatch(toggleCompleteTodo(todo));
  };

  const navigateTo = () => {
    navigate(routes.todoList.details.link(todo.id.toString()), {
      state: todo
    });
  };

  return (
    <Box
      component="li"
      className={cn(styles.container, {
        [styles.containerBg]: todo.completed
      })}
    >
      <Typography
        className={cn(styles.nameBlock, {
          [styles.nameBlockCompleted]: todo.completed
        })}
      >
        {todo.name}
      </Typography>
      <Box className={styles.actionsBlock}>
        <IconButton color="primary" size="medium" onClick={() => toggleComplete(todo)}>
          {todo.completed ? <CheckBox /> : <CheckBoxOutlineBlank />}
        </IconButton>
        <IconButton color="info" size="medium" onClick={() => handleOpenAddOrEditTodoModal(todo)}>
          <Edit />
        </IconButton>
        <IconButton color="error" size="medium" onClick={() => handleOpenRemoveTodoModal(todo)}>
          <Delete />
        </IconButton>
        <IconButton color="primary" size="medium" onClick={navigateTo}>
          <Preview />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TodoItem;
