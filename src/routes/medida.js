// IMPORTAÇÃO DE MÓDULOS E REFERENCIANDO ESTE ARQUIVO COMO ROTA
var express = require("express");
var router = express.Router();

// IMPORTAÇÃO DA CONTROLLER DE MEDIDA
var medidaController = require("../controllers/medidaController");

router.get("/buscar-medidas/:idComputador", function(req, res){
    medidaController.buscarMedidas(req, res);
})


/*
    Rotas comentadas pois, segundo a nova modelagem, se tornam inúteis

// ROTA DO TIPO "GET", PARA OBTER AS MEDIDAS EM TEMPO REAL DE ACORDO COM O ID DA MAQUINA QUE É UM PARÂMETRO PASSADO NAS FUNÇÕES
router.get("/tempo-real/:idComputador/:contagem_linha", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
})

router.get("/tempo-real-memoria/:idComputador/:contagem_linha_mem", function (req, res) {
    medidaController.buscarMedidasEmTempoRealMemoria(req, res);
})

router.get("/buscar-maquinas/", function (req, res) {
    medidaController.buscarMaquinas(req, res);
})

router.get("/tempo-real-disco/:idComputador/:contagem_linha_disco/:discoSelecionado/", function (req, res) {
    medidaController.buscarMedidasEmTempoRealDisco(req, res);
})

router.get("/buscar-discos/:idComputador/", function (req, res) {
    medidaController.buscarDiscos(req, res);
})*/

// EXPORTAÇÃO DESTE ARQUIVO COMO ROTA
module.exports = router;