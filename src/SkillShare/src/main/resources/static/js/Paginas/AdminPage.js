/**
 * Função responsável por fornecer um array com os objetos de configurações para cada botão
 * da side bar
 * 
 * @author Rafael Furtado
 * @returns Configurações dos botões da side bar
 */
function getSideBarOptions(){
    let options = [
    {
        name: "Cursos",
        icon: "chalkboard-teacher",
        tabIndex: "2",
        onclick: function() {
            console.log("mostrando cursos");

            hideAllContent();
        }
    }, 
    {
        name: "Biblioteca",
        icon: "book",
        tabIndex: "3",
        onclick: function() {
            console.log("mostrando biblioteca");

            hideAllContent();
        }
    },
    {
        name: "Banco de Questões",
        icon: "file-alt",
        tabIndex: "4",
        onclick: function() {
            console.log("mostrando banco de questões");

            hideAllContent();
        }
    },
    {
        name: "Usuários",
        icon: "users",
        tabIndex: "5",
        onclick: function() {
            console.log("mostrando usuários");

            hideAllContent();

            showContent("cadastrarUsuario");

        }
    },
    {
        name: "Dashboard",
        icon: "chart-line",
        tabIndex: "6",
        onclick: function() {
            console.log("mostrando dashboard");

            hideAllContent();
        }
    },
    {
        name: "Minha conta",
        icon: "user-circle",
        tabIndex: "7",
        onclick: function() {
            console.log("mostrando minha conta");

            hideAllContent();
        }
    }, 
    {
        name: "BibliotecaExclusao",
        onclick: function() {
            console.log("exclusao do livro em questao");
        }
    }, 
    {
        name: "BibliotecaEditar",
        onclick: function() {
            console.log("Edição de dados do livro");
        }
    }
];

    return options;
}


function hideAllContent() {
    let showedContents = document.getElementsByClassName("show");

    for (let i = 0; i < showedContents.length; i++) {
        const content = showedContents[i];
        
        content.classList.remove("show");
        content.classList.add("hide");

    }

}

function showContent(contentId) {
    let optionContent = document.getElementById(contentId);
    optionContent.classList.add("show");

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