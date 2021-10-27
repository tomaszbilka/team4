import React, { useEffect, useState } from 'react';
/* eslint-disable */
import { Grid, TextField, Select, MenuItem, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';

import { useUpdateEntry } from '../../mutations';
import { useGetTagBundles, useGetTagByBundle } from '../../queries';

const findBundle = (bundleList, bundleName) =>
  bundleList.find(({ name }) => name === bundleName);

const Form = ({ id, ...initialValues }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const { updateEntryById } = useUpdateEntry();
  const { data } = useGetTagBundles();
  const { bundleTags, getBundleTags } = useGetTagByBundle();
  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues,
  });

  const handleOnBlur = (requiredField) => (e) => {
    e.target.value &&
      updateEntryById({
        variables: {
          id,
          record: {
            [e.target.name]: e.target.value,
            [requiredField]: values[requiredField],
          },
        },
      });

    setFieldValue(e.target.name, e.target.value)
  };

  const handleTagBundleChange = (e) => {
    setFieldValue('tagName', '');
    handleChange(e);
  };

  const handleTagBundleOnBlur = (e) => {
    console.dir(e.target)
  }

  useEffect(() => {
    const bundleList = data?.tagBundleMany;

    if (bundleList) {
      const activeBundle = findBundle(bundleList, values?.tagBundleName) || {
        name: '',
        tags: [],
      };

      const tagNameList = activeBundle?.tags?.map(({ name, _id }) => ({
        label: name,
        id: _id,
      }));

      setAvailableTags(tagNameList);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <TextField
          id="startTime"
          name="startTime"
          type="time"
          value={values.startTime}
          onBlur={handleOnBlur()}
          onChange={handleChange}
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
          onBlur={handleOnBlur()}
          onChange={handleChange}
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
          onChange={handleTagBundleChange}
          onBlur={handleTagBundleOnBlur}
          sx={{ width: 150 }}
        >
          {data?.tagBundleMany?.map(({ name, _id: bundleId }) => (
            <MenuItem key={bundleId} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
        <Autocomplete
          disablePortal
          options={availableTags}
          value={values.tagName}
          onChange={(_, value) => setFieldValue('tagName', value)}
          onBlur={handleOnBlur('tagBundleName')}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              id="tagName"
              name="tagName"
              {...params}
            />
          )}
        />
        {/* <TextField
          value={values.tagName}
          onBlur={handleOnBlur('tagBundleName')}
          onChange={handleChange}
          disabled={!values.tagBundleName}
          id="tagName"
          name="tagName"
          variant="outlined"
        /> */}
      </Grid>
    </form>
  );
};

export default Form;
