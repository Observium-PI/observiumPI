var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController.js");

router.get("/getDados/:idHospital", function(req, res){
    relatorioController.getDados(req, res);
});

router.get("/getDadosUsuario/:idHospital/:idUsuario", function(req, res){
    relatorioController.getDadosUsuarioHospital(req, res);
});

router.get("/listarComputadorComMaisMonitoramentos/:idHospital/", function(req, res){
    relatorioController.getComputadorComMaisMonitoramentos(req, res);
});

router.get("/listarComputadorComMaisAlertas/:idHospital/", function(req, res){
    relatorioController.getComputadorComMaisAlertas(req, res);
});


module.exports = router;