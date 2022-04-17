var usuarioModel = require("../models/usuarioModel");

function fnTestar(req, res) {
    res.json("ESTAMOS FUNCIONANDO, VAGA!");
}

function fnEntrar(req, res) {
    var usuario = req.body.usuario;
    var senha = req.body.senha;

    if (usuario == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.fnEntrar(usuario, senha)
            .then(
                function (resultado) {

                    if (resultado.length == 1) {
                        res.status(200).json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function verificarUser(req, res) {
    var id = req.body.id;

    if (!id) {
        return res.status(400).send("Não há id desse user!");
    }

    usuarioModel.verificarUser(id)
        .then(resultado => {
            if (resultado.length == 0) {
                return res.status(400).send("Id inexistente.");
            }

            return res.status(200).send(resultado[0]);
        }).catch(erro => {
            return res.status(500).json(erro.sqlMessage);
        });
}


function listarUsers(req, res) {
    usuarioModel.listarUsers()
        .then(resultado => {
            return res.status(200).send(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

}

function pegarUsers(req, res) {
    var id = req.body.id;

    if (!id) {
        return res.status(400).send("Não há id desse user!");
    }

    usuarioModel.pegarUsers(id)
        .then(resultado => {
            if (resultado.length == 0) {
                return res.status(400).send("Id inexistente.");
            }

            return res.status(200).send(resultado[0]);
        }).catch(erro => {
            return res.status(500).json(erro.sqlMessage);
        });

}

function pesquisarUsers(req, res) {
    var pesquisa = req.body.pesquisa;

    usuarioModel.pesquisarUsers(pesquisa)
        .then(resultado => {
            return res.status(200).send(resultado);
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    fnEntrar,
    verificarUser,
    listarUsers,
    pegarUsers,
    pesquisarUsers
}
