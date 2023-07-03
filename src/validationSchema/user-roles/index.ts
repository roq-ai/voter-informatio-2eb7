import * as yup from 'yup';

export const userRoleValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  role_id: yup.string().nullable().required(),
  organization_id: yup.string().nullable().required(),
});
