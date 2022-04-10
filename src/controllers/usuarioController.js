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

module.exports = {
    fnEntrar
}