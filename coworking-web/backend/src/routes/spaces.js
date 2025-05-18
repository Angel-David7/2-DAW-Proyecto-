const r = require('express').Router();
const ctrl = require('../controllers/spaces');
const { checkAuth } = require('../middlewares/auth');

r.get('/', checkAuth, ctrl.list);
module.exports = r;
