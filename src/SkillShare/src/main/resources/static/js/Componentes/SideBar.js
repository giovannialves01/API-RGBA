/**
 * Componente side bar da página de administrador
 * 
 * @author Rafael Furtado
 * @todo Adaptar para ser utilizado em outras páginas
 */
class SideBar extends HTMLElement{
    constructor(){
        super();

    }

    /**
     *--- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * @author Rafael Furtado
     * @returns undefined
     */
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

    /**
     * Constrói a div principal da sidebar
     * 
     * @author Rafael Furtado
     * @returns A div que é a sidebar em si
     */
    buildSideBarContainer(){
        let div = document.createElement("div");
        div.classList.add("sideBarContainer");

        return div;
    }

    /**
     * Constrói a div da sidebar que contém a logo do site
     * 
     * @author Rafael Furtado
     * @param {string} logoPath Caminho da imagem
     * @returns A div contendo a logo
     */
    buildLogoContainer(logoPath){
        let div = document.createElement("div");
        div.classList.add("logoContainer")

        let logoContainer = document.createElement("span");
        let logo = document.createElement("img");
        logo.src = "../static/images/logoSkillShare.PNG";
        logo.classList.add("image");

        logoContainer.appendChild(logo);

        div.appendChild(logoContainer);

        return div;

    }

    /**
     * Constrói um botão que será adicionado na side bar
     * 
     * @author Rafael Furtado
     * @param {array} option Array com osobjeto das configurações dos botão
     * @returns Retorna o botão da sidebar
     */
    buildOption(option){
        let optionContainer = document.createElement("div");
        optionContainer.setAttribute("role", "button");
        optionContainer.classList.add("optionContainer");
        optionContainer.tabIndex = option["tabIndex"];
        optionContainer.title = option["title"];
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
