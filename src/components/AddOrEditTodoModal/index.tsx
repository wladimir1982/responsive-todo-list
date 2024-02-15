import React, { FC } from 'react';
import { addTodo, editTodo } from 'store/reducers/Todos';
import { FormikHelpers, useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';

import AddOrEditTodoSchema from 'components/AddOrEditTodoModal/AddOrEditTodoShema';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ITodo } from 'interfaces/interfaces';
import { useSnackbar } from 'notistack';
import { getTrimmedText } from 'utils/helpers';
import { Close } from '@mui/icons-material';
import { Box, IconButton, TextField, Theme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const NAME = 'name';
const DESCRIPTION = 'description';

type AddOrEditTodoModalProps = {
  open: boolean;
  todo?: ITodo;
  handleClose: () => void;
};

const AddOrEditTodoModal: FC<AddOrEditTodoModalProps> = ({ open, todo, handleClose }) => {
  const theme: Theme = useTheme();
  const fullScreen: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const { todos } = useAppSelector(state => state.todosReducer);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const isEdit: boolean | undefined = Boolean(todo && todo.name);
  const title: string = isEdit ? 'Edit todo' : 'Add new todo';
  const initialValues: ITodo =
    isEdit && todo ? { ...todo } : { name: '', description: '', id: '1', completed: false };

  const handleSubmit = (
    { name, description, id, ...params }: ITodo,
    actions: FormikHelpers<ITodo>
  ) => {
    const newValues = {
      name: getTrimmedText(name),
      description: getTrimmedText(description),
      id: isEdit ? id : uuidv4(),
      ...params
    };

    dispatch(isEdit ? editTodo(newValues) : addTodo(newValues));
    enqueueSnackbar(`The todo has been successfully ${isEdit ? 'edited' : 'added'} 🌟😄🌟`);
    actions.setSubmitting(false);
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddOrEditTodoSchema(todos),
    enableReinitialize: true,
    onSubmit: handleSubmit
  });

  const onCancel = () => {
    formik.resetForm();
    handleClose();
  };

  const checkError = (fieldName: string) => {
    return (
      (formik.touched as { [key: string]: boolean })[fieldName] &&
      Boolean((formik.errors as { [key: string]: boolean })[fieldName])
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="responsive-dialog-title"
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%'
          }
        }
      }}
    >
      <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onCancel}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ marginBottom: '10px' }}>
            <TextField
              name={NAME}
              fullWidth
              required
              id="name-todo"
              label="Name todo"
              placeholder="Type the todo name..."
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={checkError(NAME)}
              helperText={checkError(NAME) && formik.errors.name}
              sx={{ marginBottom: checkError(NAME) ? 0 : '23px' }}
            />
          </Box>
          <Box sx={{ marginBottom: '10px' }}>
            <TextField
              name={DESCRIPTION}
              fullWidth
              multiline
              rows={3}
              required
              id="description-todo"
              label="Description todo"
              placeholder="Type the todo description..."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={checkError(DESCRIPTION)}
              helperText={checkError(DESCRIPTION) && formik.errors.description}
              sx={{
                marginBottom: checkError(DESCRIPTION) ? 0 : '23px'
              }}
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ color: 'white' }}
            color="info"
            disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditTodoModal;
