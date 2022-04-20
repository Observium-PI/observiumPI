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

        fetch("usuarios/listarUsuarios", {
            method: 'GET',
            mode: 'cors'
        })
            .then(response => {
                response.json().then(dados => {
                    dados.forEach(element => {
                        const user = document.getElementById("users")
                        let card = document.createElement("div")
                        let nome = document.createElement("span")
                        let login = document.createElement("span")
                        let email = document.createElement("span")
                        let setor = document.createElement("span")
                        let tipo = document.createElement("span")
                        let div_btns = document.createElement("div")
                        let btn_editar = document.createElement("div")
                        let btn_excluir = document.createElement("div")
                    
                        nome.innerHTML += element.nome
                        login.innerHTML += element.login
                        email.innerHTML += element.email
                        setor.innerHTML += element.setor
                        tipo.innerHTML += element.tipoUsuario
                    
                        user.appendChild(card)
                        card.appendChild(nome)
                        card.appendChild(login)
                        card.appendChild(email)
                        card.appendChild(setor)
                        card.appendChild(tipo)
                        card.appendChild(div_btns)
                        div_btns.appendChild(btn_editar)
                        div_btns.appendChild(btn_excluir)
                    
                        card.classList.add("card-user")
                        nome.classList.add("text-user")
                        login.classList.add("text-user")
                        email.classList.add("text-user")
                        setor.classList.add("text-user")
                        tipo.classList.add("text-user")
                        div_btns.classList.add("div-btns")
                        btn_editar.classList.add("btn-edit-user")
                        btn_excluir.classList.add("btn-delete-user")
                    
                        btn_excluir.setAttribute("id", "delete_modal_" + element.nome);
                        btn_editar.setAttribute("id", "edit_modal_" + element.nome);
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
