import React from 'react';
import { Button } from '@mui/material';

import { removeFromLocalStorage } from '../../utils/localStorage';
import { useHistory } from 'react-router';

const LogoutButton = ({ token, setAuthUser }) => {
  const history = useHistory();
  const handleButtonClick = () => {
    removeFromLocalStorage(token);

    setAuthUser(null);
  };

  return (
    <Button
      variant="contained"
      onClick={() => {
        handleButtonClick();
        history.push('/');
      }}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
