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
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.fnEntrar(usuario, senha)
            .then(function (resultado) {
                if (resultado.length == 1) {
                    res.status(200).json(resultado[0]);
                } else if (resultado.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o login! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });
    }
}

/* Função comentada por não haver uso dela
function verificarUser(req, res) {
    var id = req.body.id;

    if (!id) {
        return res.status(404).send("Não há id desse user!");
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
}*/

function listarUsers(req, res) {
    var hospital = req.query.hospital;

    if (!hospital) {
        return res.status(404).send("Não há id desse user!");
    }

    usuarioModel.listarUsers(hospital)
        .then((resultado) => {
            return res.status(200).send(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function pegarUsers(req, res) {
    var id = req.body.id;

    if (!id) {
        return res.status(400).send("Não há id desse user!");
    }

    usuarioModel.pegarUsers(id)
        .then((resultado) => {
            if (resultado.length == 0) {
                return res.status(400).send("Id inexistente.");
            }

            return res.status(200).send(resultado[0]);
        })
        .catch((erro) => {
            return res.status(500).json(erro.sqlMessage);
        });
}

function pesquisarUsers(req, res) {
    var pesquisa = req.body.pesquisa;

    usuarioModel
        .pesquisarUsers(pesquisa)
        .then((resultado) => {
            return res.status(200).send(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function desligarUser(req, res) {
    var id = req.body.idUsuario;

    usuarioModel.desligarUser(id)
        .then((resultado) => {
            if (resultado.length == 0) {
                return res.status(400).send("Id inexistente.");
            }

            return res.status(200).send(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function alterarUsers(req, res) {
    var id = req.body.idUsuario;
    var novoNome = req.body.novoNome;
    var novaSenha = req.body.novaSenha;

    if (novoNome == null) {
        return res.status(400).send("Campo nome está vazio.");
    }
    if (novaSenha == null) {
        return res.status(400).send("Campo senha está vazio.");
    }

    usuarioModel.alterarUsers(id, novoNome, novaSenha)
        .then((resultado) => {
            if (resultado.length == 0) {
                return res.status(400).send("Id e nome inexistente.");
            }

            return res.status(200).send(resultado[0]);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrarUsers(req, res) {
    var nome = req.body.nome;
    var setor = req.body.setor;
    var tipoUsuario = req.body.tipoUser;
    var email = req.body.emailUser;
    var login = req.body.login;
    var senha = req.body.senha;
    var hospital = req.body.hospital;

    if (!nome) {
        return res.status(400).send("Campo nome está vazio.");
    }

    if (!setor) {
        return res.status(400).send("Campo setor está vazio.");
    }

    if (!tipoUsuario) {
        return res.status(400).send("Campo tipo de usuário está vazio.");
    }

    if (!login) {
        return res.status(400).send("Campo login está vazio.");
    }

    if (!senha) {
        return res.status(400).send("Campo senha está vazio.");
    }

    usuarioModel.validarLogin(login)
        .then((resultado) => {
            if (resultado.length > 0) {
                return res
                    .status(409)
                    .json({ message: `Login ${login} já cadastrado.` });
            }

            usuarioModel.validarEmail(email)
                .then((resultado) => {
                    if (resultado.length > 0) {
                        return res
                            .status(409)
                            .json({ message: `Email ${email} já cadastrado.` });
                    }
                    usuarioModel.cadastrarUsers(
                        nome,
                        email,
                        setor,
                        tipoUsuario,
                        login,
                        senha,
                        hospital
                    )
                        .then((resultado) => {
                            console.log(resultado);
                            return res.status(200).send(resultado[0]);
                        })
                        .catch(function (erro) {
                            console.log(erro);
                            res.status(500).json(erro.sqlMessage);
                        });
                })
                .catch(function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                });
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    fnTestar,
    fnEntrar,
    // verificarUser,
    listarUsers,
    pegarUsers,
    pesquisarUsers,
    desligarUser,
    alterarUsers,
    cadastrarUsers,
};
