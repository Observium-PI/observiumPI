var database = require('../database/config');

async function listarPorHospital(idHospital){
  let instrucao = `
  SELECT * FROM Computador where fkHospital = ${idHospital};
  `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return  await database.executar(instrucao);
}

async function fnExcluir(id){
  var instrucao = `DELETE from Computador where idComputador = ${id}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return await database.executar(instrucao);
}

async function fnEditar(id, novoNome){
  var instrucao = `UPDATE Computador set apelidoMaquina = '${novoNome}' where idComputador = ${id}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return await database.executar(instrucao);
}

async function buscarAlertas(idComputador){
  let instrucao = `
  select count(idHistorico) as 'contador' from Historico join Monitoramento
  on fkMonitoramento = idMonitoramento join Computador
  on fkComputador = idComputador where
  datediff(minute, dataHora, getdate()) <= 5 and fkComputador = ${idComputador};
  `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return await database.executar(instrucao);
}

module.exports = {
    listarPorHospital,
    fnExcluir,
    fnEditar,
    buscarAlertas
}