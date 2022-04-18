var database = require('../database/config');

function fnListarLogs() {
    var instrucao = `
    select M.datahora, C.tipoComponente, mq.nome, H.descricao from 
    Historico as H 
    join Monitoramento as M on fkMonitoramento = idMonitoramento 
    join Componente as C on fkComponente = idComponente 
    join Computador as mq on fkComputador = idComputador;
      `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    fnListarLogs
  }