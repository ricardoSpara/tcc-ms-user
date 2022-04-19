const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

app.get("/health", (request, response) => {
  response.send("Ok");
});

app.listen(3000, () => {
  console.info("Alo som");
});
