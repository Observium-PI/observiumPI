var database = require('../database/config');

function fnListar() {
    var instrucao = `
          SELECT * FROM Computador;
      `;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    fnListar
}