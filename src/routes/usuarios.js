var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController.js");

router.get("/", function (req, res) {
    usuarioController.fnTestar(req, res);
});

router.post("/autenticar", function (req, res) {
    usuarioController.fnEntrar(req, res);
});

/* Função comentada por não haver uso dela
router.post("/verificacaoDeUsuarios", function (req, res) {
    usuarioController.verificarUser(req, res);
});*/

router.get("/listarUsuarios", function (req, res) {
    usuarioController.listarUsers(req, res);
})

router.post("/pesquisarUsuarios", function (req, res) {
    usuarioController.pesquisarUsers(req, res);
})

router.post("/desligarUsuarios", function (req, res) {
    usuarioController.desligarUser(req, res);
})

router.post("/alterarUsuarios", function (req, res) {
    usuarioController.alterarUsers(req, res);
})

router.post("/cadastrarUsuarios", function (req, res) {
    usuarioController.cadastrarUsers(req, res);
})

module.exports = router;