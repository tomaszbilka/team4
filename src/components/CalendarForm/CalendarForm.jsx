import React, { useEffect } from 'react';
import * as yup from 'yup';
import _isEqual from 'lodash/isEqual';
import { Grid, TextField, Select, MenuItem, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';

import {
  useUpdateEntry,
  useGetProfileBundles,
  useGetTagsByBundle,
} from '../../api';

const validationSchema = yup.object({
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  tagName: yup.string().required(),
  tagBundleName: yup.string().required(),
});

const CalendarForm = ({
  id,
  date,
  tagBundleId,
  allowOnlyFullForm,
  ...initialValues
}) => {
  const { updateEntryById } = useUpdateEntry();
  const { data: assignedBundles } = useGetProfileBundles();
  const { bundleTags, getBundleTags } = useGetTagsByBundle();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: allowOnlyFullForm ? validationSchema : null,
    onSubmit: (values) => {
      if (!_isEqual(values, initialValues)) {
        updateEntryById({
          variables: {
            id,
            record: {
              date,
              ...values,
            },
          },
        });
      }
    },
  });

  const handleTagBundleChange = (e) => {
    setFieldValue('tagName', '');
    handleChange(e);
  };

  const handleAutocompleteOnBlur = async (e) => {
    await setFieldValue(e.target.name, e.target.value);
    handleSubmit(e);
  };

  const customHandleSubmit = (e) => {
    if (allowOnlyFullForm) {
      handleBlur(e);

      for (let valueKey in values) {
        if (!values[valueKey]) {
          return;
        }
      }
    }

    handleSubmit(e);
  };

  useEffect(() => {
    getBundleTags({ variables: { id: tagBundleId } });
  }, []);

  return (
    <form>
      <Grid container spacing={1}>
        <TextField
          id="startTime"
          name="startTime"
          type="time"
          value={values.startTime}
          error={touched.startTime && Boolean(errors.startTime)}
          onChange={handleChange}
          onBlur={customHandleSubmit}
          inputProps={{
            step: 60,
          }}
        />
        <TextField
          id="endTime"
          name="endTime"
          type="time"
          value={values.endTime}
          error={touched.endTime && Boolean(errors.endTime)}
          onChange={handleChange}
          onBlur={customHandleSubmit}
          inputProps={{
            step: 60,
          }}
        />
        <Select
          name="tagBundleName"
          id="tagBundleName"
          value={values.tagBundleName}
          onChange={handleTagBundleChange}
          onBlur={allowOnlyFullForm && customHandleSubmit}
          error={touched.tagBundleName && Boolean(errors.tagBundleName)}
          sx={{ width: 150 }}
        >
          {assignedBundles?.map(({ name, _id: id }) => (
            <MenuItem
              onBlur={() => getBundleTags({ variables: { id } })}
              error={touched.tagBundleName && Boolean(errors.tagBundleName)}
              key={id}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <Autocomplete
          disablePortal
          options={bundleTags || []}
          value={values.tagName}
          error={touched.tagName && Boolean(errors.tagName)}
          disabled={!values.tagBundleName}
          onChange={(_, value) => setFieldValue('tagName', value)}
          onBlur={handleAutocompleteOnBlur}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              id="tagName"
              name="tagName"
              value={values.tagName}
              {...params}
            />
          )}
        />
      </Grid>
    </form>
  );
};

export default CalendarForm;
