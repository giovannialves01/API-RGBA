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
    	let perfil = this.getAttribute("perfil");
        let container = this.buildSideBarContainer();
        let logo = this.buildLogoContainer();
        container.appendChild(logo);
        
        let optionsConfig = getSideBarOptions(perfil);

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
        logo.src = "images/logoSkillShare.PNG";
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
        let mainOptionContainer = document.createElement("div");
        let subOptionsContainer = document.createElement("div");

        // Opção principal
        mainOptionContainer.setAttribute("role", "button");
        mainOptionContainer.classList.add("mainOptionContainer");
        mainOptionContainer.tabIndex = option["tabIndex"];
        mainOptionContainer.title = option["title"];
        mainOptionContainer.onclick = function() {
            option["onclick"]();
        }
        mainOptionContainer.addEventListener("click", function(event) {
            let openedOptions = document.getElementsByClassName("showSubOptions");

            for (let i = 0; i < openedOptions.length; i++) {
                const option = openedOptions[i];
                
                if(option != this.nextElementSibling){
                    option.classList.remove("showSubOptions");
                    option.classList.add("hideSubOptions");
                }
 
            }

            if(this.nextElementSibling.classList.contains("showSubOptions")){
                this.nextElementSibling.classList.remove("showSubOptions");
                this.nextElementSibling.classList.add("hideSubOptions");
            }else{
                this.nextElementSibling.classList.remove("hideSubOptions");
                this.nextElementSibling.classList.add("showSubOptions");
            }

        });

        let icon = document.createElement("span");
        icon.className = "fas fa-" + option["icon"] + " fa-mainOptionContainerIcon";

        let optionText = document.createElement("label");
        optionText.textContent = option["name"];
        optionText.classList.add("optionContainerText");

        mainOptionContainer.appendChild(icon);
        mainOptionContainer.appendChild(optionText);




        // Sub opção
        subOptionsContainer.classList.add("subOptionsContainer")
        let subOptions = option["subOptions"];

        for (let i = 0; i < subOptions.length; i++) {
            const subOption = subOptions[i];

            let container = document.createElement("div");
            container.classList.add("subOption");
            container.onclick = function() {
                subOption["onclick"]();
            }
            
            let subOptionLabel = document.createElement("label");
            subOptionLabel.textContent = subOption["textValue"];
            subOptionLabel.classList.add("subOptionLabel");

            let subOptionIcon = document.createElement("span");
            subOptionIcon.className = "fas fa-minus" + " fa-subOptionContainerIcon";

            container.appendChild(subOptionIcon);
            container.appendChild(subOptionLabel);

            subOptionsContainer.appendChild(container);
        }



        optionContainer.appendChild(mainOptionContainer);
        optionContainer.appendChild(subOptionsContainer);


        return optionContainer;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("side-bar", SideBar);
