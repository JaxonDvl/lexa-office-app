module.exports = {
    apps : [
        {
          name: "lexa-app",
          script: "server/index.js",
          watch: true,
          env: {
              "PORT": 3667,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 3667,
              "MONGODB_URI" : "mongodb://0.0.0.0:27017/testDb1",
              "NODE_ENV": "production",
          }
        }
    ]
  }
