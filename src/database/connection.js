const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "host.docker.internal",
    port: 33600,
    user: "root",
    password: "root",
    database: "fullcycle",
  },
});

module.exports = knex;
