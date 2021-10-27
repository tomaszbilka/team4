import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigation } from './layout';
import { Calendar, Bundle, Settings, Login } from './Screens';

import { useGetUser } from './queries';
import { BundleDetails } from './components/bundleDetails';
import { Card } from './components/Card';

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
          <Card>
            <Switch>
              <Route path="/settings" component={Settings} />
              <Route path="/bundle/:id" component={BundleDetails} />
              <Route exact path="/bundle" component={Bundle} />
              <Route exact path="/" component={Calendar} />
            </Switch>
          </Card>
        </div>
      )}
    </Router>
  );
}

export default App;
