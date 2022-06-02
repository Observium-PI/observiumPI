var database = require('../database/config');

function fnListarLogs(idHospital) {
    let instrucao = `
    select M.dataHora, M.processador, M.memoria, M.disco, C.hostName, H.descricao
    from Historico as H 
    join Monitoramento as M on H.fkMonitoramento = M.idMonitoramento
    join Computador as C on M.fkComputador = C.idComputador
   
    where fkHospital = ${idHospital}     
    order by M.dataHora
    ;
      `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

function fnListarLogsFiltro(idHospital, dtInicial, dtFinal){
  let instrucao = `
  select M.dataHora, M.processador, M.memoria, M.disco, C.hostName, H.descricao
  from Historico as H 
  join Monitoramento as M on H.fkMonitoramento = M.idMonitoramento
  join Computador as C on M.fkComputador = C.idComputador
 
 
  where fkHospital = ${idHospital} and dataHora > '${dtInicial}' and dataHora < '${dtFinal}'
  order by M.dataHora;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);

}

module.exports = {
    fnListarLogs,
    fnListarLogsFiltro
  }