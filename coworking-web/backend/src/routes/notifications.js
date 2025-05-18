const router = require('express').Router();
const { z } = require('zod');
const validate = require('../middlewares/validate');
const { checkAuth } = require('../middlewares/auth');
const ctrl = require('../controllers/notifications');

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notificaciones de reservas
 */
/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificaciones
 */
router.get('/', checkAuth, ctrl.list);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservation_id:
 *                 type: integer
 *               type:
 *                 type: string
 *             required: [reservation_id, type]
 *     responses:
 *       201:
 *         description: Notificación creada
 */
router.post(
  '/',
  checkAuth,
  validate(z.object({ reservation_id: z.number().int(), type: z.string() })),
  ctrl.create
);

module.exports = router;
