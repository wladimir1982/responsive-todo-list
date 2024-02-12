import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { todoStatusOptions } from 'components/Select/constants';
import { ITodo } from 'interfaces/interfaces';

interface Todos {
  todos: ITodo[];
  statusTodo: string;
  searchByName: string;
  currentPage: number;
  todosPerPage: number;
}

const initialState: Todos = {
  todos: [],
  statusTodo: todoStatusOptions[0].value,
  searchByName: '',
  currentPage: 1,
  todosPerPage: 5
};

const savedState = localStorage.getItem('todosState');
const persistedState = savedState ? JSON.parse(savedState) : initialState;

export const todosSlice = createSlice({
  name: 'todos',
  initialState: persistedState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    editTodo(state, action: PayloadAction<ITodo>) {
      const { id, name, description } = action.payload;
      const todoIndex = state.todos.findIndex((todo: ITodo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].name = name;
        state.todos[todoIndex].description = description;
      }
    },
    removeTodo(state, action: PayloadAction<ITodo>) {
      state.todos = state.todos.filter((todo: ITodo) => todo.id !== action.payload.id);
    },
    updateSearchByName(state, action: PayloadAction<string>) {
      state.searchByName = action.payload;
    },
    filterTodosByStatus(state, action: PayloadAction<string>) {
      state.statusTodo = action.payload;
    },
    toggleCompleteTodo(state, action: PayloadAction<ITodo>) {
      const { id } = action.payload;
      const todoIndex = state.todos.findIndex((todo: ITodo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
      }
    },
    markAllCompleted(state) {
      state.todos.forEach((todo: ITodo) => {
        todo.completed = true;
      });
    },
    updateTodoOrder: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
    },
    onChangeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export const {
  addTodo,
  editTodo,
  removeTodo,
  updateSearchByName,
  filterTodosByStatus,
  toggleCompleteTodo,
  markAllCompleted,
  updateTodoOrder,
  onChangeCurrentPage
} = todosSlice.actions;

export default function todosReducer(state: Todos, action: PayloadAction<ITodo>) {
  const newState = todosSlice.reducer(state, action);
  localStorage.setItem('todosState', JSON.stringify(newState));
  return newState;
}
