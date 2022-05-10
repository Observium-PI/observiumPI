// IMPORTAÇÃO DE MÓDULOS E REFERENCIANDO ESTE ARQUIVO COMO ROTA
var express = require("express");
var router = express.Router();

// IMPORTAÇÃO DA CONTROLLER DE MEDIDA
var medidaController = require("../controllers/medidaController");

// ROTA DO TIPO "GET", PARA OBTER AS MEDIDAS EM TEMPO REAL DE ACORDO COM O ID DA MAQUINA QUE É UM PARÂMETRO PASSADO NAS FUNÇÕES
router.get("/tempo-real/:idComputador", function (req, res) {
    medidaController.buscarMedidasEmTempoRealCpu(req, res);
})

// EXPORTAÇÃO DESTE ARQUIVO COMO ROTA
module.exports = router;