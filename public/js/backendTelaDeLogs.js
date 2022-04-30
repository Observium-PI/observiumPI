if (sessionStorage.getItem("logado") == false || sessionStorage.getItem("logado") == null) {
    location = "index.html";
} else {
    if (sessionStorage.getItem("tipoUsuario") == "admin") {
        const boxes_links = document.getElementById("boxes_links");
        let link_tela_funcionario = document.createElement("a");
        let icon_tela_funcionario = document.createElement("img");

        link_tela_funcionario.href = "tela_funcionarios.html";
        link_tela_funcionario.classList.add("box");

        icon_tela_funcionario.src = "./assets/imgs/target.png";

        boxes_links.appendChild(link_tela_funcionario);
        link_tela_funcionario.appendChild(icon_tela_funcionario);


        fetch("logs/listarLogs", {
            method: "GET",
            mode: "cors"
        })
            .then(response => {
                response.json().then(dados => {
                    console.log(dados);
                    for (let i = 0; i < dados.length; i++) {
                        const log = document.getElementById("logs");
                        let card = document.createElement("div");
                        let data = document.createElement("span");
                        let componente = document.createElement("span");
                        let maquina = document.createElement("span");
                        let descricao = document.createElement("span");
                
                        // Formatando a data vinda do banco
                        let dataHoraFormatada = dados[i].datahora.substring(5, 7) 
                        + "/" 
                        + dados[i].datahora.substring(8, 10) 
                        + "/" 
                        + dados[i].datahora.substring(0, 4)
                        + " - "
                        + dados[i].datahora.substring(11, 13)
                        + ":"
                        + dados[i].datahora.substring(14, 16)
                        + ":"
                        + dados[i].datahora.substring(17, 19);
                         


                        data.innerHTML += dataHoraFormatada;
                        componente.innerHTML += dados[i].tipoComponente;
                        maquina.innerHTML += dados[i].hostname;
                        descricao.innerHTML += dados[i].descricao;
                
                        log.appendChild(card);
                        card.appendChild(data);
                        card.appendChild(componente);
                        card.appendChild(maquina);
                        card.appendChild(descricao);
                
                        card.classList.add("card-log");
                        data.classList.add("text-log");
                        componente.classList.add("text-log");
                        maquina.classList.add("text-log");
                        descricao.classList.add("text-log");
                        
                    }
                })
            })
            .catch(error => {
                console.log("Estamos no catch!\nErro: " + error);
            })

    }

    function fnDeslogar() {
        /* A função de deslogar consiste em limpar a sessão local do usuário, o que significa 
        que ele não terá mais a váriavel booleana, indicando se ele está logado ou não, no 
        sistema, sendo assim, ele não consegue mais voltar à Dashboard*/
        sessionStorage.clear();
        // Logo após, ele é direcionado para a tela inicial do site.
        location = "index.html";
    }

}