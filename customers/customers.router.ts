import * as restify from 'restify'
import { ModuleRouter } from '../common/model-router';
import { Customers, ICustomer } from './customers.model';
import { auth } from '../security/auth';

class CustomersRouter extends ModuleRouter<ICustomer> {
    
    constructor() {
        super(Customers)
    }

    applyRoutes(application: restify.Server) {
        application.get('/customers', [auth('admin'), this.findAll])
        application.get('/customers/:id', [auth('admin'), this.validateId, this.findById])
        application.post('/customers', [auth('admin'), this.save])
        application.put('/customers/:id', [auth('admin'), this.validateId, this.update])
        application.del('/customers/:id', [auth('admin'), this.validateId, this.delete])
    }
}

export const customersRouter = new CustomersRouter();