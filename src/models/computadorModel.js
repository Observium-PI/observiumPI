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

module.exports = {
    fnListar,
    fnExcluir
}