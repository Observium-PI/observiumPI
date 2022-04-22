var database = require('../database/config');

function fnListar() {
    var instrucao = `
          SELECT * FROM Computador;
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
    fnListar,
    fnExcluir,
    fnEditar
}