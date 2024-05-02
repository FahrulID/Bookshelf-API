'use strict';

const Hapi = require('@hapi/hapi');
const routes = require('./routes')
const BooksRepository = require('./repository/books.repository');
const process = require('process');

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    routes.forEach((route) => {
        server.route(route);
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();