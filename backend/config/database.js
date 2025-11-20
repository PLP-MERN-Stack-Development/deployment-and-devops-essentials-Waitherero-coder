const mongoose = require('mongoose');
const logger = require('../middleware/logger');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      logger.error('MongoDB connection error: MONGODB_URI is not defined in environment variables');
      logger.info('Database config: Please set MONGODB_URI in your .env file');
      
      // Graceful shutdown
      setTimeout(() => {
        process.exit(1);
      }, 1000);
      return;
    }

    const dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      bufferMaxEntries: 0
    };

    // Connect to MongoDB
    mongoose.connect(process.env.MONGODB_URI, dbOptions)
      .then(() => {
        logger.info('MongoDB connected successfully');
        
        // Log connection info
        const conn = mongoose.connection;
        logger.info(`Database: ${conn.name}`);
        logger.info(`Host: ${conn.host}`);
        logger.info(`Port: ${conn.port}`);
      })
      .catch((err) => {
        logger.error('MongoDB connection error:', err);
        
        // Graceful shutdown on connection error
        setTimeout(() => {
          process.exit(1);
        }, 1000);
      });

    // MongoDB event listeners
    mongoose.connection.on('connected', () => {
      logger.info('Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('Mongoose disconnected from MongoDB');
    });

    // Close Mongoose connection when app is terminated
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });
  }

  // Method to check database health
  async healthCheck() {
    try {
      await mongoose.connection.db.admin().ping();
      return {
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }
}

module.exports = new Database();