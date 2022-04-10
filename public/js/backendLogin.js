function logar() {
    // Capturando as informações das inputs
    var usuario = input_login.value;
    var senha = input_senha.value;

    // Validação dos campos
    if (usuario && senha != "") {
        const body = {
            usuario: usuario,
            senha: senha
        };

        // Requisição do tipo POST
        fetch('usuarios/autenticar',{
            method: 'POST' ,
           headers: {
              // Informando que o tipo de corpo que será enviado será JSON
              'Content-Type': 'application/json'
            },
            // Transformando o objeto em JSON
            body: JSON.stringify(body)
        })
        // Caso a requisição dê certo, entrar no then
            .then(function (resposta){
                // Se a resposta for ok (ou seja, status = 200), 
                if(resposta.ok){
                    // Transforma a resposta em JSON, então com os dados que vieram...
                    resposta.json().then(function(dados){
                    // Definindo na variavel de sessão os dados do usuário
                    sessionStorage.setItem("nomeUsuario", dados.nome);
                    sessionStorage.setItem("setor", dados.setor);
                    sessionStorage.setItem("tipoUsuario", dados.tipoUsuario);
                    sessionStorage.setItem("Hospital", dados.fkHospital);
                    sessionStorage.setItem("logado", true);
                    location = "tela_maquinas.html";
                    })
                }else if(resposta.status == 403){
                    alert("Usuário ou senha incorretos. Tente novamente.");
                }
                

                
            })
            // Caso não dê certo, exibir o erro no console
            .catch(function erro() {
                console.log(erro);
            });




    } else {
        alert("Preencha todos os campos antes de prosseguir!");
    }
}