var database = require('../database/config');

function fnListarLogs(idHospital) {
    var instrucao = `
    select M.dataHora, M.processador, M.memoria, M.disco, Cp.tipoComponente, C.hostName, H.descricao
    from Historico as H 
    join Monitoramento as M on H.fkMonitoramento = M.idMonitoramento
    join Computador as C on M.fkComputador = C.idComputador
    join Componente as Cp on Cp.fkComputador = C.idComputador 
   
    where fkHospital = ${idHospital}     
    ;
      `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    fnListarLogs
  }