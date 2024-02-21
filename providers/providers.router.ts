import * as restify from 'restify'
import { ModuleRouter } from '../common/model-router';
import { Provider, IProvider } from './providers.model';
import { authenticate } from '../security/auth-handler';
import { auth } from '../security/auth';

class ProvidersRouter extends ModuleRouter<IProvider> {
    
    constructor() {
        super(Provider)
        this.on('beforeRender', document => {
            document.password = undefined;
        })
    }

    applyRoutes(application: restify.Server) {
        application.get('/providers', [auth('admin'), this.findAll])
        application.get('/providers/:id', [auth('admin'), this.validateId, this.findById])
        application.post('/providers', [auth('admin'), this.save])
        application.put('/providers/:id', [auth('admin'), this.validateId, this.update])
        application.del('/providers/:id', [auth('admin'), this.validateId, this.delete])

        application.post('/providers/authenticate', authenticate)
    }
}

export const providersRouter = new ProvidersRouter();
