const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/role');
const ctrl = require('../controllers/admin');

/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Endpoints de administración
 */

/**
 * @swagger
 * /api/admin/reservations:
 *   get:
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Elementos por página
 *     responses:
 *       200:
 *         description: Lista paginada de todas las reservas
 */
router.get(
  '/reservations',
  checkAuth,
  checkRole('admin'),
  ctrl.list
);

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
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada
 */
router.delete(
  '/reservations/:id',
  checkAuth,
  checkRole('admin'),
  ctrl.remove
);

module.exports = router;

