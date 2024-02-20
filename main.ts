import { Server } from './server/server';
import { providersRouter } from './providers/providers.router';
import { customersRouter } from './customers/customers.router';

const server = new Server();

server.bootstrap([providersRouter, customersRouter])
    .then(server => {
        console.log('Server is listening on: ', server.application.address())
    }).catch(error => {
        console.log('Server failed to start')
        console.error(error)
        process.exit(1)
    })
