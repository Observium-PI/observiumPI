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

module.exports = {
    getDados,
    getDadosUsuarioHospital
}