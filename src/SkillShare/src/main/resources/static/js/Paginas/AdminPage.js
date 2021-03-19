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
        }
    }, 
    {
        name: "Biblioteca",
        icon: "book",
        tabIndex: "3",
        onclick: function() {
            console.log("mostrando biblioteca");
        }
    },
    {
        name: "Banco de Questões",
        icon: "file-alt",
        tabIndex: "4",
        onclick: function() {
            console.log("mostrando banco de questões");
        }
    },
    {
        name: "Usuários",
        icon: "users",
        tabIndex: "5",
        onclick: function() {
            console.log("mostrando usuários");
        }
    },
    {
        name: "Dashboard",
        icon: "chart-line",
        tabIndex: "6",
        onclick: function() {
            console.log("mostrando dashboard");
        }
    },
    {
        name: "Minha conta",
        icon: "user-circle",
        tabIndex: "7",
        onclick: function() {
            console.log("mostrando minha conta");
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