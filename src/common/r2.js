import React from 'react';
import Router from 'react-router';

import App from './app';
import About from './about';
import Dashboard from './dashboard';
import Inbox from './inbox';
import Message from './message';

export default class Marko extends React.Component {
    render() {
        return (
            <Router>
               <Route path='/' component={App}>
                  <IndexRoute component={Dashboard} />
                  <Route path='about' component={About} />
                  <Route path='inbox' component={Inbox}>
                    <Route path='/messages/:id' component={Message} />

                    {/* Redirect /inbox/messages/:id to /messages/:id */}
                    <Redirect from='messages/:id' to='/messages/:id' />
                  </Route>
                </Route>
            </Router>
        );
    }
}
