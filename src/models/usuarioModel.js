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
    SELECT idUsuario, nome, login, setor, tipoUsuario, senha FROM Usuario ORDER BY nome;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

// function pegarUsers(id) {
//   var instrucao = `
//     SELECT * FROM Usuario WHERE idUsuario = '${id}';
//   `;

//   console.log('Executando a instrução SQL: \n' + instrucao);
//   return database.executar(instrucao);
// }

function pesquisarUsers(pesquisa) {
  var instrucao = `
    SELECT idUsuario, nome, login, setor, tipoUsuario FROM Usuario WHERE nome LIKE '${pesquisa}%' ORDER BY nome;
  `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function desligarUser(id) {
  var instrucao = `
    DELETE FROM Usuario WHERE idUsuario = "${id}";
  `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function alterarUsers(id, novoNome, novaSenha) {
  var instrucao = `
  UPDATE Usuario SET nome = "${novoNome}", senha = "${novaSenha}" WHERE idUsuario = "${id}";
`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);

}

// function alterarSenhaDeUsers(id, novaSenha) {
//   var instrucao = `
//   UPDATE Usuario SET senha = "${novaSenha}" WHERE idUsuario = "${id}";
// `;

//   console.log('Executando a instrução SQL: \n' + instrucao);
//   return database.executar(instrucao);

// }

module.exports = {
  fnEntrar,
  verificarUser,
  listarUsers,
  // pegarUsers,
  pesquisarUsers,
  desligarUser,
  alterarUsers,
  // alterarSenhaDeUsers
}