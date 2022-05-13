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

setInterval(atualizarGraficoRAM, 10000);




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

function fnDeslogar() {
    /* A função de deslogar consiste em limpar a sessão local do usuário, o que significa 
    que ele não terá mais a váriavel booleana, indicando se ele está logado ou não, no 
    sistema, sendo assim, ele não consegue mais voltar à Dashboard*/
    sessionStorage.clear();
    // Logo após, ele é direcionado para a tela inicial do site.
    location = "index.html";
}

var grafico = 1;

if (sessionStorage.ID_GRAFICO[0] != 1) {
    grafico = sessionStorage.ID_GRAFICO[0];
    idComputador = sessionStorage.ID_GRAFICO[0];
}

// variável de proxima atualização
let proximaAtualizacao;    

// quando a janela carregar, executar a função obterDadosGrafico(1)
window.onload = obterDadosGrafico(grafico);

// função de obter dados do gráfico receberá o parâmetro com o id da maquina a ser buscado
function obterDadosGrafico(idComputador) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    // FETCH LEVANDO O PARÂMETRO DO ID DA  MAQUINA E FAZENDO UM "GET", OU SEJA, ELE IRÁ TRAZER O SELECT DOS DADOS DE ACORDO COM A GELADEIRA
    fetch(`/medida/tempo-real/${idComputador}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            // RESPOSTA TRANSFORMADA EM JSON (OBJETO) ENTÃO A FUNÇÃO ARMAZENARÁ OS DADOS NO PARÂMETRO RESPOSTA
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // inverter a ordem dos dados
                //resposta.reverse();

                // após trazer a resposta, levar ela para a função de plotar o gráfico
                plotarGrafico(resposta, idComputador);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// FUNÇÃO DE PLOTAGEM DE GRÁFICO TRAZENDO A RESPOSTA E O ID DA MÁQUINA
function plotarGrafico(resposta, idComputador) {
    console.log('iniciando plotagem do gráfico...');

    // VARIÁVEL DE DADOS RECEBERÁ OS DADOS OBTIDOS
    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-processamento',
                label: 'Processamento',
                borderColor: '#ab30398f',
                backgroundColor: '#cb5b578f',
                fill: true,
                data: [],
                position: 'right'
            }
        ]
    };

    // LAÇO DE REPETIÇÃO PARA ARMAZENAR OS DADOS DE HORA EM "LABELS"
    // OS DADOS DA CPU NO DATASET(0).DATA
    for (i = 0; i < 7; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.medida);
    }

    // CONSOLE IMPRIMIRÁ OS DADOS
    console.log(JSON.stringify(dados));

    // CONFIGURAÇÃO DO GRÁFICO DO TIPO 2D
    var ctx = lineChart.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        //Configurações do gráfico
        options: {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Histórico recente de processamento'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-processamento',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }                  
                }],
            }
        }
    });
    
    //Atualiza os dados de 2 em 2 segundos
    setTimeout(() => atualizarGrafico(idComputador, dados), 5000);
}



// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
var i = 6;
function atualizarGrafico(idComputador, dados) {
    fetch(`/medida/tempo-real/${idComputador}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

               
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[i + 1].momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro 
                dados.datasets[0].data.push(novoRegistro[i + 1].medida); // incluir uma nova medida
                i++;
                window.grafico_linha.update();

                proximaAtualizacao = setTimeout(() => atualizarGrafico(idComputador, dados), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idComputador, dados), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}