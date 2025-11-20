const config = {
  development: {
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp_dev',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret-key',
      expire: process.env.JWT_EXPIRE || '30d'
    },
    clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
  },
  
  production: {
    mongodb: {
      uri: process.env.MONGODB_URI,
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expire: process.env.JWT_EXPIRE || '30d'
    },
    clientUrl: process.env.CLIENT_URL
  },
  
  test: {
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp_test',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    },
    jwt: {
      secret: 'test-secret-key',
      expire: '1h'
    },
    clientUrl: 'http://localhost:3000'
  }
};

const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];