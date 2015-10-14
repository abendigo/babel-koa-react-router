import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import {createHistory} from 'history';

import routes from './common/routes.js';

ReactDOM.render(<Router history={createHistory()} routes={routes} />,
    document.getElementById('app'));
