const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/hola-mundo", (req, res) => {
  res.status(200).send("Hola Mundo");
});

app.get("/", (req, res) => {
  res.status(200).send("API funcionando");
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

module.exports = { app };
