if (sessionStorage.getItem("logado") == false || sessionStorage.getItem("logado") == null) {
    location = "index.html";
} else {
    if(sessionStorage.getItem("tipoUsuario") == "admin"){
        const boxes_links = document.getElementById("boxes_links");
        let link_tela_funcionario = document.createElement("a");
        let icon_tela_funcionario = document.createElement("img");
        
        link_tela_funcionario.href = "tela_funcionarios.html";
        link_tela_funcionario.classList.add("box");
        
        icon_tela_funcionario.src = "./assets/imgs/target.png";
        
        boxes_links.appendChild(link_tela_funcionario);
        link_tela_funcionario.appendChild(icon_tela_funcionario);
    }

    // Requisição do tipo GET para a listagem de computadores
    fetch("computador/listar", {
        method: "GET",
        mode: "cors"
    })
        .then(response => {
            response.json().then(dados => {;
                // Com cada computador retornado, adicionamos ele à tela
                dados.forEach(element => {
                    element.imagemSO = (element.sistemaOperacional == "Windows") ? "./assets/imgs/monitor-windows.png" :  "./assets/imgs/monitor-linux.png";
                        element.img_edit = "./assets/imgs/editar.png";
                        element.img_delete = "./assets/imgs/garbage.png";

                        //CRIANDO VARIAVEL QUE CONTEM OS ELEMENTOS HTML
                        const container = document.getElementById("container");
                        let card = document.createElement("div");
                        let tituloMaquina = document.createElement("h3");
                        let divSO = document.createElement("div");
                        let div_edit_delete = document.createElement("div");
                        let img_edit = document.createElement("a");
                        let img_delete = document.createElement("a");
                        let div_delete_modal = document.createElement("div");
                        let div_edit_modal = document.createElement("div");
                        let content_delete_modal = document.createElement("div");
                        let content_edit_modal = document.createElement("div");
                        let btn_fechar_delete_modal = document.createElement("a");
                        let btn_fechar_edit_modal = document.createElement("a");
                        let txt_delete_modal = document.createElement("h3");
                        let txt_edit_modal = document.createElement("h3");
                        let btn_confirmar_delete_modal = document.createElement("a");
                        let input_modal_edit = document.createElement("input");
                        let btn_confirmar_edit_modal = document.createElement("a");
                        
                        //ADICIONANDO TEXTO EM CADA ELEMENTO A CADA VOLTA DO LAÇO
                        tituloMaquina.innerHTML += element.hostname;
                        txt_delete_modal.innerHTML = "Deseja mesmo excluir a "+element.hostname+" ?";
                        txt_edit_modal.innerHTML = "Alterar o nome de "+element.hostname+ " para: ";
                        btn_fechar_delete_modal.innerHTML = "X";
                        btn_fechar_edit_modal.innerHTML = "X";
                        btn_confirmar_delete_modal.innerHTML = "CONFIRMAR";
                        btn_confirmar_edit_modal.innerHTML = "CONFIRMAR";

                        //ATUALIZANDO O HREF DOS ELEMENTOS
                        img_edit.href = "#edit_modal_"+element.hostname;
                        img_delete.href = "#delete_modal_"+element.hostname;
                        btn_fechar_delete_modal.href = "#fechar";
                        btn_fechar_edit_modal.href = "#fechar";
                        btn_confirmar_delete_modal.href = "#confirmar";
                        btn_confirmar_edit_modal.href = "#confirmar";

                        //ATUALIZANDO O CLASSNAME DOS ELEMENTOS
                        tituloMaquina.classList.add("hostname");
                        card.classList.add("item_container");
                        divSO.classList.add("item_container_SO");
                        div_edit_delete.classList.add("div_edit_delete");
                        img_edit.classList.add("item_container_img_edit");
                        img_delete.classList.add("item_container_img_delete");
                        div_delete_modal.classList.add("delete_modal");
                        div_edit_modal.classList.add("edit_modal");
                        content_delete_modal.classList.add("content_delete_modal");
                        content_edit_modal.classList.add("content_edit_modal");
                        txt_delete_modal.classList.add("txt_delete_modal");
                        txt_edit_modal.classList.add("txt_edit_modal");
                        btn_fechar_delete_modal.classList.add("btn_fechar_delete_modal");
                        btn_fechar_edit_modal.classList.add("btn_fechar_edit_modal");
                        btn_confirmar_delete_modal.classList.add("btn_confirmar_delete_modal");
                        btn_confirmar_edit_modal.classList.add("btn_confirmar_edit_modal");
                        input_modal_edit.classList.add("input_modal_edit");

                        //ATUALIZANDO O IDNAME DO ELEMENTO
                        div_delete_modal.setAttribute("id", "delete_modal_"+ element.hostname);
                        div_edit_modal.setAttribute("id", "edit_modal_"+ element.hostname);
                        card.setAttribute("id", + element.idComputador)

                        //CONFIGURANDO URL DAS DIV COM IMAGENS
                        divSO.style.backgroundImage = "url(" + element.imagemSO + ")";
                        img_edit.style.backgroundImage = "url(" + element.img_edit + ")";
                        img_delete.style.backgroundImage = "url(" + element.img_delete + ")";

                        //Adicionando eventos para os clicks de excluir máquina
                        btn_confirmar_delete_modal.addEventListener("click", () => fnExcluir(element.idComputador));
                        btn_confirmar_edit_modal.addEventListener("click", () => fnEditar(element.idComputador, input_modal_edit.value));
                        divSO.addEventListener("click", () => id_grafico(element.idComputador));

                        //DEFININDO ONDE OS ELEMENTOS DEVERÃO SER CRIADOS NO HTML
                        container.appendChild(card);
                        card.appendChild(divSO);
                        card.appendChild(tituloMaquina);
                        card.appendChild(div_edit_delete);
                        div_edit_delete.appendChild(img_edit);
                        div_edit_delete.appendChild(img_delete);
                        container.appendChild(div_delete_modal);
                        div_delete_modal.appendChild(content_delete_modal);
                        content_delete_modal.appendChild(btn_fechar_delete_modal);
                        content_delete_modal.appendChild(txt_delete_modal);
                        content_delete_modal.appendChild(btn_confirmar_delete_modal);                     
                        container.appendChild(div_edit_modal);
                        div_edit_modal.appendChild(content_edit_modal);
                        content_edit_modal.appendChild(btn_fechar_edit_modal);
                        content_edit_modal.appendChild(txt_edit_modal);
                        content_edit_modal.appendChild(input_modal_edit);              
                        content_edit_modal.appendChild(btn_confirmar_edit_modal) ; 

                });

            })

        })

        .catch(error => {
            console.log("Estamos no catch!\nErro: " + error);
        })

}

