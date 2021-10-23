import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
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
      </ul>
    </nav>
  );
};

export default Header;
