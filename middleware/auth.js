const OktaJwtVerifier = require('@okta/jwt-verifier')
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.ISSUER,
});

module.exports = async(err, req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN',
                error: 'You must send an Authorization header'
            });
        }

        const [authType, token] = authorization.split(' ')
        if (authType !== 'Bearer') {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN',
                error: 'Expected a Bearer token'
            });
        }

        let jwt = await oktaJwtVerifier.verifyAccessToken(token);
        req.jwt = jwt;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'UNAUTHORIZED',
            error: error.message
        })
    }
}