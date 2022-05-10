// IMPORTAÇÃO DO ARQUIVO MEDIDA MODEL COM OS COMANDOS SQL
var medidaModel = require("../models/medidaModel");

// FUNÇÃO PARA BUSCAR MEDIDAS EM TEMPO REAL TERÁ UMA REQUISIÇÃO E RESPOSTA
function buscarMedidasEmTempoRealCpu(req, res) {
    
    // REQUERIMENTO DO PARÂMETRO PASSADO NA HTML, SENDO obterDadosGrafico(1), obterDadosGrafico(2) etc...
    // Os números que estão entre parênteses são parâmetros   
    var idComputador = req.params.idComputador;

    // Console apresentará Recuperando medidas em tempo real
    console.log(`Recuperando medidas em tempo real`);

    // Aqui está levando o parâmetro do idGeladeira para os comandos SQL
    // dentro de medidaModel
    medidaModel.buscarMedidasEmTempoRealCpu(idComputador).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// EXPORTAÇÃO DE MÓDULOS QUE SÃO CHAMADOS NAS ROTAS
module.exports = {
    buscarMedidasEmTempoRealCpu
}