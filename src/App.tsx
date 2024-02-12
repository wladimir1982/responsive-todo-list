import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { setupStore } from 'store/store';
import { SiteLayout } from 'hoc/SiteLayout';

import TodoItemDetails from 'pages/TodoItemDetails';
import TodoList from 'pages/TodoList';
import SnackbarProviderWrapper from 'containers/SnackbarProviderWrapper';
import routes from 'constants/routes';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from 'theme/teme';

const store = setupStore();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProviderWrapper>
            <BrowserRouter>
              <SiteLayout>
                <Routes>
                  <Route path={routes.todoList.list} element={<TodoList />} />
                  <Route path={routes.todoList.details.path} element={<TodoItemDetails />} />
                  <Route
                    path={routes.home}
                    element={<Navigate to={routes.todoList.list} replace />}
                  />
                  <Route path="*" element={<Navigate to={routes.todoList.list} replace />} />
                </Routes>
              </SiteLayout>
            </BrowserRouter>
          </SnackbarProviderWrapper>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
