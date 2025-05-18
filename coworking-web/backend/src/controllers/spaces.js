const db = require('../db');
exports.list = async (req, res, next) => {
  try {
    const spaces = await db('spaces').select('*');
    res.json(spaces);
  } catch (err) { next(err); }
};
