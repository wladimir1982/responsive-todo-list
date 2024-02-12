import { combineReducers, configureStore } from '@reduxjs/toolkit';

import todosReducer from './reducers/Todos';

const rootReducer = combineReducers({
  todosReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
