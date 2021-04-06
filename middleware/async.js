//const IUXLogger = require('iux-core-node/lib/iux-logger');

module.exports = function (handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }catch(ex) {
//            IUXLogger.error(`INTERNAL_SERVER_ERROR: ${ex}`);
            next(ex); // pass control to the next middleware function
        }
    };
}