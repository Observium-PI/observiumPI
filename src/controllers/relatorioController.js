var relatorioModel = require("../models/relatorioModel");

async function getDados(req, res){
    let idHospital = req.params.idHospital;

    let response = await relatorioModel.getDados(idHospital);

    res.status(200).json(response);

}

async function getDadosUsuarioHospital(req, res){
    let idHospital = req.params.idHospital; 
    let idUsuario = req.params.idUsuario;

    let response = await relatorioModel.getDadosUsuarioHospital(idHospital, idUsuario);

    res.status(200).json(response);
}

async function getComputadorComMaisMonitoramentos(req, res){
    let idHospital =  req.params.idHospital; 

    let response = await relatorioModel.getComputadorComMaisMonitoramentos(idHospital);

    res.status(200).json(response);

}

async function getComputadorComMaisAlertas(req, res){
    let idHospital =  req.params.idHospital; 

    let response = await relatorioModel.getComputadorComMaisAlertas(idHospital);

    res.status(200).json(response);

}

module.exports = {
    getDados,
    getDadosUsuarioHospital,
    getComputadorComMaisMonitoramentos,
    getComputadorComMaisAlertas
}