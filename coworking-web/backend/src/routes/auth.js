const router = require('express').Router();
const { z } = require('zod');
const validate = require('../middlewares/validate');
const ctrl = require('../controllers/auth');

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticación y registro
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required: [name, email, password]
 *     responses:
 *       200:
 *         description: Token JWT generado
 */
router.post(
  '/register',
  validate(z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  })),
  ctrl.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: Token JWT
 */
router.post(
  '/login',
  validate(z.object({
    email: z.string().email(),
    password: z.string().min(1),
  })),
  ctrl.login
);

module.exports = router;
