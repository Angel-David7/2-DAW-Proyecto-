exports.list = async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const offset = (page - 1) * limit;

    // Total de reservas
    const [{ count }] = await db('reservations').count('id');
    const total = parseInt(count, 10);
    const pages = Math.ceil(total / limit);

    const data = await db('reservations')
      .join('users','users.id','reservations.user_id')
      .join('spaces','spaces.id','reservations.space_id')
      .select('reservations.*','users.name as user','spaces.name as space')
      .limit(limit)
      .offset(offset);

    res.json({ data, meta: { page, limit, total, pages } });
  } catch (err) {
    next(err);
  }
};
