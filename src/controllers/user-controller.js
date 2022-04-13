class UserController {
  async store(req, res) {
    return res.json({
      alo: 'som',
    });
  }

  async index(req, res) {
    return res.json({
      alo: 'som',
    });
  }
}

module.exports = new UserController();
