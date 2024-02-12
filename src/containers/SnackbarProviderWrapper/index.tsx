import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';

import { SnackbarProvider } from 'notistack';

interface SnackbarProviderWrapperProps {
  children: ReactNode;
}

const SnackbarProviderWrapper: React.FC<SnackbarProviderWrapperProps> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      autoHideDuration={3000}
      variant="success"
    >
      {children}
    </SnackbarProvider>
  );
};

SnackbarProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default SnackbarProviderWrapper;
