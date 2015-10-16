import koaStatic from 'koa-static';
import koa from 'koa';

import {match, RoutingContext} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import routes from './common/routes';
import templates from './templates';

var app = koa();

app.use(function*(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log(`-- ${this.method} ${this.url} - ${ms}`);
});

if (app.env === 'development') {
    app.use(require('koa-livereload')());

    require('livereload').createServer().watch('dist');
}

app.use(function* (next) {
    let notFound = false;
    match({routes: routes,
           location: this.url}, function(error, redirect, props) {
        if (error) {
            this.throw(error.message);
        } else if (redirect) {
            this.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            this.body = templates.index(ReactDOMServer.renderToString(
                React.createElement(RoutingContext, props)));
        } else {
            notFound = true;
        }
    }.bind(this));

    if (notFound) {
        yield next;
    }
});

app.use(koaStatic('dist/browser'));

app.listen(3001);
