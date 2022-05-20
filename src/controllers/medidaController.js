// IMPORTAÇÃO DO ARQUIVO MEDIDA MODEL COM OS COMANDOS SQL
var medidaModel = require("../models/medidaModel");

// FUNÇÃO PARA BUSCAR MEDIDAS EM TEMPO REAL TERÁ UMA REQUISIÇÃO E RESPOSTA
function buscarMedidasEmTempoRealCpu(req, res) {
    
    // REQUERIMENTO DO PARÂMETRO PASSADO NA HTML, SENDO obterDadosGrafico(1), obterDadosGrafico(2) etc...
    // Os números que estão entre parênteses são parâmetros   
    var idComputador = req.params.idComputador;
    var contagem_linha = req.params.contagem_linha;

    // Console apresentará Recuperando medidas em tempo real
    console.log(`Recuperando medidas em tempo real`);

    // Aqui está levando o parâmetro do idGeladeira para os comandos SQL
    // dentro de medidaModel
    medidaModel.buscarMedidasEmTempoRealCpu(idComputador, contagem_linha).then(function (resultado) {
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

function buscarMedidasEmTempoRealMemoria(req, res) {

    // REQUERIMENTO DO PARÂMETRO PASSADO NA HTML, SENDO obterDadosGrafico(1), obterDadosGrafico(2) etc...
    // Os números que estão entre parênteses são parâmetros   
    var idComputador = req.params.idComputador;
    var contagem_linha_mem = req.params.contagem_linha_mem;

    // Console apresentará Recuperando medidas em tempo real
    console.log(`Recuperando medidas em tempo real`);

    // Aqui está levando o parâmetro do idGeladeira para os comandos SQL
    // dentro de medidaModel
    medidaModel.buscarMedidasEmTempoRealMemoria(idComputador, contagem_linha_mem).then(function (resultado) {
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

function buscarMaquinas(req, res) {
    
    // Console apresentará Recuperando máquinas
    console.log("Recuperando máquinas");

    medidaModel.buscarMaquinas().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as máquinas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasEmTempoRealDisco(req, res) {
    // REQUERIMENTO DO PARÂMETRO PASSADO NA HTML, SENDO obterDadosGrafico(1), obterDadosGrafico(2) etc...
    // Os números que estão entre parênteses são parâmetros   
    var idComputador = req.params.idComputador;
    var contagem_linha_disco = req.params.contagem_linha_disco;

    // Console apresentará Recuperando medidas em tempo real
    console.log(`Recuperando medidas em tempo real`);

    // Aqui está levando o parâmetro do idGeladeira para os comandos SQL
    // dentro de medidaModel
    medidaModel.buscarMedidasEmTempoRealDisco(idComputador, contagem_linha_disco).then(function (resultado) {
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
    buscarMedidasEmTempoRealCpu,
    buscarMedidasEmTempoRealMemoria,
    buscarMaquinas,
    buscarMedidasEmTempoRealDisco
}