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
  var instrucao = `UPDATE Computador set apelido = "${novoNome}" where idComputador = ${id}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return await database.executar(instrucao);
}

module.exports = {
    listarPorHospital,
    fnExcluir,
    fnEditar
}