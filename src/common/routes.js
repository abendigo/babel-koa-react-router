// import About from './about';
var About = require('./about');
// import App from './app';
var App = require('./app');
// import Dashboard from './dashboard';
var Dashboard = require('./dashboard');
// import Inbox from './inbox';
var Inbox = require('./inbox');

const routes = [
    {path: '/',
        component: App,
        indexRoute: {component: Dashboard},
        childRoutes: [
            {path: 'about', component: About},
            {path: 'inbox', component: Inbox
            // childRoutes: [
            //   { path: '/messages/:id', component: Message },
            //   { path: 'messages/:id',
            //     onEnter: function (nextState, replaceState) {
            //       replaceState(null, '/messages/' + nextState.params.id)
            //     }
            //   }
            // ]
            }
        ]
    }
];

export default routes;
