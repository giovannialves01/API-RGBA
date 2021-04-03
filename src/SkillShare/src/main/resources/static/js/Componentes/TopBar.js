class TopBar extends HTMLElement{
    constructor(){
        super();

    }

    connectedCallback(){
        let topBar = this.buildTopBar();

        this.appendChild(topBar);
    }

    buildTopBar(){
        let container = document.createElement("div");
        container.classList.add("topBar");

        let menuBox = this.buildMenuBox();
        let topBarTitle = this.buildTopBarTitle();
        let topBarOptionsBox = this.buildTopBarOptionsBox();

        container.appendChild(menuBox);
        container.appendChild(topBarTitle);
        container.appendChild(topBarOptionsBox);

        return container;

    }

    buildMenuBox(){
        let div = document.createElement("div");
        div.classList.add("topBarMenuButton");
        div.onclick = function(){
            openMenu();
        }

        let span = document.createElement("span");
        span.className = "fas fa-bars topBarMenuButton-faIcon";

        let label = document.createElement("label");
        label.textContent = "Menu";

        div.appendChild(span);
        div.appendChild(label);

        return div;
    }

    buildTopBarTitle(){
        let label = document.createElement("label");
        label.classList.add("topBarTitle");
        
        let negrito = document.createElement("b");
        negrito.textContent = "SkillShare";

        label.appendChild(negrito);

        return label;
    }

    buildTopBarOptionsBox(){
        let div = document.createElement("div");
        div.classList.add("topBarOptionsDiv");

        let label = document.createElement("label");
        label.classList.add("topBarOptionLabel");

        let user = JSON.parse(window.sessionStorage.getItem("user"));

        if(user["userStatus"].includes("autenticado")){
            label.textContent = "Sair"
            label.onclick = function(){
                console.log("saindo");
            }
        }else{
            label.textContent = "Entrar"
            label.onclick = function(){
                console.log("entrando");
            }
        }

        div.appendChild(label);

        return div;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("top-bar", TopBar);
