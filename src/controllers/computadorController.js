var computadorModel = require("../models/computadorModel");

async function listarPorHospital(req, res) {
    let idHospital = req.params.idHospital;
    if(idHospital == null){
        res.status(400).send("idHospital não pode ser undefined");
    }else{
        let response = await computadorModel.listarPorHospital(idHospital)
        res.status(200).json(response);
    }         
}

async function fnExcluir(req, res){
    let id = req.body.idComputador;

    let response = await computadorModel.fnExcluir(id);
    res.status(200).json(response);
}

async function fnEditar(req, res){
    let id = req.body.idComputador;
    let novoNome = req.body.novoNome;

    let response = await computadorModel.fnEditar(id, novoNome);
    res.status(200).json(response);
}

async function buscarAlertas(req, res) {
    let idComputador = req.params.idComputador;
    
    let response = await computadorModel.buscarAlertas(idComputador)
    res.status(200).json(response);
}

module.exports = {
    listarPorHospital,
    fnExcluir,
    fnEditar,
    buscarAlertas
}