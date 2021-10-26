import React from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';

const Form = ({ ...initialValues }) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <TextField
          id="startTime"
          name="startTime"
          type="time"
          defaultValue="08:00"
          value={formik.values.startTime}
          onChange={formik.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 60,
          }}
        />
        <TextField
          id="endTime"
          type="time"
          defaultValue="08:00"
          value={formik.values.endTime}
          onChange={formik.handleChange}
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
          value={formik.values.tagBundleName}
          onChange={formik.handleChange}
          label="Age"
          sx={{ width: 150 }}
        >
          <MenuItem value="selleo">Selleo</MenuItem>
        </Select>
        <TextField
          value={formik.values.tagName}
          onChange={formik.handleChange}
          id="tagName"
          variant="outlined"
        />
      </Grid>
    </form>
  );
};

export default Form;
