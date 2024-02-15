import { ITodo } from 'interfaces/interfaces';

export const getTrimmedText = (value: string) => value.replace(/\s+/g, ' ').trim();

export const checkNameDuplicate = (name: string, todos: ITodo[]) =>
  todos.some((todo: ITodo) => todo.name.toLowerCase() === name.toLowerCase());
