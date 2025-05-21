const router = require('express').Router();
const { checkAuth } = require('../middlewares/auth');
const ctrl = require('../controllers/spaces');

/**
 * @swagger
 * tags:
 *   - name: Spaces
 *     description: Gestión de espacios
 */

/**
 * @swagger
 * /api/spaces:
 *   get:
 *     tags: [Spaces]
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
 *         description: Lista paginada de espacios
 */
router.get('/', checkAuth, ctrl.list);

module.exports = router;
