import React from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';

const Form = ({ ...initialValues }) => {
  const { values, errors, touched, handleChange, setFieldValue } = useFormik({
    initialValues,
  });

  const handleTagBundleChange = (e) => {
    setFieldValue('tagName', '');
    handleChange(e);
  };

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
          inputProps={{
            step: 60,
          }}
        />
        <Select
          name="tagBundleName"
          id="tagBundleName"
          value={values.tagBundleName}
          onChange={handleTagBundleChange}
          sx={{ width: 150 }}
        >
          <MenuItem value="selleo">selleo</MenuItem>
          <MenuItem value="selleo2">selleo2</MenuItem>
        </Select>
        <TextField
          value={values.tagName}
          onChange={handleChange}
          disabled={!values.tagBundleName}
          id="tagName"
          name="tagName"
          variant="outlined"
        />
      </Grid>
    </form>
  );
};

export default Form;
