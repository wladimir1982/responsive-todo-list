import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux';
import { usePageTitle } from 'hooks/usePageTitle';
import routes from 'constants/routes';
import { ArrowBack, FormatListBulleted } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

import styles from './SiteLayout.module.scss';

import logo from 'assets/images/cat.jpg';

type SiteLayoutProps = {
  children: ReactNode;
};

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const { todos } = useAppSelector(state => state.todosReducer);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  usePageTitle(pathname);

  const goBack = () => {
    navigate(-1);
  };

  const getTitle = (path: string): string => {
    switch (path) {
      case routes.todoList.list:
        return 'Todos';
      default:
        if (path.startsWith('/todoList/')) {
          return 'Todo';
        } else {
          return 'Unknown';
        }
    }
  };

  const renderLogoOrBackButton = () => {
    if (pathname === routes.todoList.list) {
      return <Box className={styles.img} component="img" src={logo} alt="logo" />;
    } else {
      return (
        <Button
          variant="contained"
          color="info"
          sx={{ color: theme => theme.palette.common.white }}
          startIcon={<ArrowBack />}
          onClick={goBack}
        >
          Back
        </Button>
      );
    }
  };

  return (
    <>
      <Box component="header" className={styles.header}>
        <Box className={styles.leftBlock}>{renderLogoOrBackButton()}</Box>
        <Typography component="h2" className={styles.headerTitle}>
          {getTitle(pathname)}
        </Typography>
        <Box className={styles.todosIconBlock}>
          <FormatListBulleted className={styles.iconBtn} fontSize="large" />
          <Box className={styles.todosCount}>{todos.length}</Box>
        </Box>
      </Box>
      <Box component="main" className={styles.main}>
        <Box className={styles.container}>{children}</Box>
      </Box>
    </>
  );
};

export { SiteLayout };
