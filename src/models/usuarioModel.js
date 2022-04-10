var database = require('../database/config');

function fnEntrar(usuario, senha) {
    var instrucao = `
          SELECT * FROM Usuario WHERE login = '${usuario}' AND senha = '${senha}';
      `;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    fnEntrar
}