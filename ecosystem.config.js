module.exports = {
  apps : [{
    name   : "piscineiros-api",
    script : "./dist/main.js",
    instances: 0,
    exec_mode: "cluster",
    watch: true,
    merge_logs: true,
    env: {
      SERVER_PORT: 5000,
      DB_URL: "mongodb://localhost/piscineiros",
      NODE_ENV: "development",
    },
    env_production: {
      SERVER_PORT: 5001,
      NODE_ENV: "production",
    }
  }]
}
