// VARIÁVEL RECEBENDO A CONFIGURAÇÃO DO BANCO DE DADOS PARA CONEXÃO
var database = require("../database/config");

// FUNÇÃO DE BUSCAR MEDIDAS EM TEMPO REAL FAZENDO UM SELECT E RETORNANDO A EXECUÇÃO DO COMANDO SQL
function buscarMedidasEmTempoRealCpu(idComputador, contagem_linha) {
    instrucaoSql = `select truncate(medida, 0) as medida, DATE_FORMAT(dataHora,'%H:%i:%s') as 'momento_grafico' 
                        from monitoramento join componente on fkComponente = idComponente 
	                        join Computador on fkComputador = idComputador 
                                where tipoComponente = 'cpu' and idComputador = ${idComputador}
                                    order by 'momento_grafico' desc limit ${contagem_linha}, 7;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealMemoria(idComputador, contagem_linha_mem) {
    instrucaoSql = `select truncate(medida, 1) as medida from monitoramento join componente on fkComponente = idComponente 
                        join Computador on fkComputador = idComputador where tipoComponente = 'memoriaRAM' 
                            and idComputador = ${idComputador} order by medida desc limit ${contagem_linha_mem}, 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(idComputador, contagem_linha_disco) {
    instrucaoSql = `select truncate(medida, 2) as medida from monitoramento join componente on fkComponente = idComponente 
                        join Computador on fkComputador = idComputador where tipoComponente = 'disco 1' 
                            and idComputador = ${idComputador} order by medida desc limit ${contagem_linha_disco}, 1;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaquinas() {
    instrucaoSql = `select idComputador, hostname, sistemaOperacional from Computador;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// EXPORTAÇÃO DE MÓDULOS USADOS NA CONTROLLER
module.exports = {
    buscarMedidasEmTempoRealCpu,
    buscarMedidasEmTempoRealMemoria,
    buscarMedidasEmTempoRealDisco,
    buscarMaquinas
}