import React from 'react';
import { Box, IconButton, Button } from '@mui/material';
import { AddCircleRounded } from '@mui/icons-material';

const EntryListController = ({
  handleOnlyFullFormButtonClick,
  onlyFullForm,
  addNewEntry,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Button
          variant="contained"
          disabled={onlyFullForm}
          onClick={handleOnlyFullFormButtonClick}
        >
          Accept only full form
        </Button>
        <Button
          variant="contained"
          disabled={!onlyFullForm}
          onClick={handleOnlyFullFormButtonClick}
        >
          Accept partially filled form
        </Button>
      </Box>

      <IconButton
        onClick={addNewEntry}
        sx={{
          alignSelf: 'flex-end',
          marginRight: '4.7em',
          fontSize: '30px',
        }}
      >
        <AddCircleRounded fontSize="inherit" color="success" />
      </IconButton>
    </Box>
  );
};

export default EntryListController;
