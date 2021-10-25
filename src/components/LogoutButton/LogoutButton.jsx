import React from 'react';

import { removeUserFromLocalStorage } from '../../utils/localStorage';

const LogoutButton = ({ token, setAuthUser }) => {
  const handleButtonClick = () => {
    removeUserFromLocalStorage(token);

    setAuthUser(null);
  };

  return <button onClick={handleButtonClick}>Log Out</button>;
};

export default LogoutButton;
