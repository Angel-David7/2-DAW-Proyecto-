const db = require('../db');
exports.list = async (req, res, next) => {
  try {
    const notes = await db('notifications')
      .join('reservations','reservations.id','notifications.reservation_id')
      .where('reservations.user_id',req.user.id)
      .select(
        'notifications.id','notifications.type','notifications.sent_at',
        'reservations.space_id','reservations.start_time','reservations.end_time'
      );
    res.json(notes);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { reservation_id, type } = req.body;
    const reservation = await db('reservations')
      .where({ id: reservation_id, user_id: req.user.id }).first();
    if (!reservation) return res.status(404).json({ error: 'Not found' });
    const [note] = await db('notifications')
      .insert({ reservation_id, type },['id','type','sent_at']);
    res.status(201).json(note);
  } catch (err) { next(err); }
};
