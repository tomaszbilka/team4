import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigation } from './layout';
import { Calendar, Bundle, Settings, Login } from './screens';

import { getUserFromLocalStorage } from './utils/localStorage';

const localStorageToken = 'wos-user';

function App() {
  const [authUser, setAuthUser] = useState(
    getUserFromLocalStorage(localStorageToken)
  );

  return (
    <Router>
      {!authUser && (
        <Login setAuthUser={setAuthUser} token={localStorageToken} />
      )}
      {authUser && (
        <div className="App">
          <Navigation setAuthUser={setAuthUser} token={localStorageToken} />

          <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/bundle" component={Bundle} />
            <Route exact path="/" component={Calendar} />
          </Switch>
        </div>
      )}
    </Router>
  );
}

export default App;
