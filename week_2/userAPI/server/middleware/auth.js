
module.exports = function (password) {
    return function authorization(req, res, next) {

        var basicAuth = req.headers.authorization;
        var index = basicAuth.indexOf(" ");
        var basic64 = basicAuth.substr(index + 1);
        var decodedString = new Buffer(basic64, 'base64');
        decodedString = decodedString.toString();
        var decIndex = decodedString.indexOf(":");
        var username = decodedString.substr(0, decIndex);
        var passwordDec = decodedString.substr(decIndex+1);

        console.log('Username: ' + username);

        req.username = username;

        if (req.headers.authorization) {
            if (passwordDec === password) {
                return next();
            }
        }
        next(error(401));
    }
}

function error(status){
    var error = new Error("An error occured");
    error.status = status;
    return error;
}
