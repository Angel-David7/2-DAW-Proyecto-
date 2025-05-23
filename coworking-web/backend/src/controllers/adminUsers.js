const db = require("../db");

exports.list = async (req, res, next) => {
  try {
    // obtenemos todos los usuarios, paginados opcionalmente
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 50);
    const offset = (page - 1) * limit;

    const [{ count }] = await db("users").count("id");
    const total = parseInt(count, 10);
    const pages = Math.ceil(total / limit);

    const users = await db("users")
      .select(
        "id",
        "name",
        "surname",
        "email",
        "role",
        "validated",
        "created_at"
      )
      .limit(limit)
      .offset(offset);

    res.json({ data: users, meta: { page, limit, total, pages } });
  } catch (err) {
    next(err);
  }
};

exports.validate = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id, 10);
    await db("users").where({ id: userId }).update({ validated: true });
    const updated = await db("users")
      .select("id", "name", "surname", "email", "role", "validated")
      .where({ id: userId })
      .first();
    res.json({ user: updated });
  } catch (err) {
    next(err);
  }
};
