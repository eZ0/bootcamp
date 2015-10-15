var HTTPStatus = require('http-status');

module.exports = function globalErrorHandler(){
    return function handler(err, req, res, next){

        if (err.status) {

            var errorObject = {
                code: err.status,
                message: HTTPStatus[err.status]
            }

            return res.status(err.status).send(errorObject);
        }

        res.status(500).send({
            code: 500,
            message: 'Internal Server Error :(',
            details: err
        });

    }
}
