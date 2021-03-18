class SideBar extends HTMLElement{
    constructor(){
        super();

    }

    connectedCallback(){
        let container = this.buildSideBarContainer();
        let logo = this.buildLogoContainer();
        container.appendChild(logo);
        
        let optionsConfig = getSideBarOptions();

        for (let i = 0; i < optionsConfig.length; i++) {
            const optionConfig = optionsConfig[i];
            
            container.appendChild(this.buildOption(optionConfig));

        }

        this.id = "sideBar";
        this.appendChild(container);
    }

    buildSideBarContainer(){
        let div = document.createElement("div");
        div.classList.add("sideBarContainer");


        return div;
    }

    buildLogoContainer(logoPath){
        let div = document.createElement("div");
        div.classList.add("logoContainer")

        let logoContainer = document.createElement("span");
        let logo = document.createElement("img");

        logoContainer.appendChild(logo);

        div.appendChild(logoContainer);

        return div;

    }

    buildOption(option){
        let optionContainer = document.createElement("div");
        optionContainer.classList.add("optionContainer");
        optionContainer.tabIndex = option["tabIndex"];
        optionContainer.onclick = function() {
            option["onclick"]();
        }

        let icon = document.createElement("span");
        icon.className = "fas fa-" + option["icon"] + " fa-optionContainerIcon";

        let optionText = document.createElement("label");
        optionText.textContent = option["name"];
        optionText.classList.add("optionContainerText");

        optionContainer.appendChild(icon);
        optionContainer.appendChild(optionText);

        return optionContainer;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("side-bar", SideBar);
