import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigation } from './layout';
import { Calendar, Bundle, Settings, Login } from './pages';

import { useGetUser } from './api';

function App({ token }) {
  const { username, loading } = useGetUser();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    setAuthUser(username);
  }, [username]);

  return (
    <Router>
      {loading && <div>Loading...</div>}

      {!authUser && <Login token={token} setAuthUser={setAuthUser} />}

      {authUser && (
        <div className="App">
          <Navigation token={token} setAuthUser={setAuthUser} />

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
