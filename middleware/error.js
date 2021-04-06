//const winston = require('winston');
//const IUXLogger = require('iux-core-node/lib/iux-logger');

module.exports = function (err, req, res, next) {
//  winston.error(err.message, err);
  IUXLogger.error(`SERVER_ERROR: ${err}`);
  res.status(500).json({
    status: 500,
    message: 'SERVER_ERROR',
    error: !!(err.message) ? err.message : err
  });
}