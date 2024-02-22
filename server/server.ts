import * as fs from 'fs';
import * as restify from 'restify'
import * as mongoose from 'mongoose';
import { environment } from '../common/environment';
import { Router } from '../common/router';
import { handleError } from './handler-error';
import { tokenParser } from '../security/token-parse';
import { logger } from '../common/logger';

export class Server {
	// attributes
	application:  restify.Server

	// methods
	initDB() {
		(<any>mongoose).Promise = global.Promise
		return mongoose.connect(environment.db.url)
	}

	initRoutes(routers: Router[]): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				const options: restify.ServerOptions = {
					name: 'brum-api',
					version: '1.0.0',
					log: logger
				}

				if (environment.security.enableHTTPS) {
					options.certificate = fs.readFileSync('./security/keys/cert.pem');
					options.key = fs.readFileSync('./security/keys/key.pem');
				}

				// creating server
				this.application = restify.createServer(options)

				// it will prepare the logger for each request
				this.application.pre(restify.plugins.requestLogger({
					log: logger
				}))

				// plugins
				this.application.use(restify.plugins.queryParser())
				this.application.use(restify.plugins.bodyParser())
				this.application.use(tokenParser)

				for (let router of routers) {
					router.applyRoutes(this.application)
				}

				this.application.listen(environment.server.port, () => {
					resolve(this.application)
				})
				
				this.application.on('restifyError', handleError)
			} catch (error) {
				reject(error)
			}
		})
	}

	bootstrap(routers: Router[] = []): Promise<Server>{
		return this.initDB().then(() => this.initRoutes(routers).then(() => this))
	}
}
