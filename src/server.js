import koaStatic from 'koa-static';
import koa from 'koa';

import {match, RoutingContext} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import routes from './common/routes';

function template(app) {
    return `<!DOCTYPE html>
        <html>
            <head>
                <script src='/vendor.js'></script>
            </head>
            <body>
                <div id='app'>${app}</div>
                <script src='/bundle.js'></script>
            </body>
        </html>`;
}

var app = koa();

app.use(function*(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('logging %s %s - %s', this.method, this.url, ms);
});

app.use(function* (next) {
    let notFound = false;
    match({routes: routes,
           location: this.url}, function(error, redirect, props) {
        if (error) {
            this.throw(error.message);
        } else if (redirect) {
            this.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            this.body = template(ReactDOMServer.renderToString(
                React.createElement(RoutingContext, props)));
        } else {
            notFound = true;
        }
    }.bind(this));

    if (notFound) {
        yield next;
    }
});

app.use(koaStatic('dist'));

app.listen(3001);
