const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;

//client -> server
// edit URL to change name and replace World: /greeting?name=jake
router.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});
