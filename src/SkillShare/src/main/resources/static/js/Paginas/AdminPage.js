/**
 * ADM -> Função responsável por fornecer um array com os objetos de configurações para cada botão
 * da side bar
 * 
 * @author Rafael Furtado
 * @returns Configurações dos botões da side bar
 */
function getSideBarOptionsAdmin(){
    let options = [
    {
        name: "Cursos",
        icon: "chalkboard-teacher",
        tabIndex: "2",
        title: "Clique aqui para exibir a janela de cursos",
        onclick: function() {
            console.log("mostrando cursos");

            hideAllContent();
        }
    }, 
    {
        name: "Biblioteca",
        icon: "book",
        tabIndex: "3",
        title: "Clique aqui para exibir a biblioteca",
        onclick: function() {
            console.log("mostrando biblioteca");

            hideAllContent();

            showContent("biblioteca");
        }
    },
    {
        name: "Banco de Questões",
        icon: "file-alt",
        tabIndex: "4",
        title: "Clique aqui para exibir o banco de questões",
        onclick: function() {
            console.log("mostrando banco de questões");

            hideAllContent();
        }
    },
    {
        name: "Usuários",
        icon: "users",
        tabIndex: "5",
        title: "Clique aqui para exibir o cadastro de alunos",
        onclick: function() {
            hideAllContent();

            beautyTable.refreshTable("tabelaUsuarios");

            showContent("cadastrarUsuario");

        }
    },
    {
        name: "Dashboard",
        icon: "chart-line",
        tabIndex: "6",
        title: "Clique aqui para exibir o dashboard",
        onclick: function() {
            console.log("mostrando dashboard");

            hideAllContent();
        }
    },
    {
        name: "Minha conta",
        icon: "user-circle",
        tabIndex: "7",
        title: "Clique aqui para exibir informações da sua conta",
        onclick: function() {
            console.log("mostrando minha conta");

            hideAllContent();
        }
    }, 
];

    return options;
}

/**
 * GESTOR -> Função responsável por fornecer um array com os objetos de configurações para cada botão
 * da side bar
 * 
 * @author Rafael Furtado
 * @returns Configurações dos botões da side bar
 */
function getSideBarOptionsGestor(){
    let options = [
    {
        name: "Cursos",
        icon: "chalkboard-teacher",
        tabIndex: "2",
        title: "Clique aqui para exibir a janela de cursos",
        onclick: function() {
            console.log("mostrando cursos");

            hideAllContent();
        }
    }, 
    {
        name: "Biblioteca",
        icon: "book",
        tabIndex: "3",
        title: "Clique aqui para exibir a biblioteca",
        onclick: function() {
            console.log("mostrando biblioteca");

            hideAllContent();

            showContent("biblioteca");
        }
    },
    {
        name: "Banco de Questões",
        icon: "file-alt",
        tabIndex: "4",
        title: "Clique aqui para exibir o banco de questões",
        onclick: function() {
            console.log("mostrando banco de questões");

            hideAllContent();
        }
    },
    {
        name: "Alunos",
        icon: "users",
        tabIndex: "5",
        title: "Clique aqui para exibir o cadastro de alunos",
        onclick: function() {
            hideAllContent();

            beautyTable.refreshTable("tabelaUsuarios");

            showContent("cadastrarUsuario");

        }
    },
    {
        name: "Eventos",
        icon: "calendar-day",
        tabIndex: "6",
        title: "Clique aqui para exibir o cadastro de eventos",
        onclick: function() {
            hideAllContent();
			console.log("eventos!");

        }
    },
    {
        name: "Destaques",
        icon: "newspaper",
        tabIndex: "7",
        title: "Clique aqui para exibir o cadastro de destaques",
        onclick: function() {
            hideAllContent();
			console.log("destaques!");

        }
    },
    {
        name: "Pílulas",
        icon: "capsules",
        tabIndex: "8",
        title: "Clique aqui para exibir o cadastro de pílulas de conhecimento",
        onclick: function() {
            hideAllContent();
			console.log("pilulas de conhecimento!");

        }
    },
    {
        name: "Dashboard",
        icon: "chart-line",
        tabIndex: "9",
        title: "Clique aqui para exibir o dashboard",
        onclick: function() {
            console.log("mostrando dashboard");

            hideAllContent();
        }
    },
    {
        name: "Minha conta",
        icon: "user-circle",
        tabIndex: "10",
        title: "Clique aqui para exibir informações da sua conta",
        onclick: function() {
            console.log("mostrando minha conta");

            hideAllContent();
        }
    }, 
];

    return options;
}


