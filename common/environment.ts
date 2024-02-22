export const environment = {
    server: {
        port: process.env.SERVER_PORT || 3000
    },    
    db: {
        url: process.env.URL || 'mongodb://localhost/piscineiros'
    },
    security: {
        saltRounds: process.env.SALT_ROUNDS || 10,
        apiSecret: process.env.API_SECRET || 'piscineiros-api-secret',
        enableHTTPS: process.env.ENABLE_HTTPS || false,
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug',
        name: 'piscineiros-api-logger'
    }
}