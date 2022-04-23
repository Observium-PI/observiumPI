if (sessionStorage.getItem("logado") == false || sessionStorage.getItem("logado") == null) {
    location = "index.html";
} else {
    if (sessionStorage.getItem("tipoUsuario") == "admin") {
        const boxes_links = document.getElementById("boxes_links")
        let link_tela_funcionario = document.createElement("a")
        let icon_tela_funcionario = document.createElement("img")

        link_tela_funcionario.href = "tela_funcionarios.html"
        link_tela_funcionario.classList.add("box")

        icon_tela_funcionario.src = "./assets/imgs/target.png"

        boxes_links.appendChild(link_tela_funcionario)
        link_tela_funcionario.appendChild(icon_tela_funcionario)
    }

    const myInput = document.querySelector('input')

    function debounce(func, wait) {
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(func, wait);
        }
    }

    myInput.addEventListener('input', debounce(function () {
        pesquisa = document.getElementById('pesquisa').value

        if(pesquisa != ""){

        let body = JSON.stringify({ pesquisa: pesquisa });

        fetch("usuarios/pesquisarUsuarios", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(response => {
                response.json().then(dados => {
                    dados.forEach(element => {
                        const user = document.getElementById("users");
                        user.innerHTML = "";

                        const container = document.getElementById("container");
                        let card = document.createElement("div")
                        let nome = document.createElement("span")
                        let login = document.createElement("span")
                        let email = document.createElement("span")
                        let setor = document.createElement("span")
                        let tipo = document.createElement("span")
                        let div_btns = document.createElement("div")
                        let btn_editar = document.createElement("a")
                        let btn_excluir = document.createElement("a")
                        let div_delete_modal = document.createElement("div")
                        let div_edit_modal = document.createElement("div")
                        let edit_modal = document.createElement("div");
                        let content_delete_modal = document.createElement("div")
                        let btn_fechar_delete_modal = document.createElement("a")
                        let txt_delete_modal = document.createElement("h3")
                        let btn_confirmar_delete_modal = document.createElement("a")

                        txt_delete_modal.innerHTML = "Deseja mesmo excluir a " + element.nome + " ?"
                        btn_fechar_delete_modal.innerHTML = "X"
                        btn_confirmar_delete_modal.innerHTML = "CONFIRMAR"
                        nome.innerHTML += element.nome
                        login.innerHTML += element.login
                        email.innerHTML += element.email
                        setor.innerHTML += element.setor
                        tipo.innerHTML += element.tipoUsuario

                        edit_modal.innerHTML = `
                        <div class="content_edit_modal">
                            <a href="#" class="btn_fechar_edit_modal">X</a>
            
                            <b>Editar Usuário</b>
            
                            <div class="editarConteudo">
                                <b>Nome</b>
                                <input id="nome_input_${element.idUsuario}" type="text" value="${element.nome}">
                            </div>
            
                            <div class="editarConteudo">
                                <b>Senha</b>
                                <input id="senha_input_${element.idUsuario}" type="text" value="${element.senha}">
                            </div>
            
                            <div class=editarConteudo">
                                <Button id="btn_confirmar_editar" onClick="fnEditar(${element.idUsuario},nome_input_${element.idUsuario},senha_input_${element.idUsuario})">Editar</Button>
                            </div>
            
                        </div>`;

                        //btn dentro dos modals
                        btn_fechar_delete_modal.href = "#fechar"
                        btn_confirmar_delete_modal.href = "#confirmar"
                        //btn da lista
                        btn_editar.href = "#edit_modal_" + element.idUsuario
                        btn_excluir.href = "#delete_modal_" + element.idUsuario

                        card.classList.add("card-user")
                        nome.classList.add("text-user")
                        login.classList.add("text-user")
                        email.classList.add("text-user")
                        setor.classList.add("text-user")
                        tipo.classList.add("text-user")
                        div_btns.classList.add("div-btns")
                        btn_editar.classList.add("btn-edit-user")
                        btn_excluir.classList.add("btn-delete-user")
                        div_delete_modal.classList.add("delete_modal")
                        content_delete_modal.classList.add("content_delete_modal")
                        txt_delete_modal.classList.add("txt_delete_modal")
                        btn_fechar_delete_modal.classList.add("btn_fechar_delete_modal")
                        btn_confirmar_delete_modal.classList.add("btn_confirmar_delete_modal")

                        div_delete_modal.setAttribute("id", "delete_modal_" + element.idUsuario);
                        div_edit_modal.setAttribute("id", "edit_modal_" + element.idUsuario);

                        //função para o botão dentro de cada modal
                        btn_confirmar_delete_modal.addEventListener("click", () => fnExcluir(element.idUsuario));

                        edit_modal.classList.add("div_modal_edit");
                        edit_modal.setAttribute("id", "edit_modal_" + element.idUsuario);

                        user.appendChild(card)
                        card.appendChild(nome)
                        card.appendChild(login)
                        card.appendChild(email)
                        card.appendChild(setor)
                        card.appendChild(tipo)
                        card.appendChild(div_btns)
                        div_btns.appendChild(btn_editar)
                        div_btns.appendChild(btn_excluir)
                        users.appendChild(div_delete_modal)
                        div_delete_modal.appendChild(content_delete_modal)
                        content_delete_modal.appendChild(btn_fechar_delete_modal)
                        content_delete_modal.appendChild(txt_delete_modal)
                        content_delete_modal.appendChild(btn_confirmar_delete_modal)
                        container.appendChild(edit_modal)
                    });
                })
            })
            .catch()
        }else{
            const user = document.getElementById("users")
            user.innerHTML = "";

            fetch("usuarios/listarUsuarios", {
                method: 'GET',
                mode: 'cors'
            })
                .then(response => {
                    response.json().then(dados => {
                        dados.forEach(element => {
                            const container = document.getElementById("container");
                            let card = document.createElement("div")
                            let nome = document.createElement("span")
                            let login = document.createElement("span")
                            let email = document.createElement("span")
                            let setor = document.createElement("span")
                            let tipo = document.createElement("span")
                            let div_btns = document.createElement("div")
                            let btn_editar = document.createElement("a")
                            let btn_excluir = document.createElement("a")
                            let div_delete_modal = document.createElement("div")
                            let div_edit_modal = document.createElement("div")
                            let edit_modal = document.createElement("div");
                            let content_delete_modal = document.createElement("div")
                            let btn_fechar_delete_modal = document.createElement("a")
                            let txt_delete_modal = document.createElement("h3")
                            let btn_confirmar_delete_modal = document.createElement("a")
        
                            txt_delete_modal.innerHTML = "Deseja mesmo excluir a " + element.nome + " ?"
                            btn_fechar_delete_modal.innerHTML = "X"
                            btn_confirmar_delete_modal.innerHTML = "CONFIRMAR"
                            nome.innerHTML += element.nome
                            login.innerHTML += element.login
                            email.innerHTML += element.email
                            setor.innerHTML += element.setor
                            tipo.innerHTML += element.tipoUsuario
        
                            edit_modal.innerHTML = `
                                <div class="content_edit_modal">
                                    <a href="#" class="btn_fechar_edit_modal">X</a>
                    
                                    <b>Editar Usuário</b>
                    
                                    <div class="editarConteudo">
                                        <b>Nome</b>
                                        <input id="nome_input_${element.idUsuario}" type="text" value="${element.nome}">
                                    </div>
                    
                                    <div class="editarConteudo">
                                        <b>Senha</b>
                                        <input id="senha_input_${element.idUsuario}" type="text" value="${element.senha}">
                                    </div>
                    
                                    <div class=editarConteudo">
                                        <Button id="btn_confirmar_editar" onClick="fnEditar(${element.idUsuario},nome_input_${element.idUsuario},senha_input_${element.idUsuario})">Editar</Button>
                                    </div>
                    
                                </div>`;
        
                            //btn dentro dos modals
                            btn_fechar_delete_modal.href = "#fechar"
                            btn_confirmar_delete_modal.href = "#confirmar"
                            //btn da lista
                            btn_editar.href = "#edit_modal_" + element.idUsuario
                            btn_excluir.href = "#delete_modal_" + element.idUsuario
        
                            card.classList.add("card-user")
                            nome.classList.add("text-user")
                            login.classList.add("text-user")
                            email.classList.add("text-user")
                            setor.classList.add("text-user")
                            tipo.classList.add("text-user")
                            div_btns.classList.add("div-btns")
                            btn_editar.classList.add("btn-edit-user")
                            btn_excluir.classList.add("btn-delete-user")
                            div_delete_modal.classList.add("delete_modal")
                            content_delete_modal.classList.add("content_delete_modal")
                            txt_delete_modal.classList.add("txt_delete_modal")
                            btn_fechar_delete_modal.classList.add("btn_fechar_delete_modal")
                            btn_confirmar_delete_modal.classList.add("btn_confirmar_delete_modal")
        
                            div_delete_modal.setAttribute("id", "delete_modal_" + element.idUsuario);
                            div_edit_modal.setAttribute("id", "edit_modal_" + element.idUsuario);
        
                            //função para o botão dentro de cada modal
                            btn_confirmar_delete_modal.addEventListener("click", () => fnExcluir(element.idUsuario));
        
                            edit_modal.classList.add("div_modal_edit");
                            edit_modal.setAttribute("id", "edit_modal_" + element.idUsuario);
        
                            user.appendChild(card)
                            card.appendChild(nome)
                            card.appendChild(login)
                            card.appendChild(email)
                            card.appendChild(setor)
                            card.appendChild(tipo)
                            card.appendChild(div_btns)
                            div_btns.appendChild(btn_editar)
                            div_btns.appendChild(btn_excluir)
                            users.appendChild(div_delete_modal)
                            div_delete_modal.appendChild(content_delete_modal)
                            content_delete_modal.appendChild(btn_fechar_delete_modal)
                            content_delete_modal.appendChild(txt_delete_modal)
                            content_delete_modal.appendChild(btn_confirmar_delete_modal)
                            container.appendChild(edit_modal)
                        });
                    })
                })
                .catch()
        }

    }, 500));

    fetch("usuarios/listarUsuarios", {
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            response.json().then(dados => {
                dados.forEach(element => {
                    const user = document.getElementById("users")
                    const container = document.getElementById("container");
                    let card = document.createElement("div")
                    let nome = document.createElement("span")
                    let login = document.createElement("span")
                    let email = document.createElement("span")
                    let setor = document.createElement("span")
                    let tipo = document.createElement("span")
                    let div_btns = document.createElement("div")
                    let btn_editar = document.createElement("a")
                    let btn_excluir = document.createElement("a")
                    let div_delete_modal = document.createElement("div")
                    let div_edit_modal = document.createElement("div")
                    let edit_modal = document.createElement("div");
                    let content_delete_modal = document.createElement("div")
                    let btn_fechar_delete_modal = document.createElement("a")
                    let txt_delete_modal = document.createElement("h3")
                    let btn_confirmar_delete_modal = document.createElement("a")

                    txt_delete_modal.innerHTML = "Deseja mesmo excluir a " + element.nome + " ?"
                    btn_fechar_delete_modal.innerHTML = "X"
                    btn_confirmar_delete_modal.innerHTML = "CONFIRMAR"
                    nome.innerHTML += element.nome
                    login.innerHTML += element.login
                    email.innerHTML += element.email
                    setor.innerHTML += element.setor
                    tipo.innerHTML += element.tipoUsuario

                    edit_modal.innerHTML = `
                        <div class="content_edit_modal">
                            <a href="#" class="btn_fechar_edit_modal">X</a>
            
                            <b>Editar Usuário</b>
            
                            <div class="editarConteudo">
                                <b>Nome</b>
                                <input id="nome_input_${element.idUsuario}" type="text" value="${element.nome}">
                            </div>
            
                            <div class="editarConteudo">
                                <b>Senha</b>
                                <input id="senha_input_${element.idUsuario}" type="text" value="${element.senha}">
                            </div>
            
                            <div class=editarConteudo">
                                <Button id="btn_confirmar_editar" onClick="fnEditar(${element.idUsuario},nome_input_${element.idUsuario},senha_input_${element.idUsuario})">Editar</Button>
                            </div>
            
                        </div>`;

                    //btn dentro dos modals
                    btn_fechar_delete_modal.href = "#fechar"
                    btn_confirmar_delete_modal.href = "#confirmar"
                    //btn da lista
                    btn_editar.href = "#edit_modal_" + element.idUsuario
                    btn_excluir.href = "#delete_modal_" + element.idUsuario

                    card.classList.add("card-user")
                    nome.classList.add("text-user")
                    login.classList.add("text-user")
                    email.classList.add("text-user")
                    setor.classList.add("text-user")
                    tipo.classList.add("text-user")
                    div_btns.classList.add("div-btns")
                    btn_editar.classList.add("btn-edit-user")
                    btn_excluir.classList.add("btn-delete-user")
                    div_delete_modal.classList.add("delete_modal")
                    content_delete_modal.classList.add("content_delete_modal")
                    txt_delete_modal.classList.add("txt_delete_modal")
                    btn_fechar_delete_modal.classList.add("btn_fechar_delete_modal")
                    btn_confirmar_delete_modal.classList.add("btn_confirmar_delete_modal")

                    div_delete_modal.setAttribute("id", "delete_modal_" + element.idUsuario);
                    div_edit_modal.setAttribute("id", "edit_modal_" + element.idUsuario);

                    //função para o botão dentro de cada modal
                    btn_confirmar_delete_modal.addEventListener("click", () => fnExcluir(element.idUsuario));

                    edit_modal.classList.add("div_modal_edit");
                    edit_modal.setAttribute("id", "edit_modal_" + element.idUsuario);

                    user.appendChild(card)
                    card.appendChild(nome)
                    card.appendChild(login)
                    card.appendChild(email)
                    card.appendChild(setor)
                    card.appendChild(tipo)
                    card.appendChild(div_btns)
                    div_btns.appendChild(btn_editar)
                    div_btns.appendChild(btn_excluir)
                    users.appendChild(div_delete_modal)
                    div_delete_modal.appendChild(content_delete_modal)
                    content_delete_modal.appendChild(btn_fechar_delete_modal)
                    content_delete_modal.appendChild(txt_delete_modal)
                    content_delete_modal.appendChild(btn_confirmar_delete_modal)
                    container.appendChild(edit_modal)
                });
            })
        })
        .catch()

}

