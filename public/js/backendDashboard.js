// Validação do ntipo de usuário
if (sessionStorage.getItem("tipoUsuario") == "admin") {
    //Se o usuário for o admin, haverá a criação dos componentes relacionados à tela de usuários
    const boxes_links = document.getElementById("boxes_links")
    let link_tela_funcionario = document.createElement("a")
    let icon_tela_funcionario = document.createElement("img")

    link_tela_funcionario.href = "tela_funcionarios.html"
    link_tela_funcionario.classList.add("box")

    icon_tela_funcionario.src = "./assets/imgs/target.png"

    boxes_links.appendChild(link_tela_funcionario)
    link_tela_funcionario.appendChild(icon_tela_funcionario)
}

function fnDeslogar() {
    /* A função de deslogar consiste em limpar a sessão local do usuário, o que significa 
    que ele não terá mais a váriavel booleana, indicando se ele está logado ou não, no 
    sistema, sendo assim, ele não consegue mais voltar à Dashboard*/
    sessionStorage.clear();
    // Logo após, ele é direcionado para a tela inicial do site.
    location = "index.html";
}

function getMaquinas(hospital) {

    fetch(`computador/listar/${hospital}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    })
        .then((resultado) => {
            resultado.json().then(
                (dados) => {
                    let comboW = document.getElementById("select_windows");
                    let comboL = document.getElementById("select_linux");

                    dados.forEach(maquina => {
                        if (maquina.sistemaOperacional == "Windows") {
                            let opcao = new Option(maquina.hostname, maquina.idComputador);
                            opcao.setAttribute("id", maquina.hostname);
                            comboW.add(opcao);
                        } else {
                            let opcao = new Option(maquina.hostname, maquina.idComputador);
                            opcao.setAttribute("id", maquina.hostname);
                            comboL.add(opcao);
                        }
                    });
                })
        })
        .catch((erro) => {
            console.log(erro);
        })


}

// Vetor que armazenará as medidas dos componentes
let idMonitoramentos = [];
let dataHoraMonitoramentos = [];
let medidasCPU = [];
let medidasMemoria = [];
let medidasDisco = [];

// Criação dos gráficos para posterior manipulação
// CPU
const cpuChart = document.getElementById('lineChart').getContext('2d');
let graficoCPU = new Chart(cpuChart, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Uso da CPU',
            data: [],
            backgroundColor: "rgba(10, 20, 30, 0.5)",
            fontColor: "#ffffff"
        }],
        
    },
    options:{
        legend: {
            labels: {
                fontColor: "white",
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white",
                    stepSize: 1,
                    fontSize: 11,
                    
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white",
                    stepSize: 1,
                    
                }
            }]
        }
    }

});
// Memoria
const memoriaChart = document.getElementById('donutChartOne').getContext('2d');
let graficoMemoria = new Chart(memoriaChart, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: "Uso da RAM",
            data: [],
            backgroundColor: ["white", "#0c1622"],
            borderWidth: 1,
            hoverOffset: 4
        }]
    }, 
    options:{
        legend: {
            labels: {
                fontColor: "white",
            }
        }
    }
});
// Disco
const discoChart = document.getElementById('donutChartTwo').getContext('2d');
let graficoDisco = new Chart(discoChart, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: "Armazenamento do disco",
            data: [],
            backgroundColor: ["white", "#0c1622"],
            borderWidth: 1,
            hoverOffset: 4
        }]
    },
    options:{
        legend: {
            labels: {
                fontColor: "white",
            }
        }
    }
});

async function getMedidas(idComputador) {
   let resposta = await fetch(`medida/buscar-medidas/${idComputador}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    })
    let dados = await resposta.json(); 
    //Verificando se há medidas
        // Limpando os vetores antes de preenchê-los
        idMonitoramentos = [];
        dataHoraMonitoramentos = [];
        medidasCPU = [];
        medidasMemoria = [];
        medidasDisco = [];
        dados.forEach(medidas => {
            
            // Preenchendo os vetores
            idMonitoramentos.push(medidas.idMonitoramento);
            dataHoraMonitoramentos.push(medidas.dataHora);
            medidasCPU.push(medidas.processador);
            medidasMemoria.push(medidas.memoria);
            medidasDisco.push(medidas.disco);
        });
    
    plotarDadosCPU();
    plotarDadosMemoria();
    plotarDadosDisco();

}

