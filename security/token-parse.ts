import * as restify from 'restify';
import * as jwt from 'jsonwebtoken';
import { Provider } from '../providers/providers.model';
import { environment } from '../common/environment';

export const tokenParser: restify.RequestHandler = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment.security.apiSecret, applyBearer(req, next))
    } else {
        next()
    }
}

function extractToken(req: restify.Request) {
    let token: string;
    const authorization = req.header('authorization');
    if (authorization) {
        const parts: string[] = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }

    return token
}

function applyBearer(req: restify.Request, next): (error, decoded) => void {
    return (error, decoded) => {
        if (decoded) {
            Provider.findByEmail(decoded.sub).then(provider => {
                if (provider) {
                    req.authenticated = provider
                }
                next()
            }).catch(next)
        } else {
            next()
        }
    }
}