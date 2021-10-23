import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navigation } from './layout';
import { Calendar, Bundle, Settings } from './screens';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <Switch>
          <Route path="/settings" component={Settings} />
          <Route path="/bundle" component={Bundle} />
          <Route exact path="/" component={Calendar} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
