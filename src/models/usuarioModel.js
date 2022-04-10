var database = require('../database/config');

function fnEntrar(usuario, senha) {
    var instrucao = `
          SELECT * FROM Usuario WHERE login = '${usuario}' AND senha = SHA2('${senha}', 224);
      `;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    fnEntrar
}