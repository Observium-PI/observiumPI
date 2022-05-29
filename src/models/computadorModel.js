var database = require('../database/config');

/*
  Função comentada, pois não faz sentido listar todos os computadores,
  E sim listar filtrando por hospital
function fnListar() {
    var instrucao = `
          SELECT * FROM Computador;
      `;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
  }*/

function listarPorHospital(idHospital){
  let instrucao = `
  SELECT * FROM Computador where fkHospital = ${idHospital};
  `;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function fnExcluir(id){
  var instrucao = `DELETE from Computador where idComputador = ${id}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function fnEditar(id, novoNome){
  var instrucao = `UPDATE Computador set hostname = "${novoNome}" where idComputador = ${id}`;
  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
    listarPorHospital,
    fnExcluir,
    fnEditar
}