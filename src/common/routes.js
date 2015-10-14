var About = require('./about');
var App = require('./app');
var Dashboard = require('./dashboard');
var Inbox = require('./inbox');
var Message = require('./message');

const routes = [
    {path: '/',
        component: App,
        indexRoute: {component: Dashboard},
        childRoutes: [
            {path: 'about', component: About},
            {path: 'inbox', component: Inbox,
             childRoutes: [
               {path: '/messages/:id', component: Message},
               {path: 'messages/:id',
                 onEnter: function(nextState, replaceState) {
                     replaceState(null, '/messages/' + nextState.params.id);
                 }
               }
             ]
            }
        ]
    }
];

export default routes;