function fnDeslogar() {
    /* A função de deslogar consiste em limpar a sessão local do usuário, o que significa 
    que ele não terá mais a váriavel booleana, indicando se ele está logado ou não, no 
    sistema, sendo assim, ele não consegue mais voltar à Dashboard*/
    sessionStorage.clear();
    // Logo após, ele é direcionado para a tela inicial do site.
    location = "index.html";
}

function fnEditar(idUsuario, nome_input, senha_input) {

    let novoNome = nome_input.value
    let novaSenha = senha_input.value
    let body = JSON.stringify({ idUsuario: idUsuario, novoNome: novoNome, novaSenha: novaSenha });

    fetch("usuarios/alterarUsuarios", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(resposta => {
            console.log("Resposta: " + resposta);
            alert("Usuário atualizado com sucesso!");
            location = 'tela_funcionarios.html';
        })
        .catch(error => {
            console.log("Erro: " + error)
        })

}

function fnExcluir(idUsuario) {
    let body = JSON.stringify({ idUsuario: idUsuario });


    fetch("usuarios/desligarUsuarios", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body
    })
        .then(resposta => {
            console.log("Resposta: " + resposta);
            alert("Máquina excluída com sucesso!");
            location = 'tela_funcionarios.html';
        })
        .catch(error => {
            console.log("Erro: " + error)
        })
}