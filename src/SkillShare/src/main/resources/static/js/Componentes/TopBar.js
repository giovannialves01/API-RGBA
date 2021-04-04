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
            let menuBackground = document.getElementsByClassName("menuBackground")[0];
            let menu = document.getElementsByClassName("menu")[0];

            if(menuBackground.classList.contains("show")){
                menuBackground.classList.remove("show");
                menuBackground.classList.add("hide");

                menu.classList.remove("show");
                menu.classList.add("hide");
            }else{
                menuBackground.classList.remove("hide");
                menuBackground.classList.add("show");

                menu.classList.remove("hide");
                menu.classList.add("show");
            }
            
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
        label.textContent = "Entrar"

        div.appendChild(label);

        return div;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("top-bar", TopBar);
