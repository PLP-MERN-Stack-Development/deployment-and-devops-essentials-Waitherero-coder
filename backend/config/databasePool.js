const mongoose = require('mongoose');

// Connection pool settings
const connectionPoolSettings = {
  // Maximum number of sockets the MongoDB driver can keep open for this connection
  maxPoolSize: 10,
  
  // Minimum number of sockets the MongoDB driver will keep open for this connection
  minPoolSize: 5,
  
  // How long a connection can stay idle in the pool before being removed
  maxIdleTimeMS: 30000,
  
  // Server selection timeout
  serverSelectionTimeoutMS: 5000,
  
  // Socket timeout
  socketTimeoutMS: 45000,
  
  // Keep the connection alive
  keepAlive: true,
  keepAliveInitialDelay: 300000
};

// Monitor connection pool events
mongoose.connection.on('connectionCreated', () => {
  console.log('🆕 New database connection created');
});

mongoose.connection.on('connectionReady', () => {
  console.log('✅ Database connection ready');
});

mongoose.connection.on('connectionClosed', () => {
  console.log('🔒 Database connection closed');
});

mongoose.connection.on('connectionCheckOutStarted', () => {
  console.log('📥 Connection checked out from pool');
});

mongoose.connection.on('connectionCheckOutFailed', () => {
  console.error('❌ Failed to check out connection from pool');
});

mongoose.connection.on('connectionCheckedIn', () => {
  console.log('📤 Connection returned to pool');
});

module.exports = connectionPoolSettings;