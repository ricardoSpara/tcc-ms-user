const { Router } = require('express');
const UserController = require('./controllers/user-controller');

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

module.exports = routes;