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

// Definição inicial do gráfico de memória RAM
let usoDisc = 50;
let dispDisc = 50;
discDisp.innerHTML = `Disp: X`;
discUso.innerHTML = `Em uso: X`;

// Definição inicial do gráfico de memória RAM
let usoMem = 50;
let dispMem = 50;
memDisp.innerHTML = `Disp: X`;
memUso.innerHTML = `Em uso: X`;

// Configuração do gráfico principal, o de processador
let graficoDeProcessador = new Chart("lineChart", {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            data: [],
            borderColor: "white",
            fill: false,
            grid: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: "#FFF"
                },
                gridLines: {
                    display: true,
                    color: "#0c1622"
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: "#FFF"
                },
                gridLines: {
                    display: true,
                    color: "#0c1622"
                }
            }]
        },
        legend: {
            display: false
        }
    }
});

// Configuração do gráfico de memória RAM
let graficoDeMemoria = new Chart("donutChartOne", {
    type: "doughnut",
    data: {
        labels: ["Em uso", "Restante"],
        datasets: [{
            data: [usoMem, dispMem],
            borderColor: "#0a518f",
            backgroundColor: ["white", "#0c1622"],
            fill: false
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});

let graficoDeDisco = new Chart("donutChartTwo", {
    type: "doughnut",
    data: {
        labels: ["Em uso", "Restante"],
        datasets: [{
            data: [usoDisc, dispDisc],
            borderColor: "#0a518f",
            backgroundColor: ["white", "#0c1622"],
            fill: false
        }]
    },
    options: {
        legend: {
            display: false
        }
    }
}); 

 // Função que gera os dados no gráfico
function atualizarGraficoProcessador() {
    let data = new Date();
    let minutos = data.getMinutes();
    let segundos = data.getSeconds();

    if (minutos < 10) {
        minutos = "0" + data.getMinutes();
    }

    if (segundos < 10) {
        segundos = "0" + data.getSeconds();
    }


    graficoDeProcessador.data.labels.push(data.getHours() + ":" + minutos + ":" + segundos);
    graficoDeProcessador.data.datasets[0].data.push(Math.random() * 80);
    graficoDeProcessador.update();
}

// Função que gera dados no gráfico
function atualizarGraficoRAM() {
    usoMem = Math.random() * 10;
    dispMem = Math.random() * 10;

    graficoDeMemoria.data.labels = ["Em uso", "Restante"];
    graficoDeMemoria.data.datasets[0].data = [usoMem, dispMem];
    graficoDeMemoria.update();

    escreverTexto();
}

// Função que atualiza os dados do gráfico de Disco
function atualizarGraficoDisco() {
    usoDisc = Math.random() * 10;
    dispDisc = Math.random() * 10;

    graficoDeDisco.data.labels = ["Em uso", "Restante"];
    graficoDeDisco.data.datasets[0].data = [usoDisc, dispDisc];
    graficoDeDisco.update();

    escreverTexto();
}

/*Descomente essa linha parar gerar dados a cada 10 segundos no gráfico de memória RAM 
 setInterval(atualizarGraficoRAM, 10000);
*/

/* Descomente essa linha para gerar dados no gráfico de disco
setInterval(atualizarGraficoDisco, 10000);
*/

//Descomente essa linha para gerar dados a cada 10 segundos
// setInterval(atualizarGraficoProcessador, 10000);


// Atualiza textos na div dos dois gráficos pizza (Memória RAM e Disco)
function escreverTexto() {
    memDisp.innerHTML = `Disp: ${dispMem.toFixed(1)}Gb`;
    memUso.innerHTML = `Em uso: ${usoMem.toFixed(1)}Gb`;

    discDisp.innerHTML = `Disp: ${dispDisc.toFixed(1)}%`;
    discUso.innerHTML = `Em uso: ${usoDisc.toFixed(1)}%`;
}


/*
let listaStatus = [
    {
        nome: "Máquina 1",
        sistemaOperacional: "windows"
    },
    {
        nome: "Máquina 2",
        sistemaOperacional: "windows"
    },
    {
        nome: "Máquina 3",
        sistemaOperacional: "linux"
    },
    {
        nome: "Máquina 4",
        sistemaOperacional: "linux"
    },
    {
        nome: "Máquina 5",
        sistemaOperacional: "windows"
    },
    {
        nome: "Máquina 6",
        sistemaOperacional: "linux"
    },
    {
        nome: "Máquina 7",
        sistemaOperacional: "windows"
    },
    {
        nome: "Máquina 8",
        sistemaOperacional: "windows"
    },
    {
        nome: "Máquina 9",
        sistemaOperacional: "linux"
    },
    {
        nome: "Máquina 10",
        sistemaOperacional: "linux"
    },
    {
        nome: "Máquina 11",
        sistemaOperacional: "windows"
    },
    {
        nome: "Máquina 12",
        sistemaOperacional: "linux"
    },
    {
        nome: "Máquina 13",
        sistemaOperacional: "linux"
    }
];

for (let i = 0; i < listaStatus.length; i++) {
    const container = document.getElementById("select_windows")

    if (listaStatus[i].sistemaOperacional == "windows") {
        let option = document.createElement("option")
        option.innerHTML += listaStatus[i].nome
        container.appendChild(option)
        option.classList.add("option-box")
    }
}

for (let i = 0; i < listaStatus.length; i++) {
    const container = document.getElementById("select_linux")

    if (listaStatus[i].sistemaOperacional == "linux") {
        let option = document.createElement("option")
        option.innerHTML += listaStatus[i].nome
        container.appendChild(option)
        option.classList.add("option-box")
    }
}
*/
function fnDeslogar() {
    /* A função de deslogar consiste em limpar a sessão local do usuário, o que significa 
    que ele não terá mais a váriavel booleana, indicando se ele está logado ou não, no 
    sistema, sendo assim, ele não consegue mais voltar à Dashboard*/
    sessionStorage.clear();
    // Logo após, ele é direcionado para a tela inicial do site.
    location = "index.html";
}