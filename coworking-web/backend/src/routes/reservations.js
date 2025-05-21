const router = require('express').Router();
const { z } = require('zod');
const validate = require('../middlewares/validate');
const { checkAuth } = require('../middlewares/auth');
const ctrl = require('../controllers/reservations');

/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: Reservas de espacios
 */

/**
 * @swagger
 * /api/reservations:
 *   post:
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               space_id:
 *                 type: integer
 *               start_time:
 *                 type: string
 *                 format: date-time
 *               end_time:
 *                 type: string
 *                 format: date-time
 *             required: [space_id, start_time, end_time]
 *     responses:
 *       200:
 *         description: Reserva creada
 */
router.post(
  '/',
  checkAuth,
  validate(z.object({
    space_id: z.number().int(),
    start_time: z.string(),
    end_time: z.string(),
  })),
  ctrl.create
);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     tags: [Reservations]
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
 *         description: Lista paginada de reservas del usuario
 */
router.get('/', checkAuth, ctrl.listUser);

module.exports = router;

