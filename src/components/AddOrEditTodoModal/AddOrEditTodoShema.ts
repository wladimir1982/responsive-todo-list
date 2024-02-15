import * as Yup from 'yup';

import { ITodo } from 'interfaces/interfaces';
import { checkNameDuplicate, getTrimmedText } from 'utils/helpers';

const AddOrEditTodoSchema = (todos: ITodo[]) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2)
      .max(65)
      .test('unique-name', 'Todo with such a name already exists', value => {
        const trimmedValue = value ? getTrimmedText(value) : '';
        const isNameDuplicate = checkNameDuplicate(trimmedValue, todos);
        return !isNameDuplicate;
      })
      .required(),
    description: Yup.string().trim().min(10).max(500).required()
  });

export default AddOrEditTodoSchema;
