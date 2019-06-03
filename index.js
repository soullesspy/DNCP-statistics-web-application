const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// Redirige las peticiones con URL que terminan en / al equivalente sin la barra final.
// Ej: http://localhost/tasks/ se redirige a https://localhost/tasks
app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else
    next();
});
app.use("/",(req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/html");
  res.end(
    "<body><title>REST API</title><h1>API RESTful stadistic DNCP</h1></body>"
  );
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Servidor escuchando en el host ${hostname} y puerto ${port}`);
});