import React, { useState } from 'react';
import { Button } from '@mui/material';

const AddBundle = (props) => {
  const [newBundle, setNewBundle] = useState('');
  const [isNotEmpty, setIsNotEmpty] = useState(false);

  const wrapp = {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(165, 165, 165, 0.5)',
    position: 'absolute',
    top: '0',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1',
  };
  const container = {
    background: '#bbb',
    display: 'flex',
    flexDirection: 'column',
    border: '2px solid black',
    padding: '10px',
    position: 'relative',
    zIndex: '20',
    borderRadius: '10px',
  };

  const closeAddBundlePanel = () => {
    props.closeAddBundle();
  };

  const inputNewBundleHandler = (event) => {
    setNewBundle(event.target.value);
    if (event.target.value.trim().length > 0) {
      setIsNotEmpty(false);
    }
  };

  const addNewBundle = () => {
    if (newBundle.trim().length > 0) {
      props.addNewBundleItem(newBundle);
      props.closeAddBundle();
      setNewBundle('');
    } else {
      setIsNotEmpty(true);
    }
  };

  return (
    <>
      <div style={wrapp} onClick={closeAddBundlePanel}>
        <div style={container} onClick={(e) => e.stopPropagation()}>
          <h3>Add Bundle</h3>
          <input
            type="text"
            value={newBundle}
            onChange={inputNewBundleHandler}
            style={{ marginBottom: '20px' }}
          ></input>
          {isNotEmpty && <p>Can not be empty!</p>}
          <Button variant="contained" onClick={addNewBundle}>
            ADD
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddBundle;
