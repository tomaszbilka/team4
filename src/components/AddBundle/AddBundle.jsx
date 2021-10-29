import React from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('This fild accepts only string')
    .lowercase('Text should be written lowercase')
    .matches(/^[a-z_]*$/g, 'Wrong text format')
    .required('This field is required')
    .strict(),
  description: yup
    .string('This fild accepts only string')
    .min(4, 'Too short!')
    .max(255, 'Too long!')
    .required('This field is required')
    .strict(),
});

import { wrapperStyles, containerStyles } from './styles';

const AddBundle = ({ addNewBundleItem, closeAddBundle }) => {
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        name: '',
        description: '',
      },
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        addNewBundleItem(values);
        resetForm();
        closeAddBundle();
      },
    });

  return (
    <>
      <div style={wrapperStyles} onClick={closeAddBundle}>
        <div style={containerStyles} onClick={(e) => e.stopPropagation()}>
          <h3>Add Bundle</h3>
          <form>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Name"
                id="name"
                value={values?.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched?.name && errors?.name}
                helperText={touched?.name && errors?.name}
                name="name"
                type="text"
              />
              <TextField
                label="Description"
                id="description"
                value={values?.description}
                onBlur={handleBlur}
                onChange={handleChange}
                error={touched?.description && errors?.description}
                helperText={touched?.description && errors?.description}
                multiline
                maxRows={4}
                name="description"
                type="text"
              />
              <Button
                disabled={
                  !values?.name ||
                  !values?.description ||
                  errors?.name ||
                  errors?.description
                }
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                ADD
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBundle;
