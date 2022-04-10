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
                        element.img_edit = "./assets/imgs/editar.png"
                        element.img_delete = "./assets/imgs/garbage.png"
                        const container = document.getElementById("container")
                        let card = document.createElement("div")
                        let tituloMaquina = document.createElement("h3")
                        let divSO = document.createElement("div")
                        let div_edit_delete = document.createElement("div")
                        let img_edit = document.createElement("div")
                        let img_delete = document.createElement("div")


                        tituloMaquina.innerHTML += element.nome;

                        container.appendChild(card)
                        card.appendChild(divSO)
                        card.appendChild(tituloMaquina)
                        card.appendChild(div_edit_delete)
                        div_edit_delete.appendChild(img_edit)
                        div_edit_delete.appendChild(img_delete)

                        tituloMaquina.classList.add("hostname")
                        card.classList.add("item_container")
                        divSO.classList.add("item_container_SO")
                        div_edit_delete.classList.add("div_edit_delete")
                        img_edit.classList.add("item_container_img_edit")
                        img_delete.classList.add("item_container_img_delete")

                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")"
                        img_edit.style.backgroundImage = "url(" + element.img_edit + ")"
                        img_delete.style.backgroundImage = "url(" + element.img_delete + ")"
                    } else {
                        element.imagemSO = "./assets/imgs/monitor-linux.png"
                        element.img_edit = "./assets/imgs/editar.png"
                        element.img_delete = "./assets/imgs/garbage.png"
                        const container = document.getElementById("container")
                        let card = document.createElement("div")
                        let tituloMaquina = document.createElement("h3")
                        let divSO = document.createElement("div")
                        let div_edit_delete = document.createElement("div")
                        let img_edit = document.createElement("div")
                        let img_delete = document.createElement("div")


                        tituloMaquina.innerHTML += element.nome;

                        container.appendChild(card)
                        card.appendChild(divSO)
                        card.appendChild(tituloMaquina)
                        card.appendChild(div_edit_delete)
                        div_edit_delete.appendChild(img_edit)
                        div_edit_delete.appendChild(img_delete)

                        tituloMaquina.classList.add("hostname")
                        card.classList.add("item_container")
                        divSO.classList.add("item_container_SO")
                        div_edit_delete.classList.add("div_edit_delete")
                        img_edit.classList.add("item_container_img_edit")
                        img_delete.classList.add("item_container_img_delete")

                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")"
                        img_edit.style.backgroundImage = "url(" + element.img_edit + ")"
                        img_delete.style.backgroundImage = "url(" + element.img_delete + ")"
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