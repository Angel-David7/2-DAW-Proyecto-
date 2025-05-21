const db = require('../db');

exports.create = async (req, res, next) => {
  try {
    const { space_id, start_time, end_time } = req.body;

    // Comprobar solapamientos
    const conflicts = await db('reservations')
      .where('space_id', space_id)
      .andWhere(builder => builder
        .whereBetween(['start_time', 'end_time'], [start_time, end_time])
        .orWhereBetween([start_time, end_time], ['start_time', 'end_time'])
      );

    if (conflicts.length) {
      return res.status(400).json({ error: 'Time slot conflict' });
    }

    const [rsv] = await db('reservations')
      .insert({
        user_id: req.user.id,
        space_id,
        start_time,
        end_time,
        status: 'confirmed'
      }, ['*']);

    res.json(rsv);
  } catch (err) {
    next(err);
  }
};

exports.listUser = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const offset = (page - 1) * limit;

    const [{ count }] = await db('reservations')
      .where('user_id', req.user.id)
      .count('id');
    const total = parseInt(count, 10);
    const pages = Math.ceil(total / limit);

    const data = await db('reservations')
      .where('user_id', req.user.id)
      .select('*')
      .limit(limit)
      .offset(offset);

    res.json({ data, meta: { page, limit, total, pages } });
  } catch (err) {
    next(err);
  }
};
