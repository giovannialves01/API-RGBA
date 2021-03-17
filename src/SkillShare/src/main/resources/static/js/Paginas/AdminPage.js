function getSideBarOptions(){
    let options = [
    {
        name: "Cursos",
        onclick: function() {
            console.log("mostrando cursos");
        }
    }, 
    {
        name: "Biblioteca",
        onclick: function() {
            console.log("mostrando biblioteca");
        }
    },
    {
        name: "Banco de Questões",
        onclick: function() {
            console.log("mostrando banco de questões");
        }
    },
    {
        name: "Usuários",
        onclick: function() {
            console.log("mostrando usuários");
        }
    },
    {
        name: "Dashboard",
        onclick: function() {
            console.log("mostrando dashboard");
        }
    },
    {
        name: "Minha conta",
        onclick: function() {
            console.log("mostrando minha conta");
        }
    }
];

    return options;
}
