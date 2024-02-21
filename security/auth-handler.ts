import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import { NotAuthorizedError } from 'restify-errors';
import { Provider } from '../providers/providers.model';
import { environment } from '../common/environment';

export const authenticate: restify.RequestHandler = (req, resp, next) => {
    const { email, password } = req.body;
    Provider.findByEmail(email, '+password').then(provider => {
        if (provider && provider.matches(password)) {
            const token = jwt.sign({sub: provider.email, iss: 'piscineiros-api'}, environment.security.apiSecret, { expiresIn: '12h' })
            resp.json({name: provider.name, email: provider.email, accessToken: token})
            return next(false)
        } else {
            return next(new NotAuthorizedError('Invalid Credentials'))
        }
    }).catch(next)

}
