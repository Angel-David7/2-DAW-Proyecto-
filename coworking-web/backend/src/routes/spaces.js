const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');
const ctrl = require('../controllers/spaces');

/**
 * @swagger
 * tags:
 *   name: Spaces
 *   description: Gestión de espacios
 */
/**
 * @swagger
 * /api/spaces:
 *   get:
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de espacios
 */
router.get('/', checkAuth, ctrl.list);
module.exports = router;
