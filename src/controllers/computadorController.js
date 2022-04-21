var computadorModel = require("../models/computadorModel");


function fnListar(req, res) {
        computadorModel.fnListar()
            .then(
                function (resultado) {
                    res.status(200).json(resultado);     
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a listagem! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function fnExcluir(req, res){
    let id = req.body.idComputador;

    computadorModel.fnExcluir(id)
    .then(
        function (resultado) {
            res.status(200).json(resultado);     
        }
    )
    .catch(erro => {
        console.log("\nHouve um erro ao realizar a exclusão! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    })
}

function fnEditar(req, res){
    let id = req.body.idComputador;
    let novoNome = req.body.novoNome;

    computadorModel.fnEditar(id, novoNome)
    .then(resultado =>{
        res.status(200).json(resultado)
    })
    .catch(error => {
        console.log("Erro na hora do update: " + error.sqlMessage);
    })
}

module.exports = {
    fnListar,
    fnExcluir,
    fnEditar
}