function tableData() {
    let data = {
        columns: {
            coluna1: "Meu nome",
            coluna2: "Meu cpf"
        },
        rows: [
            {
                coluna1: "meu nome",
                coluna2: "meu cpf"
            },
            {
                coluna1: "meu outro nome",
                coluna2: "meu outro cpf"
            }
        ],
        extraConfigs: [
            "editRowInfo",
            "deleteRowInfo"
        ]
    };

    return data;
}


/**
 * Esconde qualquer janela que estiver aberta na área de exibição de conteúdo da página
 * 
 * @author Rafael Furtado
 * @returns undefined
 */
function hideAllContent() {
    let showedContents = document.getElementsByClassName("show");

    for (let i = 0; i < showedContents.length; i++) {
        const content = showedContents[i];
        
        content.classList.remove("show");
        content.classList.add("hide");

    }

}


/**
 * Exibe um conteúdo específico na área de exibição de conteúdo da página
 * 
 * @author Rafael Furtado
 * @param {string} contentId ID do elemento que contém o conteúdo a ser exibido
 * @returns undefined
 */
function showContent(contentId) {
    let optionContent = document.getElementById(contentId);
    optionContent.classList.add("show");
    optionContent.classList.remove("hide");

}

async function registerUser(event) {
    event.preventDefault();

    let pass = document.getElementById("senha-beautyInput").value;
    let rePass = document.getElementById("cSenha-beautyInput").value;

    if(pass == rePass){
        let user = new Usuario();

        user.setNome(document.getElementById("nome-beautyInput").value);
        user.setEmail(document.getElementById("email-beautyInput").value);
        user.setCpf(document.getElementById("cpf-beautyInput").value);
        user.setSenha(pass);

        let response = await serverRequester.fazerPost("/aluno/cadastrar", user.toData());

        if(response["ok"] == true){
            alert("Cadastrado com sucesso!");

        }else{
            alert("Ocorreu um erro ao cadastrar o cliente");

        }

    }else{
        alert("Senha diferentes!");

    }

    beautyTable.refreshTable("tabelaUsuarios");

}

function registerBook(event) {
    event.preventDefault();

    console.log(event);
    console.log(event.target);
}

// Adiciona um listener global responsável por mudar a cor dos botões da side bar que forem selecionados
//ainda não está funcionando como deveria :c
/*
window.addEventListener("click", function (event) {
    let clickTarget = event.target;
    if(event.target.tagName == "SPAN" || event.target.tagName == "LABEL"){
        clickTarget = event.target.parentElement;
    }

    console.log(clickTarget);

    let selections = document.getElementsByClassName("optionContainerSelected");
    for (let i = 0; i < selections.length; i++) {
        const selection = selections[i];
        
        selection.classList.remove("optionContainerSelected")
    }
    
    clickTarget.classList.add("optionContainerSelected");

});
*/

function seeInfo() {
    let selectedRow = document.getElementsByClassName("selectedRow")[0];

    console.log(selectedRow);
}

function getSideBarOptions(perfil) {
	switch (perfil) {
		case "gestor":
			return getSideBarOptionsGestor();
		case "admin":
			return getSideBarOptionsAdmin();
	}
}