import { Provider } from "./providers/providers.model";

declare module 'restify' {
    export interface Request {
        authenticated: Provider
    }
}