import React from 'react';

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';


React.render((
          <Router history={history}>
            <Route path="/" component={App}>
              <Route path="about" component={About}/>
              <Route path="users" component={Users}>
                <Route path="/user/:userId" component={User}/>
              </Route>
              <Route path="*" component={NoMatch}/>
            </Route>
          </Router>
        ),document.getElementById(''));