function plotarDadosCPU() {
    //Antes de plotar os dados na CPU, vamos formatar a data e hora que vem por padrão do banco
    for(let i = 0; i < dataHoraMonitoramentos.length; i++){
        dataHoraMonitoramentos[i] = dataHoraMonitoramentos[i].substring(11, 19); 
    }

    switch (medidasCPU.length) {
        case 0:
            
         // Limpando todo o gráfico
         graficoCPU.data.labels = [];
         graficoCPU.data.datasets[0].data = [];



        break;
        case 1:
            // Limpando todo o gráfico
            graficoCPU.data.labels = [];
            graficoCPU.data.datasets[0].data = [];

            // Incluindo labels no gráfico
            dataHoraMonitoramentos.forEach(dataHora => {
                graficoCPU.data.labels.push(dataHora);
            });



            //Incluindo dados no gráfico
            medidasCPU.forEach(medida => {
                graficoCPU.data.datasets[0].data.push(medida);
            })


      
            break;

        case 2:
            // Limpando todo o gráfico
            graficoCPU.data.labels = [];
            graficoCPU.data.datasets[0].data = [];

            // Incluindo labels no gráfico
            dataHoraMonitoramentos.forEach(dataHora => {
                graficoCPU.data.labels.push(dataHora);
            });



            //Incluindo dados no gráfico
            medidasCPU.forEach(medida => {
                graficoCPU.data.datasets[0].data.push(medida);
            })


          
            break;

        case 3:
            // Limpando todo o gráfico
            graficoCPU.data.labels = [];
            graficoCPU.data.datasets[0].data = [];

            // Incluindo labels no gráfico
            dataHoraMonitoramentos.forEach(dataHora => {
                graficoCPU.data.labels.push(dataHora);
            });



            //Incluindo dados no gráfico
            medidasCPU.forEach(medida => {
                graficoCPU.data.datasets[0].data.push(medida);
            })


            
            break;

        case 4:
           // Limpando todo o gráfico
           graficoCPU.data.labels = [];
           graficoCPU.data.datasets[0].data = [];

           // Incluindo labels no gráfico
           dataHoraMonitoramentos.forEach(dataHora => {
               graficoCPU.data.labels.push(dataHora);
           });

           //Incluindo dados no gráfico
           medidasCPU.forEach(medida => {
               graficoCPU.data.datasets[0].data.push(medida);
           })
            break;

        case 5:
            // Limpando todo o gráfico
            graficoCPU.data.labels = [];
            graficoCPU.data.datasets[0].data = [];

            // Incluindo labels no gráfico
            dataHoraMonitoramentos.forEach(dataHora => {
                graficoCPU.data.labels.push(dataHora);
            });

            //Incluindo dados no gráfico
            medidasCPU.forEach(medida => {
                graficoCPU.data.datasets[0].data.push(medida);
            })

            break;

        case 6:
            // Limpando todo o gráfico
            graficoCPU.data.labels = [];
            graficoCPU.data.datasets[0].data = [];

            // Incluindo labels no gráfico
            dataHoraMonitoramentos.forEach(dataHora => {
                graficoCPU.data.labels.push(dataHora);
            });



            //Incluindo dados no gráfico
            medidasCPU.forEach(medida => {
                graficoCPU.data.datasets[0].data.push(medida);
            })


            
            break;

        case 7:
            // Limpando todo o gráfico
            graficoCPU.data.labels = [];
            graficoCPU.data.datasets[0].data = [];

            // Incluindo labels no gráfico
            dataHoraMonitoramentos.forEach(dataHora => {
                graficoCPU.data.labels.push(dataHora);
            });



            //Incluindo dados no gráfico
            medidasCPU.forEach(medida => {
                graficoCPU.data.datasets[0].data.push(medida);
            })


        
            break;

        default:
            break;
    }

    graficoCPU.update();
}

