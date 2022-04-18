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
    usuarioController.listarUsers(req, res);
})

router.get("/pegarUsuarios", function (req, res) {
    usuarioController.pegarUsers(req, res);
})

router.get("/pesquisarUsuarios", function (req, res) {
    usuarioController.pesquisarUsers(req, res);
})

router.post("/desligarUsuarios", function (req, res) {
    usuarioController.desligarUser(req, res);
})

router.post("/alterarNomeDeUsuarios", function (req, res) {
    usuarioController.alterarNomeDeUsers(req, res);
})

module.exports = router;