class Menu extends HTMLElement{
    constructor() {
        super();

    }

    async connectedCallback(){
        let menu = await this.buildMenuComponent();
        
        this.appendChild(menu);
    }

    async buildMenuComponent(){
        let background = this.buildBackground();
        let menu = await this.buildMenu();

        background.appendChild(menu);

        return background;
    }

    buildBackground(){
        let background = document.createElement("div");

        background.classList.add("menuBackground");
        background.addEventListener("click", function(event) {
            if(event.target == this){
                let subOptions = document.getElementsByClassName("subOptions");
                let menu = this.childNodes[0];

                menu.classList.remove("show");
                menu.classList.add("hide");

                this.classList.remove("show");
                this.classList.add("hide");

                for (let i = 0; i < subOptions.length; i++) {
                    const subOption = subOptions[i];
                    
                    subOption.classList.remove("expanded");
                    subOption.classList.remove("hiden");
                }

            }
            
        });

        return background;
    }

    async buildMenu(){
        let menu = document.createElement("div");
        menu.classList.add("menu");

        let logo = this.buildLogo();
        menu.appendChild(logo);

        let options = await this.getOptions();
        //let option = this.buildOption();

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            
            menu.appendChild(this.buildOption(option));
        }

        return menu;
    }

    buildLogo(){
        let logoContainer = document.createElement("div");
        logoContainer.classList.add("logoContainer");

        let logo = document.createElement("img");
        logo.classList.add("logo");
        logo.src = "images/logoSkillShare.PNG";

        logoContainer.appendChild(logo);

        return logoContainer;
    }

    buildOption(option){
        let optionContainer = document.createElement("div");
        optionContainer.classList.add("optionContainer");

        // Opção principal
        let mainOption = document.createElement("div");
        mainOption.classList.add("mainOption");
        mainOption.setAttribute("role", "button");
        mainOption.tabIndex = option["tabIndex"];
        mainOption.title = option["title"];
        mainOption.addEventListener("click", function(event){
            let subOptions = document.getElementsByClassName("subOptions");

            for (let i = 0; i < subOptions.length; i++) {
                const subOption = subOptions[i];
                
                if(this.nextSibling == subOption){
                    if(subOption.classList.contains("expanded")){
                        subOption.classList.remove("expanded");
                        subOption.classList.add("hiden");
                    }else{
                        subOption.classList.remove("hiden");
                        subOption.classList.add("expanded");
                    }
                }else{
                    if(subOption.classList.contains("expanded")){
                        subOption.classList.remove("expanded");
                        subOption.classList.add("hiden");
                    }
                }
            }
        });

        let mainOptionIcon = document.createElement("span");
        mainOptionIcon.className = "fas fa-" + option["icon"] + " mainOption-fa";

        let mainOptionLabel = document.createElement("label");
        mainOptionLabel.classList.add("mainOptionLabel");
        mainOptionLabel.textContent = option["name"];

        // Subopções
        let subOptions = document.createElement("div");
        subOptions.classList.add("subOptions");

        for (let x = 0; x < option["subOptions"].length; x++) {
            const subOption = option["subOptions"][x];
            
            subOptions.appendChild(this.buildSubOption(subOption));
        }

        mainOption.appendChild(mainOptionIcon);
        mainOption.appendChild(mainOptionLabel);

        optionContainer.appendChild(mainOption);
        optionContainer.appendChild(subOptions);

        return optionContainer;
    }

    buildSubOption(subOption){
        let subOptionContainer = document.createElement("div");
        subOptionContainer.classList.add("subOptionContainer");
        subOptionContainer.onclick = function () {
            Function(subOption["onclick"])();
        }

        let subOptionIcon = document.createElement("span");
        subOptionIcon.className = "fas fa-minus subOption-fa";

        let subOptionLabel = document.createElement("label");
        subOptionLabel.classList.add("subOption");
        subOptionLabel.textContent = subOption["textValue"];

        subOptionContainer.appendChild(subOptionIcon);
        subOptionContainer.appendChild(subOptionLabel);

        return subOptionContainer;
        
    }

    async getOptions(){
        let response = await serverRequester.fazerGet("/getAdminOptions");

        let options = response["responseJson"];

        return options;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("menu-rgba", Menu);