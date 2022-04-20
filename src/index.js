require('dotenv').config();

const express = require("express");
const routes = require("./routes");
const {APP_PORT} = process.env
const app = express();

app.use(express.json());
app.use(routes);

app.get("/health", (request, response) => {
  response.send("Ok");
});

app.listen(APP_PORT || 3000, () => {
  console.info(`App running on port ${APP_PORT}`);
});
