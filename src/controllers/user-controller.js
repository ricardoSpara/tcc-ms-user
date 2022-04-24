const db = require("../database/connection");
const kafkaProducer = require("../kafka/procuder");
const topics = require("../config/topics");
const actions = require("../config/actions");

class UserController {
  async index(req, res) {
    const users = await db('users').select('*');

    return res.json(users);
  }

  async store(req, res) {
    const { name, email } = req.body;
    const dataToCreate = {};

    const [id] = await db('users').insert({ name, email });

    Object.assign(dataToCreate, {
      name,
      email,
      id,
    });
    
    await kafkaProducer.sendMessages(topics.users, [
      {
        value: JSON.stringify(dataToCreate),
        headers: {
          action: actions.users.create,
        },
      },
    ]);

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

    const user = await db('users').where({ id }).select('*');

    if (user.length === 0) {
      return res.json({ error: 'User not exists' });
    }

    await db('users').where({ id }).update(dataToUpdate);

    dataToUpdate.id = id;

    await kafkaProducer.sendMessages(
      topics.users,
      [
        {
          value: JSON.stringify(dataToUpdate),
          headers: { action: actions.users.update },
        },
      ],
    );

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
