const db = require('../db');
exports.list = async (req, res, next) => {
  try {
    const all = await db('reservations')
      .join('users','users.id','reservations.user_id')
      .join('spaces','spaces.id','reservations.space_id')
      .select('reservations.*','users.name as user','spaces.name as space');
    res.json(all);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await db('reservations').where('id', req.params.id).del();
    res.json({ success:true });
  } catch (err) { next(err); }
};
