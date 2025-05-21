const db = require('../db');

exports.list = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 10);
    const offset = (page - 1) * limit;

    const [{ count }] = await db('notifications')
      .join('reservations', 'reservations.id', 'notifications.reservation_id')
      .where('reservations.user_id', req.user.id)
      .count('notifications.id');
    const total = parseInt(count, 10);
    const pages = Math.ceil(total / limit);

    const data = await db('notifications')
      .join('reservations', 'reservations.id', 'notifications.reservation_id')
      .where('reservations.user_id', req.user.id)
      .select(
        'notifications.id',
        'notifications.type',
        'notifications.sent_at',
        'reservations.space_id',
        'reservations.start_time',
        'reservations.end_time'
      )
      .limit(limit)
      .offset(offset);

    res.json({ data, meta: { page, limit, total, pages } });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { reservation_id, type } = req.body;

    // Verificar que la reserva es del usuario
    const reservation = await db('reservations')
      .where({ id: reservation_id, user_id: req.user.id })
      .first();
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    const [note] = await db('notifications')
      .insert({ reservation_id, type }, ['id', 'type', 'sent_at']);

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};
