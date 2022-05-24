// VARIÁVEL RECEBENDO A CONFIGURAÇÃO DO BANCO DE DADOS PARA CONEXÃO
var database = require("../database/config");

// FUNÇÃO DE BUSCAR MEDIDAS EM TEMPO REAL FAZENDO UM SELECT E RETORNANDO A EXECUÇÃO DO COMANDO SQL
function buscarMedidasEmTempoRealCpu(idComputador, contagem_linha) {
    instrucaoSql = `select cast(medida as numeric(10, 2)) as medida, FORMAT(dataHora,'hh:mm:ss') as 'momento_grafico' 
                        from monitoramento join componente on fkComponente = idComponente 
	                        join Computador on fkComputador = idComputador 
                                where tipoComponente = 'cpu' and idComputador = ${idComputador}
                                    order by 'momento_grafico' desc offset ${contagem_linha}
                                        rows fetch next 7 rows only;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealMemoria(idComputador, contagem_linha_mem) {
    instrucaoSql = `select cast(medida as numeric(10, 2)) as medida from monitoramento join componente on fkComponente = idComponente 
                        join Computador on fkComputador = idComputador where tipoComponente = 'memoriaRAM' 
                            and idComputador = ${idComputador} order by medida desc offset ${contagem_linha_mem} 
                                rows fetch next 1 rows only;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisco(idComputador, contagem_linha_disco, discoSelecionado) {
    instrucaoSql = `select cast(medida as numeric(10, 2)) as medida from monitoramento join componente on fkComponente = idComponente 
                        join Computador on fkComputador = idComputador where tipoComponente = '${discoSelecionado}' 
                            and idComputador = ${idComputador} order by medida desc offset ${contagem_linha_disco}
                                rows fetch next 1 rows only;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMaquinas() {
    instrucaoSql = `select idComputador, hostname, sistemaOperacional from Computador;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDiscos(idComputador) {
    instrucaoSql = `select tipoComponente from Componente where tipoComponente like 'disco%' 
                        and fkComputador = ${idComputador};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// EXPORTAÇÃO DE MÓDULOS USADOS NA CONTROLLER
module.exports = {
    buscarMedidasEmTempoRealCpu,
    buscarMedidasEmTempoRealMemoria,
    buscarMedidasEmTempoRealDisco,
    buscarMaquinas,
    buscarDiscos
}