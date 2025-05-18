const r = require('express').Router();
const ctrl = require('../controllers/reservations');
const { checkAuth } = require('../middlewares/auth');

r.post('/', checkAuth, ctrl.create);
r.get('/', checkAuth, ctrl.listUser);
module.exports = r;
