import * as yup from 'yup';

export const roleValidationSchema = yup.object().shape({
  role_name: yup.string().required(),
});
