const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');
const ctrl = require('../controllers/notifications');

// Todas las rutas requieren autenticación
router.use(checkAuth);

// GET   /api/notifications       → listar notificaciones propias
router.get('/', ctrl.list);

// POST  /api/notifications      → crear notificación simulada
router.post('/', ctrl.create);

module.exports = router;
