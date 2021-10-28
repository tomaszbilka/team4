import React from 'react';
import { Button } from '@mui/material';

import { removeFromLocalStorage } from '../../utils/localStorage';

const LogoutButton = ({ token, setAuthUser }) => {
  const handleButtonClick = () => {
    removeFromLocalStorage(token);

    setAuthUser(null);
  };

  return (
    <Button variant="contained" onClick={handleButtonClick}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
