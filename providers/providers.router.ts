import * as restify from 'restify'
import { ModuleRouter } from '../common/model-router';
import { Provider, IProvider } from './providers.model';

class ProvidersRouter extends ModuleRouter<IProvider> {
    
    constructor() {
        super(Provider)
        this.on('beforeRender', document => {
            document.password = undefined;
        })
    }

    applyRoutes(application: restify.Server) {
        application.get('/providers', this.findAll)
        application.get('/providers/:id', [this.validateId, this.findById])
        application.post('/providers', this.save)
        application.put('/providers/:id', [this.validateId, this.update])
        application.del('/providers/:id', [this.validateId, this.delete])
    }
}

export const providersRouter = new ProvidersRouter();
