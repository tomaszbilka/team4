import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

import { Navigation } from './layout';
import { Calendar, Bundle, Settings, Login } from './pages';

import { useGetUser } from './api';
import { Card, BundleDetails } from './components/';

function App({ token }) {
  const { username, loading } = useGetUser({ auth: true });
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    setAuthUser(username);
  }, [username]);

  if (loading) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <CircularProgress />;
      </Grid>
    );
  }

  return (
    <Router>
      {!authUser && <Login token={token} setAuthUser={setAuthUser} />}

      {authUser && (
        <div className="App">
          <Card>
            <Navigation token={token} setAuthUser={setAuthUser} />
          </Card>
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
