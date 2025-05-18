const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/role');
const ctrl = require('../controllers/admin');

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rutas de administración
 */
/**
 * @swagger
 * /api/admin/reservations:
 *   get:
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todas las reservas
 */
router.get('/reservations', checkAuth, checkRole('admin'), ctrl.list);

/**
 * @swagger
 * /api/admin/reservations/{id}:
 *   delete:
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Reserva eliminada
 */
router.delete('/reservations/:id', checkAuth, checkRole('admin'), ctrl.remove);
module.exports = router;
