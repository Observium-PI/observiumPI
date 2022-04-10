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

module.exports = {
    fnListar
}