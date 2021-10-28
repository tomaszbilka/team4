import React from 'react';

import { removeFromLocalStorage } from '../../utils/localStorage';

const LogoutButton = ({ token, setAuthUser }) => {
  const handleButtonClick = () => {
    removeFromLocalStorage(token);

    setAuthUser(null);
  };

  return <button onClick={handleButtonClick}>Log Out</button>;
};

export default LogoutButton;
