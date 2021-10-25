import React from 'react';
import { Link } from 'react-router-dom';

import { LogoutButton } from '../../components';

const Header = ({ token, setAuthUser }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Kalendarz</Link>
        </li>
        <li>
          <Link to="/bundle">Bundle</Link>
        </li>
        <li>
          <Link to="/settings">Ustawienia</Link>
        </li>
        <li>
          <LogoutButton setAuthUser={setAuthUser} token={token} />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
