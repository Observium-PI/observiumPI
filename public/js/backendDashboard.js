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

var idGrafico = 1;
var contagem_linha = 0;
var contagem_linha_mem = 0;

if (sessionStorage.ID_GRAFICO != 1) {
    var idGrafico = sessionStorage.ID_GRAFICO;
}

// variável de proxima atualização
let proximaAtualizacao;
let proximaAtualizacaoMem; 

// quando a janela carregar, executar a função obterDadosGrafico(1)
window.onload = obterDadosGrafico(idGrafico, contagem_linha);
window.onload = obterDadosGraficoMemoria(idGrafico, contagem_linha_mem);

//GRAFICO MEMORIA
// função de obter dados do gráfico receberá o parâmetro com o id da maquina a ser buscado
function obterDadosGraficoMemoria(idComputador, contagem_linha_mem) {
    if (proximaAtualizacaoMem != undefined) {
        clearTimeout(proximaAtualizacaoMem);
    }

    // FETCH LEVANDO O PARÂMETRO DO ID DA  MAQUINA E FAZENDO UM "GET", OU SEJA, ELE IRÁ TRAZER O SELECT DOS DADOS DE ACORDO COM A GELADEIRA
    fetch(`/medida/tempo-real-memoria/${idComputador}/${contagem_linha_mem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            // RESPOSTA TRANSFORMADA EM JSON (OBJETO) ENTÃO A FUNÇÃO ARMAZENARÁ OS DADOS NO PARÂMETRO RESPOSTA
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // inverter a ordem dos dados
                //resposta.reverse();

                // após trazer a resposta, levar ela para a função de plotar o gráfico
                plotarGraficoMemoria(resposta, idComputador, contagem_linha_mem);
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
function plotarGraficoMemoria(resposta, idComputador, contagem_linha_mem) {
    console.log('iniciando plotagem do gráfico...');

    // VARIÁVEL DE DADOS RECEBERÁ OS DADOS OBTIDOS
    var dadosM = {
        labels: [],
        datasets: [
            {
                borderColor: '#ab30398f',
                backgroundColor: '#cb5b578f',
                fill: true,
                data: []
            }
        ]
    };

    // LAÇO DE REPETIÇÃO PARA ARMAZENAR OS DADOS DE HORA EM "LABELS"
    // OS DADOS DA CPU NO DATASET(0).DATA
    for (i = 0; i <= 0; i++) {
        var registroMem = resposta[i];
        var registroMemDois = (100 - resposta[i].medida).toFixed(2);
        dadosM.labels.push(registroMem.medida);
        dadosM.datasets.push(registroMemDois);
    }

    // Definição inicial do gráfico de memória RAM
    let usoMem = dadosM.labels[0];
    let dispMem = dadosM.datasets[1];
    memDisp.innerHTML = `Disp: ${dispMem}`;
    memUso.innerHTML = `Em uso: ${usoMem}`;

    // CONSOLE IMPRIMIRÁ OS DADOS
    console.log(JSON.stringify(dadosM));

    // CONFIGURAÇÃO DO GRÁFICO DO TIPO 2D
    // Configuração do gráfico de memória RAM
    var ctx = donutChartOne.getContext('2d');
    window.grafico_donut_mem = Chart.Doughnut(ctx, {
        type: "doughnut",
        data: {
            labels: ["Em uso", "Restante"],
            datasets: [{
                data: [dadosM.labels[0], dadosM.datasets[1]],
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
    
    //Atualiza os dados de 7 em 7 segundos
    contagem_linha_mem++;
    setTimeout(() => atualizarGraficoMemoria(idComputador, contagem_linha_mem, dadosM), 10000);
}

function atualizarGraficoMemoria(idComputador, contagem_linha_mem, dadosM) {
    fetch(`/medida/tempo-real-memoria/${idComputador}/${contagem_linha_mem}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistroMem) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistroMem)}`);
                console.log(`Dados atuais do gráfico: ${dadosM}`);

                // tirando e colocando valores no gráfico
                grafico_donut_mem.data.datasets[0].data[0] = novoRegistroMem[0].medida; //incluir um novo momento
                
                var registroMemDois = (100 - novoRegistroMem[0].medida).toFixed(2);
                
                grafico_donut_mem.data.datasets[0].data[1] = registroMemDois; // incluir uma nova medida

                memDisp.innerHTML = `Disp: ${registroMemDois}`;
                memUso.innerHTML = `Em uso: ${novoRegistroMem[0].medida}`;

                i++;
                contagem_linha_mem++;
                window.grafico_donut_mem.update();

                proximaAtualizacaoMem = setTimeout(() => atualizarGraficoMemoria(idComputador, contagem_linha_mem, dadosM), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacaoMem = setTimeout(() => atualizarGraficoMemoria(idComputador, contagem_linha_mem, dadosM), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

//GRAFICO CPU
//função de obter dados do gráfico receberá o parâmetro com o id da maquina a ser buscado
function obterDadosGrafico(idComputador, contagem_linha) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    // FETCH LEVANDO O PARÂMETRO DO ID DA  MAQUINA E FAZENDO UM "GET", OU SEJA, ELE IRÁ TRAZER O SELECT DOS DADOS DE ACORDO COM A GELADEIRA
    fetch(`/medida/tempo-real/${idComputador}/${contagem_linha}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            // RESPOSTA TRANSFORMADA EM JSON (OBJETO) ENTÃO A FUNÇÃO ARMAZENARÁ OS DADOS NO PARÂMETRO RESPOSTA
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // inverter a ordem dos dados
                //resposta.reverse();

                // após trazer a resposta, levar ela para a função de plotar o gráfico
                plotarGrafico(resposta, idComputador, contagem_linha);
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
function plotarGrafico(resposta, idComputador, contagem_linha) {
    console.log('iniciando plotagem do gráfico...');

    // VARIÁVEL DE DADOS RECEBERÁ OS DADOS OBTIDOS
    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-processamento',
                label: 'Processamento',
                borderColor: '#0c1622',
                backgroundColor: 'rgba(12, 22, 34, 0.5)',
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
                text: 'Histórico recente de processamento',
                fontSize: 14,
                fontColor: 'white'
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
                        min: 0,
                        fontSize: 12, 
                        fontColor: "#FFF"
                    }                  
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0,
                        fontSize: 12, 
                        fontColor: "#FFF"
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });
    
    //Atualiza os dados de 7 em 7 segundos
    contagem_linha++;
    setTimeout(() => atualizarGrafico(idComputador, contagem_linha, dados), 10000);
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico(idComputador, contagem_linha, dados) {
    fetch(`/medida/tempo-real/${idComputador}/${contagem_linha}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);

               
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro 
                dados.datasets[0].data.push(novoRegistro[0].medida); // incluir uma nova medida
                i++;
                contagem_linha++;
                window.grafico_linha.update();

                proximaAtualizacao = setTimeout(() => atualizarGrafico(idComputador, contagem_linha, dados), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idComputador, contagem_linha, dados), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}