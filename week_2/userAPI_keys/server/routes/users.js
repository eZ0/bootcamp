var express = require('express');
var router = express.Router();
var validator = require('../middleware/requestValidator');
var userController = require('../controllers/usercontroller');
var keyController = require('../controllers/keycontroller');
var authController = require('../controllers/authcontroller');


// var UserModel = require('../models/user');
// var userMapper = require('../mappers/userMapper');

var userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 10, optional: false },
        email: { type: 'string', pattern: 'email', optional: false },
        age: { type: 'number', optional: true },
        address: { type: 'string', optional: true },
        city: { type: 'string', optional: true },
        zip: { type: 'string', optional: true },
    }
};

// GET /api/users?page=0&pageSize=20&sort=+age
router.get('/', userController.findAll);

// GET /api/users/123
router.get('/:id', userController.findOne);

// PUT /api/users/123
router.put('/:id', validator(userSchema), userController.update);

// POST /api/users
router.post('/', validator(userSchema), userController.create);

// DELETE /api/users/12213
router.delete('/:id', userController.delete);

// ~~~ APIkey - create ~~~

// POST /api/users/123/keys/
router.post('/:id/keys', keyController.create);

// DELETE /api/users/123/keys/name
router.delete('/:id/keys/:name', keyController.delete);

// GET /api/users/123/keys
router.get('/:id/keys', keyController.findAll);

// ~~~ APIkey - auth - token ~~~

// POST /api/auth/authenticate/
// request : { apiKey : '6597976967'}
// response: { accessToken: '212312312ww2131eqwe1', 'type': 'bearer'}
router.post('/auth/authenticate', authController.create);

module.exports = router;
