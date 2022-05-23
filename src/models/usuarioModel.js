var database = require('../database/config');

function fnEntrar(usuario, senha) {
  var instrucao = `
          SELECT * FROM Usuario WHERE login = '${usuario}' AND senha = '${senha}';
      `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}


/* Função comentada por não haver uso dela
function verificarUser(id) {
  var instrucao = `
    SELECT tipoUsuario FROM Usuario WHERE idUsuario = '${id}';
  `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}*/

function listarUsers(hospital) {
  var instrucao = `
    SELECT idUsuario, nome, login, setor, tipoUsuario, email, senha FROM Usuario WHERE fkHospital = ${hospital} ORDER BY nome;
  `;

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function pesquisarUsers(pesquisa) {
  var instrucao = `
    SELECT idUsuario, nome, login, setor, tipoUsuario, email FROM Usuario WHERE nome LIKE '${pesquisa}%' ORDER BY nome;
  `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function desligarUser(id) {
  var instrucao = `
    DELETE FROM Usuario WHERE idUsuario = ${id};
  `;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);
}

function alterarUsers(id, novoNome, novaSenha) {
  var instrucao = `
    UPDATE Usuario SET nome = '${novoNome}', senha = '${novaSenha}' WHERE idUsuario = ${id};
`;

  console.log('Executando a instrução SQL: \n' + instrucao);
  return database.executar(instrucao);

}

function cadastrarUsers(nome, email, setor, tipoUsuario, login, senha, hospital) {
  var instrucao = `
  INSERT INTO Usuario (nome, email, setor, tipoUsuario, login, senha, fkHospital) VALUES ('${nome}', '${email}', '${setor}', '${tipoUsuario}', '${login}', '${senha}', ${hospital});
  `;

  return database.executar(instrucao);
}

function validarEmail ( email){
  
  var emailExistente = `
  SELECT email FROM Usuario WHERE email = '${email}';
  `;

  return database.executar( emailExistente);
}

function validarLogin (login) {
  var loginExistente = `
  SELECT login FROM Usuario WHERE login = '${login}';
  `;

  return database.executar(loginExistente);
}

module.exports = {
  fnEntrar,
  //verificarUser,
  listarUsers,
  pesquisarUsers,
  desligarUser,
  alterarUsers,
  cadastrarUsers,
  validarLogin,
  validarEmail
}