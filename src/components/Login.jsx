import React, { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import '../styles/styles.css';

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const userNameChangeHandler = (event) => {
    const inputedText = event.target.value;
    setUserName(inputedText);
    if (inputedText.trim().length !== 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const loginHandler = () => {
    //check if user exist in db
    props.userLoginHandler(userName);
    setIsValid(false);
    setUserName('');
  };

  return (
    <div className="login">
      <TextField
        id="outlined-basic"
        label="username"
        variant="outlined"
        value={userName}
        onChange={userNameChangeHandler}
      />
      <Button
        variant="contained"
        id="login-button"
        className={!isValid ? 'login-button-disable' : ''}
        onClick={loginHandler}
        disabled={!isValid}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
