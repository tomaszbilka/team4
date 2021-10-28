import React from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';

const DateController = ({ setPreviousDay, setNextDay, today, setToday }) => {
  const handleDatePickerChange = (e) => setToday(new Date(e.target.value));

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={setPreviousDay}>
          <KeyboardArrowLeftRounded color="info" />
        </IconButton>
        <h1>
          {today?.toLocaleDateString('pl-pl', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </h1>
        <IconButton onClick={setNextDay}>
          <KeyboardArrowRightRounded color="info" />
        </IconButton>
      </Box>

      <TextField
        id="date"
        name="date"
        type="date"
        value={today.toISOString().split('T')[0]}
        onChange={handleDatePickerChange}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
};

export default DateController;
