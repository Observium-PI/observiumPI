var logsModel = require("../models/logsModel");

function fnListarLogs(req, res){
    let idHospital = req.params.idHospital;

    logsModel.fnListarLogs(idHospital)
    .then(
        function (resultado) {
            res.status(200).json(resultado);     
        }
    )
    .catch(
        function(erro){
            res.status(500).json(erro.sqlMessage)
        }
    )
}

function fnListarLogsFiltro(req, res){
    let idHospital = req.params.idHospital;
    let dtInicial = req.body.dtInicial;
    let dtFinal = req.body.dtFinal;

    logsModel.fnListarLogsFiltro(idHospital, dtInicial, dtFinal)
    .then(
        function (resultado) {
            res.status(200).json(resultado);     
        }
    )
    .catch(
        function(erro){
            res.status(500).json(erro.sqlMessage)
        }
    )
}

module.exports = {
    fnListarLogs,
    fnListarLogsFiltro 
}