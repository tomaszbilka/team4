import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

import { setToLocalStorage } from '../../utils/localStorage';

const imgStyle = {
  width: '100px',
  float: 'right',
};

const Login = ({ token, setAuthUser }) => {
  const [inputValue, setInputValue] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    setToLocalStorage(token, inputValue);
    setAuthUser(inputValue);
  };

  const handleInputOnChange = (e) => setInputValue(e.target.value);

  return (
    <Container maxWidth="xs" style={{ marginTop: '20vh' }}>
      <Typography
        sx={{ fontSize: 28 }}
        color="text.secondary"
        style={{ textAlign: 'center' }}
        gutterBottom
      >
        WORKLOG
      </Typography>
      <Card sx={{ minHeight: 375 }}>
        <form onSubmit={handleLogin}>
          <CardContent>
            <img
              style={imgStyle}
              src="https://media.designrush.com/agencies/80874/conversions/Selleo-logo-profile.jpg"
              alt="selleo login"
            />
            <Typography
              sx={{ fontSize: 28 }}
              color="text.secondary"
              gutterBottom
            >
              Log In
            </Typography>
            <TextField
              id="outlined-basic"
              label="user name"
              variant="outlined"
              onChange={handleInputOnChange}
              value={inputValue}
              style={{ marginTop: '10vh', width: '100%' }}
            />
          </CardContent>
          <CardActions>
            <Button
              size="big"
              variant="contained"
              type="submit"
              fullWidth="true"
              style={{ marginTop: '16vh' }}
            >
              LogIn
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
