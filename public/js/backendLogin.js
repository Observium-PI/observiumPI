function logar() {
    var usuario = input_login.value;
    var senha = input_senha.value;

    if (usuario && senha != "") {
        const body = {
            usuario: usuario,
            senha: senha
        };

        fetch('usuarios/autenticar',{
            method: 'POST' ,
           headers: {
              // Informando que o tipo de corpo que será enviado será JSON
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(function (resposta){
                if(resposta.ok){
                    resposta.json().then(function(dados){
                    sessionStorage.setItem("nomeUsuario", dados.nome);
                    location = "tela_maquinas.html";
                    })
                }else if(resposta.status == 403){
                    alert("Usuário ou senha incorretos. Tente novamente.");
                }
                

                
            })
            .catch(function erro() {
                console.log(erro);
            });




    } else {
        alert("Preencha todos os campos antes de prosseguir!");
    }
}