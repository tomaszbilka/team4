import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Calendar, Bundle, Settings } from './screens';

import MainLayout from './layouts/MainLayout';

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
