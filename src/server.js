import favicon from 'koa-favicon';
import koa from 'koa';

import {match, RoutingContext} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import routes from './common/routes';

var app = koa();

app.use(favicon(__dirname + '/favicon.ico'));

app.use(function* (next) {
    if ('/foo' !== this.path) {
        return yield next;
    }

    this.body = 'foo';
});

app.use(function* (next) {
    console.log('url', this.url);
    match({routes: routes, location: this.url}, function(error, redirect, props) {
        if (error) {
            this.throw(error.message);
        } else if (redirect) {
            this.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            this.body = ReactDOMServer.renderToString(React.createElement(RoutingContext, props));
        } else {
            this.body = 'wow, how did that happen?';
        }
    }.bind(this));
});

app.listen(3001);
