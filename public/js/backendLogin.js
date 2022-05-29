function logar() {
    // Capturando as informações das inputs
    let usuario = input_login.value;
    let senha = input_senha.value;

    // Verifica se tem algo digitado nos campos de usuário e senha
    if (usuario && senha != "") {
        // Inicializa um objeto constante, essa constante será o corpo da requisição
        const body = {
            usuario: usuario,
            senha: senha
        };

        // Requisição do tipo POST na rota usuarios/autenticar
        fetch("usuarios/autenticar",{
            // Utilizando o método POST para a requisição
            method: "POST" ,
           headers: {
              // Informando que o tipo de corpo que será enviado será JSON
              "Content-Type": "application/json"
            },
            // Transformando o objeto (criado na linha 9) em JSON
            body: JSON.stringify(body)
        })
        // Caso a requisição dê certo, entrar no then
            .then(function (resposta){
                // Se a resposta for ok (ou seja, status = 200), executar o if
                if(resposta.ok){
                    // Transforma a resposta em JSON, se for possível, ele entra no .then()
                    resposta.json().then(function(dados){
                    // Definindo na variavel de sessão os dados do usuário
                    sessionStorage.setItem("nomeUsuario", dados.nome);
                    sessionStorage.setItem("idUsuario", dados.idUsuario);
                    sessionStorage.setItem("setor", dados.setor);
                    sessionStorage.setItem("tipoUsuario", dados.tipoUsuario);
                    sessionStorage.setItem("Hospital", dados.fkHospital);
                    sessionStorage.setItem("logado", true);
                    location = "tela_maquinas.html";
                    })
                    /* Se resposta.ok = false, significa que não deu certo e caso a resposta
                     for 403, significa que o usuário ou senha estão incorretos (ver usuarioController)*/
                }else if(resposta.status == 403){
                    alert("Usuário ou senha incorretos. Tente novamente.");
                }               
            })
            // Caso a requisição não dê certo, exibir o erro no console
            .catch(function erro() {
                console.log(erro);
            });
    } else {
        alert("Preencha todos os campos antes de prosseguir!");
    }
}