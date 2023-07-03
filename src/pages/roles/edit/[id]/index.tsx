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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getRoleById, updateRoleById } from 'apiSdk/roles';
import { Error } from 'components/error';
import { roleValidationSchema } from 'validationSchema/roles';
import { RoleInterface } from 'interfaces/role';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

function RoleEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RoleInterface>(
    () => (id ? `/roles/${id}` : null),
    () => getRoleById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: RoleInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateRoleById(id, values);
      mutate(updated);
      resetForm();
      router.push('/roles');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<RoleInterface>({
    initialValues: data,
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
            Edit Role
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(RoleEditPage);
