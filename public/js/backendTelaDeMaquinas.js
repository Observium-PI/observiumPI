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

                        //CRIANDO VARIAVEL QUE CONTEM OS ELEMENTOS HTML
                        const container = document.getElementById("container")
                        let card = document.createElement("div")
                        let tituloMaquina = document.createElement("h3")
                        let divSO = document.createElement("div")
                        let div_edit_delete = document.createElement("div")
                        let img_edit = document.createElement("a")
                        let img_delete = document.createElement("a")
                        let div_delete_modal = document.createElement("div")
                        let content_delete_modal = document.createElement("div")
                        let btn_fechar_delete_modal = document.createElement("a")
                        let txt_delete_modal = document.createElement("h3")
                        let btn_confirmar_delete_modal = document.createElement("a")
                        
                        //ADICIONANDO TEXTO EM CADA ELEMENTO A CADA VOLTA DO LAÇO
                        tituloMaquina.innerHTML += element.nome
                        txt_delete_modal.innerHTML = "Deseja mesmo excluir a "+element.nome+" ?"
                        btn_fechar_delete_modal.innerHTML = "X"
                        btn_confirmar_delete_modal.innerHTML = "CONFIRMAR"

                        //ATUALIZANDO O HREF DOS ELEMENTOS
                        img_edit.href = "#edit_modal_"+element.nome
                        img_delete.href = "#delete_modal_"+element.nome
                        btn_fechar_delete_modal.href = "#fechar"
                        btn_confirmar_delete_modal.href = "#confirmar"

                        //ATUALIZANDO O CLASSNAME DOS ELEMENTOS
                        tituloMaquina.classList.add("hostname")
                        card.classList.add("item_container")
                        divSO.classList.add("item_container_SO")
                        div_edit_delete.classList.add("div_edit_delete")
                        img_edit.classList.add("item_container_img_edit")
                        img_delete.classList.add("item_container_img_delete")
                        div_delete_modal.classList.add("delete_modal")
                        content_delete_modal.classList.add("content_delete_modal")
                        txt_delete_modal.classList.add("txt_delete_modal")
                        btn_fechar_delete_modal.classList.add("btn_fechar_delete_modal")
                        btn_confirmar_delete_modal.classList.add("btn_confirmar_delete_modal")

                        //ATUALIZANDO O IDNAME DO ELEMENTO
                        div_delete_modal.setAttribute("id", "delete_modal_"+element.nome);

                        //CONFIGURANDO URL DAS DIV COM IMAGENS
                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")"
                        img_edit.style.backgroundImage = "url(" + element.img_edit + ")"
                        img_delete.style.backgroundImage = "url(" + element.img_delete + ")"

                        //DEFININDO ONDE OS ELEMENTOS DEVERÃO SER CRIADOS NO HTML
                        container.appendChild(card)
                        card.appendChild(divSO)
                        card.appendChild(tituloMaquina)
                        card.appendChild(div_edit_delete)
                        div_edit_delete.appendChild(img_edit)
                        div_edit_delete.appendChild(img_delete)
                        container.appendChild(div_delete_modal)
                        div_delete_modal.appendChild(content_delete_modal)
                        content_delete_modal.appendChild(btn_fechar_delete_modal)
                        content_delete_modal.appendChild(txt_delete_modal)
                        content_delete_modal.appendChild(btn_confirmar_delete_modal)

                    } else {

                        element.imagemSO = "./assets/imgs/monitor-linux.png"
                        element.img_edit = "./assets/imgs/editar.png"
                        element.img_delete = "./assets/imgs/garbage.png"

                        //CRIANDO VARIAVEL QUE CONTEM OS ELEMENTOS HTML
                        const container = document.getElementById("container")
                        let card = document.createElement("div")
                        let tituloMaquina = document.createElement("h3")
                        let divSO = document.createElement("div")
                        let div_edit_delete = document.createElement("div")
                        let img_edit = document.createElement("a")
                        let img_delete = document.createElement("a")
                        let div_delete_modal = document.createElement("div")
                        let content_delete_modal = document.createElement("div")
                        let btn_fechar_delete_modal = document.createElement("a")
                        let txt_delete_modal = document.createElement("h3")
                        let btn_confirmar_delete_modal = document.createElement("a")
                        
                        //ADICIONANDO TEXTO EM CADA ELEMENTO A CADA VOLTA DO LAÇO
                        tituloMaquina.innerHTML += element.nome
                        txt_delete_modal.innerHTML = "Deseja mesmo excluir a "+element.nome+" ?";
                        btn_fechar_delete_modal.innerHTML = "X";
                        btn_confirmar_delete_modal.innerHTML = "CONFIRMAR";

                        //ATUALIZANDO O HREF DOS ELEMENTOS
                        img_edit.href = "#edit_modal_"+element.nome
                        img_delete.href = "#delete_modal_"+element.nome
                        btn_fechar_delete_modal.href = "#fechar"
                        btn_confirmar_delete_modal.href = "#confirmar"

                        //ATUALIZANDO O CLASSNAME DOS ELEMENTOS
                        tituloMaquina.classList.add("hostname")
                        card.classList.add("item_container")
                        divSO.classList.add("item_container_SO")
                        div_edit_delete.classList.add("div_edit_delete")
                        img_edit.classList.add("item_container_img_edit")
                        img_delete.classList.add("item_container_img_delete")
                        div_delete_modal.classList.add("delete_modal")
                        content_delete_modal.classList.add("content_delete_modal")
                        txt_delete_modal.classList.add("txt_delete_modal")
                        btn_fechar_delete_modal.classList.add("btn_fechar_delete_modal")
                        btn_confirmar_delete_modal.classList.add("btn_confirmar_delete_modal")

                        //ATUALIZANDO O IDNAME DO ELEMENTO
                        div_delete_modal.setAttribute("id", "delete_modal_"+element.nome);

                        //CONFIGURANDO URL DAS DIV COM IMAGENS
                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")"
                        img_edit.style.backgroundImage = "url(" + element.img_edit + ")"
                        img_delete.style.backgroundImage = "url(" + element.img_delete + ")"

                        //DEFININDO ONDE OS ELEMENTOS DEVERÃO SER CRIADOS NO HTML
                        container.appendChild(card)
                        card.appendChild(divSO)
                        card.appendChild(tituloMaquina)
                        card.appendChild(div_edit_delete)
                        div_edit_delete.appendChild(img_edit)
                        div_edit_delete.appendChild(img_delete)
                        container.appendChild(div_delete_modal)
                        div_delete_modal.appendChild(content_delete_modal)
                        content_delete_modal.appendChild(btn_fechar_delete_modal)
                        content_delete_modal.appendChild(txt_delete_modal)
                        content_delete_modal.appendChild(btn_confirmar_delete_modal)
                    }

                    console.log(element.nome);

                });

            })

        })

        .catch(error => {
            console.log("Erro: " + error)
        })

}