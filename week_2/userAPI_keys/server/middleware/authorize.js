var HttpError = require('../HttpError');

module.exports = function authorization(password) {
    return function authorization(req, res, next) {
        if (req.headers.authorization === password) {
            req.user = {
                id: 1221321,
                name: 'peter',
                role: 'admin'
            }
            return next();
        }
        // token mee sturen in de header
        if (req.headers.authorization === token){
            //decode token
            var decoded = jwt.decode(token, secret);

            //check if token is valid

        }
        next(new HttpError(401));
    }
}
