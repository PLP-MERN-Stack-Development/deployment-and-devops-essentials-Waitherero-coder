const morgan = require('morgan');
const logger = require('./logger');

// Skip successful requests in test environment
const skipSuccess = (req, res) => {
  return process.env.NODE_ENV === 'test' && res.statusCode < 400;
};

// Morgan token for request body (only for development)
morgan.token('body', (req) => {
  if (process.env.NODE_ENV === 'development' && req.body) {
    return JSON.stringify(req.body);
  }
  return '';
});

// Development format
const devFormat = ':method :url :status :response-time ms - :res[content-length] :body';

// Production format
const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

const requestLogger = morgan(process.env.NODE_ENV === 'production' ? prodFormat : devFormat, {
  stream: logger.stream,
  skip: skipSuccess
});

module.exports = requestLogger;