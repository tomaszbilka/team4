import React, { useState } from 'react';
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const user = localStorage.getItem('wos-user');
const Header = ({ token, setAuthUser }) => {
  const [active, setActive] = useState(1);

  const calendarActiveHandler = () => {
    setActive(1);
  };
  const bundleActiveHandler = () => {
    setActive(2);
  };
  const settingsActiveHandler = () => {
    setActive(3);
  };

  return (
    <>
      <div style={wrapp}>
        <Tabs aria-label="nav tabs example" style={{ position: 'relative' }}>
          <Link to="/" style={linkStyle}>
            <LinkTab
              label="Kalendarz"
              {...a11yProps(0)}
              onClick={calendarActiveHandler}
              style={{ color: active === 1 ? 'blue' : '' }}
            />
          </Link>
          <Link to="/bundle" style={linkStyle}>
            <LinkTab
              label="Bundle"
              {...a11yProps(1)}
              onClick={bundleActiveHandler}
              style={{ color: active === 2 ? 'blue' : '' }}
            />
          </Link>
          <Link to="/settings" style={linkStyle}>
            <LinkTab
              label="Ustawienia"
              {...a11yProps(2)}
              onClick={settingsActiveHandler}
              style={{ color: active === 3 ? 'blue' : '' }}
            />
          </Link>
        </Tabs>
        <Typography>Planer | {JSON.parse(user)}</Typography>
        <LogoutButton setAuthUser={setAuthUser} token={token} />
      </div>
    </>
  );
};

export default Header;
