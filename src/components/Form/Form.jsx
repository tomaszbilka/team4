import React from 'react';
import { Grid, TextField, Select, MenuItem, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useUpdateEntry } from '../../mutations';
import { useGetTagBundles, useGetTagByBundle } from '../../queries';

const validationSchema = yup.object({
  startTime: yup.date().required(),
  endTime: yup.string().required(),
  date: yup.string().required(),
  tagName: yup.string().required(),
  tagBundleName: yup.string().required(),
});

const Form = ({ id, ...initialValues }) => {
  const { updateEntryById } = useUpdateEntry();
  const { data } = useGetTagBundles();
  const { bundleTags, getBundleTags } = useGetTagByBundle();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      updateEntryById({
        variables: {
          id,
          record: {
            date: initialValues.date,
            ...values,
          },
        },
      });
    },
  });

  return (
    <form>
      <Grid container spacing={1}>
        <TextField
          id="startTime"
          name="startTime"
          type="time"
          value={values.startTime}
          onChange={handleChange}
          onBlur={handleSubmit}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 60,
          }}
        />
        <TextField
          id="endTime"
          name="endTime"
          type="time"
          value={values.endTime}
          onChange={handleChange}
          onBlur={handleSubmit}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 60,
          }}
        />
        <Select
          name="tagBundleName"
          id="tagBundleName"
          value={values.tagBundleName}
          onChange={handleChange}
          sx={{ width: 150 }}
        >
          {data?.tagBundleMany?.map(({ name, _id: id }) => (
            <MenuItem
              onBlur={() => getBundleTags({ variables: { id } })}
              key={id}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <Autocomplete
          name="tagName"
          id="tagName"
          disablePortal
          options={bundleTags || []}
          value={values.tagName}
          onBlur={handleSubmit}
          disabled={!values.tagBundleName}
          onChange={(_, value) => setFieldValue('tagName', value)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField name="tagName" {...params} />}
        />
      </Grid>
    </form>
  );
};

export default Form;
