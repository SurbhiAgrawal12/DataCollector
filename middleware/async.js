module.exports = function asyncMiddleware(handler) {
    return async (req, res, next) => {
        try{
            await handler(req, res);
        }catch(ex) {
            next(ex); // pass control to the next middleware function
        }
    };
}