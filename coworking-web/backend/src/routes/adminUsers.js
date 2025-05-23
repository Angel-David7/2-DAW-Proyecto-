
const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');
const { checkRole } = require('../middlewares/role');
const ctrl = require('../controllers/adminUsers');

/**
 * @swagger
 * tags:
 *   - name: AdminUsers
 *     description: Gestión y validación de usuarios
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     tags: [AdminUsers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get(
  '/users',
  checkAuth,
  checkRole('admin'),
  ctrl.list
);

/**
 * @swagger
 * /api/admin/users/{id}/validate:
 *   patch:
 *     tags: [AdminUsers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a validar
 *     responses:
 *       200:
 *         description: Usuario validado
 */
router.patch(
  '/users/:id/validate',
  checkAuth,
  checkRole('admin'),
  ctrl.validate
);

module.exports = router;
