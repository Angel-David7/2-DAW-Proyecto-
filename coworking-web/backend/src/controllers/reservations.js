const db = require('../db');
exports.create = async (req, res, next) => {
  try {
    const { space_id, start_time, end_time } = req.body;
    const conflicts = await db('reservations')
      .where('space_id', space_id)
      .andWhere(builder => builder
        .whereBetween(['start_time','end_time'],[start_time,end_time])
        .orWhereBetween([start_time,end_time],['start_time','end_time']));
    if (conflicts.length) return res.status(400).json({ error: 'Conflict' });
    const [rsv] = await db('reservations')
      .insert({ user_id: req.user.id, space_id, start_time, end_time, status:'confirmed' }, ['*']);
    res.json(rsv);
  } catch (err) { next(err); }
};

exports.listUser = async (req, res, next) => {
  try {
    const list = await db('reservations')
      .where('user_id', req.user.id)
      .select('*');
    res.json(list);
  } catch (err) { next(err); }
};
