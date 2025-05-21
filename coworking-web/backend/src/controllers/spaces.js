const db = require('../db');

exports.list = async (req, res, next) => {
  try {
    // Leer page/limit de la query (fallback a 1/10)
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const offset = (page - 1) * limit;

    // Contar total de espacios
    const [{ count }] = await db('spaces').count('id');
    const total = parseInt(count, 10);
    const pages = Math.ceil(total / limit);

    // Obtener página
    const data = await db('spaces')
      .select('*')
      .limit(limit)
      .offset(offset);

    res.json({ data, meta: { page, limit, total, pages } });
  } catch (err) {
    next(err);
  }
};

