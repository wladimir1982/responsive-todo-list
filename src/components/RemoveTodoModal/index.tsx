import React, { FC } from 'react';
import { removeTodo } from 'store/reducers/Todos';

import { useAppDispatch } from 'hooks/redux';
import { ITodo } from 'interfaces/interfaces';
import { useSnackbar } from 'notistack';
import { Close } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type RemoveTodoModalProps = {
  open: boolean;
  todo?: ITodo;
  handleClose: () => void;
};

const RemoveTodoModal: FC<RemoveTodoModalProps> = ({ open, todo, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveTodo = () => {
    if (todo) {
      dispatch(removeTodo(todo));
      enqueueSnackbar('The todo has been successfully removed');
      handleClose();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 'bold' }}>
        Are you sure?
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <Close />
      </IconButton>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography mb="20px">Do you really want to remove {todo?.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ color: 'white' }}
          color="info"
          onClick={handleClose}
          autoFocus
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ color: 'white' }}
          color="error"
          onClick={handleRemoveTodo}
          autoFocus
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveTodoModal;
