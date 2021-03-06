const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");

// Template engine EJS
server.set('view engine', 'ejs');
server.set("views", path.join(__dirname, 'views'));

// Arquivos statics
server.use(express.static("public"));

// User o req.body
server.use(express.urlencoded());

server.use(routes);

server.listen(3000, () => console.log("Servidor Iniciado..."));