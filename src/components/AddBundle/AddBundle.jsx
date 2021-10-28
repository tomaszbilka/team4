import React, { useState } from 'react';
import { Button } from '@mui/material';

import { wrapperStyles, containerStyles } from './styles';

const AddBundle = ({ addNewBundleItem, closeAddBundle }) => {
  const [newBundle, setNewBundle] = useState('');
  const [isNotEmpty, setIsNotEmpty] = useState(false);

  const closeAddBundlePanel = () => {
    closeAddBundle();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    setNewBundle(inputValue);

    if (inputValue.trim().length > 0) {
      setIsNotEmpty(false);
    }
  };

  const handleAddButtonClick = () => {
    if (newBundle.trim().length > 0) {
      addNewBundleItem(newBundle);
      closeAddBundle();
      setNewBundle('');
    } else {
      setIsNotEmpty(true);
    }
  };

  return (
    <>
      <div style={wrapperStyles} onClick={closeAddBundlePanel}>
        <div style={containerStyles} onClick={(e) => e.stopPropagation()}>
          <h3>Add Bundle</h3>
          <input
            type="text"
            value={newBundle}
            onChange={handleInputChange}
            style={{ marginBottom: '20px' }}
          />
          {isNotEmpty && <p>Can not be empty!</p>}
          <Button variant="contained" onClick={handleAddButtonClick}>
            ADD
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBundle;
