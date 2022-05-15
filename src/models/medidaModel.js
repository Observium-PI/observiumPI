// VARIÁVEL RECEBENDO A CONFIGURAÇÃO DO BANCO DE DADOS PARA CONEXÃO
var database = require("../database/config");

// FUNÇÃO DE BUSCAR MEDIDAS EM TEMPO REAL FAZENDO UM SELECT E RETORNANDO A EXECUÇÃO DO COMANDO SQL
function buscarMedidasEmTempoRealCpu(idComputador, contagem_linha) {
    instrucaoSql = `select medida, DATE_FORMAT(dataHora,'%H:%i:%s') as 'momento_grafico' 
                        from monitoramento join componente on fkComponente = idComponente 
	                        join Computador on fkComputador = idComputador 
                                where tipoComponente = 'cpu' and idComputador = ${idComputador}
                                    order by 'momento_grafico' desc limit ${contagem_linha}, 7;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// EXPORTAÇÃO DE MÓDULOS USADOS NA CONTROLLER
module.exports = {
    buscarMedidasEmTempoRealCpu
}