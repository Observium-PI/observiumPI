var database = require('../database/config');

function fnEntrar(usuario, senha) {
  var instrucao = `
          SELECT * FROM Usuario WHERE login = '${usuario}' AND senha = '${senha}';
      `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function verificarUser(id) {
  var instrucao = `
    SELECT tipoUsuario FROM Usuario WHERE idUsuario = '${id}';
  `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function listarUsers() {
  var instrucao = `
    SELECT idUsuario, nome, login, setor, tipoUsuario FROM Usuario ORDER BY nome;
    `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function pegarUsers(id) {
  var instrucao = `
  SELECT * FROM Usuario WHERE idUsuario = '${id}';
`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  fnEntrar,
  verificarUser,
  listarUsers,
  pegarUsers
}