module.exports = {
    user: 'SA',
    password: '<Password$1234>',
    database: "womenDB",
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}