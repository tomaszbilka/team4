import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Calendar from './Screens/Calendar';
import Bundle from './Screens/Bundle';
import Settings from './Screens/Settings';

import MainLayout from './Layouts/MainLayout';

function App() {
  return (
    <>
      <MainLayout>
        <Router>
          <div>
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

            <Switch>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/bundle">
                <Bundle />
              </Route>
              <Route path="/">
                <Calendar />
              </Route>
            </Switch>
          </div>
        </Router>
      </MainLayout>
    </>
  );
}

export default App;