function plotarDadosMemoria(){
    // Limpando gráfico antes de replotar
    graficoMemoria.data.labels = [];
    graficoMemoria.data.datasets[0].data = [];
    memUso.innerHTML = ""; 
    memDisp.innerHTML = ""; 

    if(medidasMemoria.length == 0){
        graficoMemoria.data.labels = [];
        graficoMemoria.data.datasets[0].data = [];
    }else{
        graficoMemoria.data.labels.push("Em uso");
        graficoMemoria.data.datasets[0].data.push(medidasMemoria[0]);
        memUso.innerHTML = `Em uso: ${medidasMemoria[0]}%`; 

        // Memória disponível
        graficoMemoria.data.labels.push("Disponível");
        graficoMemoria.data.datasets[0].data.push(100 - medidasMemoria[0]);
        memDisp.innerHTML = "Disponível: " + (100 - medidasMemoria[0]) + "%";
    }

    graficoMemoria.update();
    
}

function plotarDadosDisco(){
    // Limpando gráfico antes de replotar
    graficoDisco.data.labels = [];
    graficoDisco.data.datasets[0].data = [];
    discoDisp.innerHTML = "";
    discoUso.innerHTML = "";

    if(medidasDisco.length == 0){
        graficoDisco.data.labels = [];
        graficoDisco.data.datasets[0].data = [];
    }else{
        graficoDisco.data.labels.push("Em uso");
        graficoDisco.data.datasets[0].data.push(medidasDisco[0]);
        discoUso.innerHTML = `Em uso: ${medidasDisco[0]}%`; 

        // Memória disponível
        graficoDisco.data.labels.push("Disponível");
        graficoDisco.data.datasets[0].data.push(100 - medidasDisco[0]);
        discoDisp.innerHTML = `Disponível: ${100 - medidasDisco[0]}%`;
    }

    graficoDisco.update();
    
}

// Atualizando dados quando troca opção no select
function selectAttGraficoW(){
    
    let idComputador = document.getElementById("select_windows").value;
    sessionStorage.setItem("idComputador", idComputador);
    getMedidas(idComputador);
}

// Atualizando dados quando troca opção no select
function selectAttGraficoL(){
    
    let idComputador = document.getElementById("select_linux").value;
    sessionStorage.setItem("idComputador", idComputador);
    getMedidas(idComputador);
}

// Função que será executada assim que a página iniciar
function carregamentoPagina() {
    if(sessionStorage.getItem('idComputador') == null){
        alert("Faltando ID do computador, voltando à tela de máquinas");
        location = "../tela_maquinas.html";
    }else{
    
    //Resgatando ID do computador
    let idComputador = sessionStorage.getItem('idComputador');

    //Plotando os dados pela primeira vez
    getMedidas(idComputador);
    // Plotando máquinas na combo box
    getMaquinas(sessionStorage.getItem('Hospital'));

    //Adicionando no <select> o hostname do computador selecionado
    //let hostname = sessionStorage.getItem("hostname");
    let SO = sessionStorage.getItem("SO");
    let elemento = "";
    let hostname = sessionStorage.getItem("hostname");

    // Após 3 segundos do carregamento da tela, plotaremos qual máquina foi selecionada no <select>
    let timeout;

    function temporizador() {
    timeout = setTimeout(alertFunc, 2500);
    }

    function alertFunc() {
        const $option = document.querySelector(`#${sessionStorage.getItem("hostname")}`);
        $option.selected = true;
    }

    temporizador();


    

    // Atualizando o gráfico a cada 7 segundos
    let intervalo = setInterval(() => {
        //Verificando qual é o computador na sessionStorage
        idComputador = sessionStorage.getItem('idComputador');

        getMedidas(idComputador);
    }, 5000);
}

}

carregamentoPagina();