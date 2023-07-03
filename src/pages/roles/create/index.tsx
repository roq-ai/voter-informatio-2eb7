import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRole } from 'apiSdk/roles';
import { Error } from 'components/error';
import { roleValidationSchema } from 'validationSchema/roles';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { RoleInterface } from 'interfaces/role';

function RoleCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RoleInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRole(values);
      resetForm();
      router.push('/roles');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RoleInterface>({
    initialValues: {
      role_name: '',
    },
    validationSchema: roleValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Role
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="role_name" mb="4" isInvalid={!!formik.errors?.role_name}>
            <FormLabel>Role Name</FormLabel>
            <Input type="text" name="role_name" value={formik.values?.role_name} onChange={formik.handleChange} />
            {formik.errors.role_name && <FormErrorMessage>{formik.errors?.role_name}</FormErrorMessage>}
          </FormControl>

          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'role',
    operation: AccessOperationEnum.CREATE,
  }),
)(RoleCreatePage);
