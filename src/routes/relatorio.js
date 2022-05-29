var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController.js");

router.get("/:idHospital", function(req, res){
    relatorioController.getDados(req, res);
});

router.get("/:idHospital/:idUsuario", function(req, res){
    relatorioController.getDadosUsuarioHospital(req, res);
})

module.exports = router;