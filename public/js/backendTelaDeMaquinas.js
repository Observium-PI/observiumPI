if (sessionStorage.getItem("logado") == false || sessionStorage.getItem("logado") == null) {
    location = "index.html";
} else {
    // Requisição do tipo GET para a listagem de computadores
    fetch("computador/listar", {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            response.json().then(dados => {
                // Com cada computador retornado, adicionamos ele à tela
                dados.forEach(element => {
                    if (element.sistemaOperacional == "Windows") {
                        element.imagemSO = "./assets/imgs/monitor-windows.png"
                        const container = document.getElementById("container")
                        let card = document.createElement("div")
                        let tituloMaquina = document.createElement("h3")
                        let divSO = document.createElement("div")

                        tituloMaquina.innerHTML += element.nome;

                        container.appendChild(card)
                        card.appendChild(divSO)
                        card.appendChild(tituloMaquina)

                        tituloMaquina.classList.add("hostname")
                        card.classList.add("item_container")
                        divSO.classList.add("item_container_SO")

                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")"
                    } else {
                        element.imagemSO = "./assets/imgs/monitor-linux.png"
                        const container = document.getElementById("container")
                        let card = document.createElement("div")
                        let tituloMaquina = document.createElement("h3")
                        let divSO = document.createElement("div")

                        tituloMaquina.innerHTML += element.nome;

                        container.appendChild(card)
                        card.appendChild(divSO)
                        card.appendChild(tituloMaquina)

                        tituloMaquina.classList.add("hostname")
                        card.classList.add("item_container")
                        divSO.classList.add("item_container_SO")

                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")"
                    }
                    console.log("Oi: " + element.nome);

                });

            })

        })
        .catch(error => {
            console.log("Erro: " + error)
        })

    /*
    let listaMaquinas = [
        {
            nome: "Máquina 1",
            imagemSO: "./assets/imgs/monitor-windows.png"
        },
        {
            nome: "Máquina 2",
            imagemSO: "./assets/imgs/monitor-windows.png"
        },  
        {
            nome: "Máquina 3",
            imagemSO: "./assets/imgs/monitor-linux.png"
        },  
        {
            nome: "Máquina 4",
            imagemSO: "./assets/imgs/monitor-linux.png"
        },
        {
            nome: "Máquina 5",
            imagemSO: "./assets/imgs/monitor-windows.png"
        },   
        {
            nome: "Máquina 6",
            imagemSO: "./assets/imgs/monitor-linux.png"
        },  
        {
            nome: "Máquina 7",
            imagemSO: "./assets/imgs/monitor-windows.png"
        },  
        {
            nome: "Máquina 8",
            imagemSO: "./assets/imgs/monitor-windows.png"
        },
        {
            nome: "Máquina 9",
            imagemSO: "./assets/imgs/monitor-linux.png"
        },   
        {
            nome: "Máquina 10",
            imagemSO: "./assets/imgs/monitor-linux.png"
        },  
        {
            nome: "Máquina 11",
            imagemSO: "./assets/imgs/monitor-windows.png"
        },  
        {
            nome: "Máquina 12",
            imagemSO: "./assets/imgs/monitor-linux.png"
        },
        {
            nome: "Máquina 13",
            imagemSO: "./assets/imgs/monitor-linux.png"
        }
    ]; 
        
    for (let i = 0; i < listaMaquinas.length; i++) {
        const container = document.getElementById("container")
        let card = document.createElement("div")
        let tituloMaquina = document.createElement("h3")
        let divSO = document.createElement("div")

        tituloMaquina.innerHTML += listaMaquinas[i].nome

        container.appendChild(card)
        card.appendChild(divSO)
        card.appendChild(tituloMaquina)

        tituloMaquina.classList.add("hostname")
        card.classList.add("item_container")
        divSO.classList.add("item_container_SO")
        
        divSO.style.backgroundImage = "url(" + listaMaquinas[i].imagemSO + ")"
    }*/
}