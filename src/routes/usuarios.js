var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController.js");

router.get("/", function (req, res) {
    usuarioController.fnTestar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.fnEntrar(req, res);
});

router.get("/verificacaoDeUsuarios", function (req, res) {
    usuarioController.verificarUser(req, res);
});

router.get("/listarUsuarios", function (req, res) {
    usuarioController.usuarioController(res, res);
})

module.exports = router;