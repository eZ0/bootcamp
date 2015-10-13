var config = require('./config.development');

config.env = 'test';
config.hostname = 'test.example';

config.port = 4040;

module.exports = config;
