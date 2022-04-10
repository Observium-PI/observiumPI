var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController.js");

router.get("/", function (req, res) {
    usuarioController.fnTestar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.fnEntrar(req, res);
});

module.exports = router;