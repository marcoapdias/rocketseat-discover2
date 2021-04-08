const express = require("express");
const server = express();
const routes = require("./routes");

// Template engine EJS
server.set('view engine', 'ejs');

// Arquivos statics
server.use(express.static("public"));

// User o req.body
server.use(express.urlencoded());

server.use(routes);

server.listen(3000, () => console.log("Servidor Iniciado..."));