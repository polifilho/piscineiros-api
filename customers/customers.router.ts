import * as restify from 'restify'
import * as mongoose from 'mongoose'
import { ModuleRouter } from '../common/model-router';
import { Customers, ICustomer } from './customers.model';

class CustomersRouter extends ModuleRouter<ICustomer> {
    
    constructor() {
        super(Customers)
    }

    applyRoutes(application: restify.Server) {
        application.get('/customers', this.findAll)
        application.get('/customers/:id', [this.validateId, this.findById])
        application.post('/customers', this.save)
        application.put('/customers/:id', [this.validateId, this.update])
        application.del('/customers/:id', [this.validateId, this.delete])
    }
}

export const customersRouter = new CustomersRouter();