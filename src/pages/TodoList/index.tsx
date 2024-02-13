import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  filterTodosByStatus,
  markAllCompleted,
  onChangeCurrentPage,
  updateSearchByName,
  updateTodoOrder
} from 'store/reducers/Todos';

import AddOrEditTodoModal from 'components/AddOrEditTodoModal';
import FilterTodos from 'components/FilterTodos';
import Pagination from 'components/Pagination';
import RemoveTodoModal from 'components/RemoveTodoModal';
import { todoStatusOptions } from 'components/Select/constants';
import TodoItem from 'components/TodoItem';
import { useAppSelector } from 'hooks/redux';
import { ITodo } from 'interfaces/interfaces';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Box, Button, Theme, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import styles from './TodoList.module.scss';
import theme from 'theme/teme';

const TodoList: React.FC = () => {
  const [openAddOrEditTodoModal, setOpenAddOrEditTodoModal] = useState<boolean>(false);
  const [openRemoveTodoModal, setOpenRemoveTodoModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | undefined>(undefined);
  const { currentPage, searchByName, statusTodo, todos, todosPerPage } = useAppSelector(
    state => state.todosReducer
  );
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down(940));
  const dispatch = useDispatch();

  const filteredTodos: ITodo[] = todos.filter((todo: ITodo) => {
    const matchesStatusTodo: boolean =
      (statusTodo === todoStatusOptions[1].value && todo.completed) ||
      (statusTodo === todoStatusOptions[2].value && !todo.completed) ||
      statusTodo === todoStatusOptions[0].value;

    const matchesSearchByName: boolean = todo.name
      .toLowerCase()
      .includes(searchByName.toLowerCase());

    return matchesStatusTodo && matchesSearchByName;
  });

  const totalPages: number = Math.ceil(filteredTodos.length / todosPerPage);

  const startIndex: number = (currentPage - 1) * todosPerPage;
  const endIndex: number = startIndex + todosPerPage;
  const todosToDisplay: ITodo[] = filteredTodos.slice(startIndex, endIndex);

  useEffect(() => {
    if (filteredTodos.length && !todosToDisplay.length && totalPages < currentPage) {
      dispatch(onChangeCurrentPage(totalPages < 1 ? 1 : totalPages));
    }
    if (todos.length === 1 && statusTodo !== todoStatusOptions[0].value) {
      dispatch(filterTodosByStatus(todoStatusOptions[0].value));
      dispatch(updateSearchByName(''));
    }
  }, [todos, todosToDisplay, filteredTodos, totalPages]);

  const markAllTodosCompleted = () => {
    dispatch(markAllCompleted());
  };

  const checkAllTodosCompleted = () => {
    return todos.every((todo: ITodo) => todo.completed);
  };

  const handleOpenAddOrEditTodoModal = (todo: ITodo) => {
    setOpenAddOrEditTodoModal(prev => !prev);
    setSelectedTodo(todo);
  };

  const handleCloseAddOrEditTodoModal = () => {
    setOpenAddOrEditTodoModal(prev => !prev);
    setSelectedTodo(undefined);
  };

  const handleOpenRemoveTodoModal = (todo: ITodo) => {
    setOpenRemoveTodoModal(prev => !prev);
    setSelectedTodo(todo);
  };

  const handleCloseRemoveTodoModal = () => {
    setOpenRemoveTodoModal(prev => !prev);
    setSelectedTodo(undefined);
  };

  const renderMessageForEmptyTodos = () => (
    <Typography component="h2" className={styles.messageForEmptyTodos}>
      {!todos.length
        ? 'Todo list is empty. 😢 Please add new ones to work with the list by clicking on the "Add todo" button'
        : 'I am really sorry. 😢 There are no todos that match your search or filter criteria. If necessary, you can create them by clicking on the "Add todo" button or by changing the status of an existing todo'}
    </Typography>
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items: ITodo[] = Array.from(todosToDisplay);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedTodos: ITodo[] = [...todos];

    // Update the order only for elements on the current page
    for (let i: number = startIndex; i < endIndex && i < updatedTodos.length; i++) {
      const indexInOriginal = todos.indexOf(todosToDisplay[i - startIndex]);
      updatedTodos[indexInOriginal] = items[i - startIndex];
    }

    dispatch(updateTodoOrder(updatedTodos));
  };

  const renderTodoItem = (todo: ITodo, index: number) => (
    <Draggable key={todo.id} draggableId={todo.id} index={index}>
      {provided => (
        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <TodoItem
            todo={todo}
            handleOpenAddOrEditTodoModal={handleOpenAddOrEditTodoModal}
            handleOpenRemoveTodoModal={handleOpenRemoveTodoModal}
          />
        </Box>
      )}
    </Draggable>
  );

  return (
    <Box className={styles.container}>
      <Box className={styles.topContent}>
        {todos.length > 1 && (
          <>
            <FilterTodos />
            <Button
              variant="contained"
              sx={{
                color: theme => theme.palette.common.white,
                backgroundColor: theme => theme.palette.background.blueGreen,
                width: fullScreen ? '100%' : 'auto',
                marginLeft: fullScreen ? 0 : '10px',
                marginTop: fullScreen ? '10px' : 0,
                marginBottom: fullScreen ? '10px' : 0
              }}
              size="medium"
              onClick={markAllTodosCompleted}
              disabled={checkAllTodosCompleted()}
            >
              Mark all completed
            </Button>
          </>
        )}
        <Button
          variant="contained"
          sx={{
            color: (theme: Theme) => theme.palette.common.white,
            width: fullScreen ? '100%' : 'auto',
            marginLeft: fullScreen ? 0 : 'auto'
          }}
          size="medium"
          onClick={handleCloseAddOrEditTodoModal}
        >
          Add Todo
        </Button>
      </Box>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todoList">
          {provided => (
            <Box
              component="ul"
              className={styles.todoList}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {!todos.length || !filteredTodos.length
                ? renderMessageForEmptyTodos()
                : todosToDisplay.map((todo: ITodo, index: number) => renderTodoItem(todo, index))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      {totalPages > 1 && filteredTodos.length && (
        <Pagination todos={filteredTodos} totalPages={totalPages} />
      )}
      <AddOrEditTodoModal
        open={openAddOrEditTodoModal}
        todo={selectedTodo}
        handleClose={handleCloseAddOrEditTodoModal}
      />
      <RemoveTodoModal
        open={openRemoveTodoModal}
        todo={selectedTodo}
        handleClose={handleCloseRemoveTodoModal}
      />
    </Box>
  );
};

export default TodoList;
