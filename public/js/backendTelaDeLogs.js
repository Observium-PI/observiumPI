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


        //Resgatando id do hospital da sessão do usuário
        let idHospital = sessionStorage.getItem("Hospital");

        fetch(`logs/listarLogs/${idHospital}`, {
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
                        let cpu = document.createElement("span");
                        let ram = document.createElement("span");
                        let disco = document.createElement("span");
                        let maquina = document.createElement("span");
                        let descricao = document.createElement("span");

                        // Formatando a data vinda do banco
                        let dataHoraFormatada = dados[i].dataHora.substring(8, 10)
                            + "/"
                            + dados[i].dataHora.substring(5, 7)
                            + "/"
                            + dados[i].dataHora.substring(0, 4)
                            + " - "
                            + dados[i].dataHora.substring(11, 13)
                            + ":"
                            + dados[i].dataHora.substring(14, 16)
                            + ":"
                            + dados[i].dataHora.substring(17, 19);



                        data.innerHTML += dataHoraFormatada;
                        cpu.innerHTML += dados[i].processador;
                        ram.innerHTML += dados[i].memoria;
                        disco.innerHTML += dados[i].disco;
                        maquina.innerHTML += dados[i].hostName;
                        descricao.innerHTML += dados[i].descricao;

                        log.appendChild(card);
                        card.appendChild(data);
                        card.appendChild(cpu);
                        card.appendChild(ram);
                        card.appendChild(disco);
                        card.appendChild(maquina);
                        card.appendChild(descricao);

                        card.classList.add("card-log");
                        data.classList.add("text-log");
                        cpu.classList.add("text-log");
                        ram.classList.add("text-log");
                        disco.classList.add("text-log");
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

    

    // Funcionalidade filtro de data
    async function filtrarLogs() {
        
        let input_dataInicial = document.getElementById("input_dataInicial");
        let input_dataFinal = document.getElementById("input_dataFinal");
        let input_tempoInicial = document.getElementById("input_tempoInicial");
        let input_tempoFinal = document.getElementById("input_tempoFinal");

        let dtInicial = input_dataInicial.value;
        let dtFinal = input_dataFinal.value;
        let tempoInicial = input_tempoInicial.value;
        let tempoFinal = input_tempoFinal.value;

        let dataInicial = dtInicial + " " + tempoInicial + ":00";
        let dataFinal = dtFinal + " " + tempoFinal + ":00";  

        

        if (dtInicial && dtFinal && tempoInicial && tempoFinal != "") {
            if (dtInicial < dtFinal) {
                // Preparando requisição


                let body = JSON.stringify({
                    "dtInicial": dataInicial,
                    "dtFinal": dataFinal
                });

                //Resgatando id do hospital da sessão do usuário
                let idHospital = sessionStorage.getItem("Hospital");
                /* 
                    Como a função é assíncrona, devemos aguardar (await) 
                    o resultado dela, para que assim podemos armazenar na variavel resposta
                */
                let resposta = await fetch(`logs/listarLogs/${idHospital}`, {
                    method: 'POST',
                    headers:{
                            'Content-Type': 'application/json'
                        },
                    body: body

                });

                // Agora, para pegarmos os dados, precisamos aguardar que a váriavel let esteja pronta
                let dados = await resposta.json();
                // Agora, vamos limpar os logs que já estão em tela
                const log = document.getElementById("logs");

                while (log.hasChildNodes()) {
                log.removeChild(log.firstChild);
                }

                for (let i = 0; i < dados.length; i++) {
                    //let log = document.getElementById("logs");
                    let card = document.createElement("div");
                    let data = document.createElement("span");
                    let cpu = document.createElement("span");
                    let ram = document.createElement("span");
                    let disco = document.createElement("span");
                    let maquina = document.createElement("span");
                    let descricao = document.createElement("span");

                    // Formatando a data vinda do banco
                    let dataHoraFormatada = dados[i].dataHora.substring(8, 10)
                        + "/"
                        + dados[i].dataHora.substring(5, 7)
                        + "/"
                        + dados[i].dataHora.substring(0, 4)
                        + " - "
                        + dados[i].dataHora.substring(11, 13)
                        + ":"
                        + dados[i].dataHora.substring(14, 16)
                        + ":"
                        + dados[i].dataHora.substring(17, 19);



                    data.innerHTML += dataHoraFormatada;
                    cpu.innerHTML += dados[i].processador;
                    ram.innerHTML += dados[i].memoria;
                    disco.innerHTML += dados[i].disco;
                    maquina.innerHTML += dados[i].hostName;
                    descricao.innerHTML += dados[i].descricao;

                    log.appendChild(card);
                    card.appendChild(data);
                    card.appendChild(cpu);
                    card.appendChild(ram);
                    card.appendChild(disco);
                    card.appendChild(maquina);
                    card.appendChild(descricao);

                    card.classList.add("card-log");
                    data.classList.add("text-log");
                    cpu.classList.add("text-log");
                    ram.classList.add("text-log");
                    disco.classList.add("text-log");
                    maquina.classList.add("text-log");
                    descricao.classList.add("text-log");
                }
            } else if (dtInicial == dtFinal) {
                if (tempoInicial < tempoFinal) {
                    let body = JSON.stringify({
                        "dtInicial": dataInicial,
                        "dtFinal": dataFinal
                    });
    
                    //Resgatando id do hospital da sessão do usuário
                    let idHospital = sessionStorage.getItem("Hospital");
                    /* 
                        Como a função é assíncrona, devemos aguardar (await) 
                        o resultado dela, para que assim podemos armazenar na variavel resposta
                    */
                    let resposta = await fetch(`logs/listarLogs/${idHospital}`, {
                        method: 'POST',
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body: body
    
                    });
    
                    // Agora, para pegarmos os dados, precisamos aguardar que a váriavel let esteja pronta
                    let dados = await resposta.json();
                    // Agora, vamos limpar os logs que já estão em tela
                    const log = document.getElementById("logs");

                    while (log.hasChildNodes()) {
                        log.removeChild(log.firstChild);
                    }
                    for (let i = 0; i < dados.length; i++) {
                        //const log = document.getElementById("logs");
                        let card = document.createElement("div");
                        let data = document.createElement("span");
                        let cpu = document.createElement("span");
                        let ram = document.createElement("span");
                        let disco = document.createElement("span");
                        let maquina = document.createElement("span");
                        let descricao = document.createElement("span");

                        // Formatando a data vinda do banco
                        let dataHoraFormatada = dados[i].dataHora.substring(8, 10)
                            + "/"
                            + dados[i].dataHora.substring(5, 7)
                            + "/"
                            + dados[i].dataHora.substring(0, 4)
                            + " - "
                            + dados[i].dataHora.substring(11, 13)
                            + ":"
                            + dados[i].dataHora.substring(14, 16)
                            + ":"
                            + dados[i].dataHora.substring(17, 19);



                        data.innerHTML += dataHoraFormatada;
                        cpu.innerHTML += dados[i].processador;
                        ram.innerHTML += dados[i].memoria;
                        disco.innerHTML += dados[i].disco;
                        maquina.innerHTML += dados[i].hostName;
                        descricao.innerHTML += dados[i].descricao;

                        log.appendChild(card);
                        card.appendChild(data);
                        card.appendChild(cpu);
                        card.appendChild(ram);
                        card.appendChild(disco);
                        card.appendChild(maquina);
                        card.appendChild(descricao);

                        card.classList.add("card-log");
                        data.classList.add("text-log");
                        cpu.classList.add("text-log");
                        ram.classList.add("text-log");
                        disco.classList.add("text-log");
                        maquina.classList.add("text-log");
                        descricao.classList.add("text-log");
                    }

                } else {
                    alert("O primeiro tempo não pode ser maior ou igual ao segundo tempo!")
                }
            } else {
                alert("A primeira data não pode ser maior ou igual do que a segunda!");
            }
        } else {
            alert("Preencha todos os campos de data!");
        }
    }
    let botao = document.getElementById("btnFiltro");
    botao.addEventListener("click", filtrarLogs);

    async function gerarRelatorio(){
        let idHospital = sessionStorage.getItem('Hospital');
        let idUsuario = sessionStorage.getItem('idUsuario');

        let response1 = await fetch(`relatorio/getDadosUsuario/${idHospital}/${idUsuario}`, {
            method: 'GET',
            mode: 'cors'
        });

        let dados1 = await response1.json();

        let response2 = await fetch(`relatorio/getDados/${idHospital}`,{
            method: 'GET',
            mode: 'cors'
        });

        let dados2 = await response2.json();

        let response3 = await fetch(`relatorio/listarComputadorComMaisAlertas/${idHospital}`, {
            method: 'GET',
            mode: 'cors'
        });

        let dados3 = await response3.json();

        let response4 = await fetch(`relatorio/listarComputadorComMaisMonitoramentos/${idHospital}`, {
            method: 'GET',
            mode: 'cors'
        });

        let dados4 = await response4.json();

        // console.log(dados1, dados2);

        let csv = `Gerado por:, ${dados1[0].nomeUsuario}, , Hospital: , ${dados1[0].nomeHospital}\n\n
        , hostname, Monitoramentos, Alertas, Disponibilidade\n`;

        dados2.forEach(function (linha) {
            // Calculando disponibilidade
            let disponibilidade = 100 - ((linha.qtdAlertas/linha.qtdMonitoramento) * 100);
      
            csv += ',' + linha.hostname;
            csv += ',' + linha.qtdMonitoramento;
            csv += ',' + linha.qtdAlertas;
            csv += ',' + disponibilidade + "%"
            csv += '\n';

            
          });

          csv += "\n\n";
          csv += `,Computador com mais monitoramentos:, ${dados4[0].hostname}, ${dados4[0].qtdMonitoramentos}\n`;
          csv += `,Computador com mais alertas:, ${dados3[0].hostname}, ${dados3[0].qtdHistorico}\n`;

          let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'relatorio.csv';
            hiddenElement.click();
    }

    let ancora = document.getElementById("ancoraGerarRelatorio");
    ancora.addEventListener("click", gerarRelatorio);


}