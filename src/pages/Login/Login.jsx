import React, { useState } from 'react';

import { setToLocalStorage } from '../../utils/localStorage';

const Login = ({ token, setAuthUser }) => {
  const [inputValue, setInputValue] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setToLocalStorage(token, inputValue);
    setAuthUser(inputValue);
  };

  const handleInputOnChange = (e) => setInputValue(e.target.value);

  return (
    <form onSubmit={handleLogin}>
      <input onChange={handleInputOnChange} value={inputValue} type="text" />
      <button>Log In</button>
    </form>
  );
};

export default Login;
