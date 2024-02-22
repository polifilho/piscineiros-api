import * as bunnyan from 'bunyan';
import { environment } from './environment';


export const logger = bunnyan.createLogger({
    name: environment.log.name,
    level: (<any>bunnyan).resolveLevel(environment.log.level)
})