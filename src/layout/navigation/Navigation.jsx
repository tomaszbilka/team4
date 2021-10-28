import React from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '../../components';
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';
import { Typography } from '@mui/material';

const linkStyle = {
  textDecoration: 'none',
  color: 'gray',
};

const wrapp = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const user = localStorage.getItem('wos-user');
const Header = ({ token, setAuthUser }) => {
  return (
    <>
      <div style={wrapp}>
        <Tabs aria-label="nav tabs example" style={{ position: 'relative' }}>
          <Link to="/" style={linkStyle}>
            <LinkTab label="Kalendarz" />
          </Link>
          <Link to="/bundle" style={linkStyle}>
            <LinkTab label="Bundle" />
          </Link>
          <Link to="/settings" style={linkStyle}>
            <LinkTab label="Ustawienia" />
          </Link>
        </Tabs>
        <Typography>Planer | {JSON.parse(user)}</Typography>
        <LogoutButton setAuthUser={setAuthUser} token={token} />
      </div>
    </>
  );
};

export default Header;
