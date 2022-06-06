var express = require("express");
var router = express.Router();

var computadorController = require("../controllers/computadorController.js");

router.get("/listar/:idHospital", function(req, res){
    computadorController.listarPorHospital(req, res);
});

router.post("/excluir", function(req, res){
    computadorController.fnExcluir(req, res);
});

router.post("/editar", function(req, res){
    computadorController.fnEditar(req, res);
});

router.get("/buscarAlertas/:idComputador", function(req, res){
    computadorController.buscarAlertas(req, res);
});

module.exports = router;