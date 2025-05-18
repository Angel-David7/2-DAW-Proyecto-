const r = require('express').Router();
const ctrl = require('../controllers/admin');
const { checkAuth } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/role');

r.get('/reservations', checkAuth, checkRole('admin'), ctrl.list);
r.delete('/reservations/:id', checkAuth, checkRole('admin'), ctrl.remove);
module.exports = r;
