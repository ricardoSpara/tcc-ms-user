const db = require("../database/connection");
class UserController {
  async index(req, res) {
    const users = await db("users").select("*");

    return res.json(users);
  }

  async store(req, res) {
    const { name, email } = req.body;

    const [id] = await db("users").insert({ name, email });

    return res.json({
      id,
    });
  }

  async update(req, res) {
    const { name, email } = req.body;
    const { userId: id } = req.params;
    const dataToUpdate = {};

    if (name) {
      dataToUpdate.name = name;
    }

    if (email) {
      dataToUpdate.email = email;
    }

    const user = await db("users").where({ id }).select("*");

    if (user.length === 0) {
      return res.json({ error: "User not exists" });
    }

    await db("users").where({ id }).update(dataToUpdate);

    return res.json({});
  }

  async destroy(req, res) {
    const { userId: id } = req.params;
    const user = await db("users").where({ id }).select("*");

    if (user.length === 0) {
      return res.json({ error: "User not exists" });
    }

    await db("users").where({ id }).delete();

    return res.json({});
  }
}

module.exports = new UserController();