function fnDeslogar(){
    /* A função de deslogar consiste em limpar a sessão local do usuário, o que significa 
    que ele não terá mais a váriavel booleana, indicando se ele está logado ou não, no 
    sistema, sendo assim, ele não consegue mais voltar à Dashboard*/
    sessionStorage.clear();
    // Logo após, ele é direcionado para a tela inicial do site.
    location = "index.html";
}

function id_grafico(idComputador){
    sessionStorage.setItem("ID_GRAFICO", idComputador);
    location.href = "../dashboard.html"
}


function fnExcluir(idComputador){
    let body = JSON.stringify({idComputador: idComputador});


    fetch("computador/excluir", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
    .then(resposta => {
        console.log("Resposta: " + resposta);
        alert("Máquina excluída com sucesso!");
        location = "tela_maquinas.html";
    })
    .catch(error => {
        console.log("Erro: " + error)
    })
}

function fnEditar(idComputador, novoNome){

    let body = JSON.stringify({idComputador: idComputador, novoNome: novoNome});

    fetch("computador/editar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
    .then(resposta =>{
        console.log("Resposta: " + resposta);
        alert("Máquina atualizada com sucesso!");
        location = "tela_maquinas.html";
    })
    .catch(error => {
        console.log("Erro: " + error);
    })
    
}