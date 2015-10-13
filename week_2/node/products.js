var express = require('express');
var router = express.Router();

router.get('/', function(request, response, next){ //op url api/products
    response.send('products from sample');
});

module.exports = router;
