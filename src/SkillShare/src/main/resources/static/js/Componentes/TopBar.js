class TopBar extends HTMLElement{
    constructor(){
        super();

    }

    connectedCallback(){
        let topbar = document.createElement("div");
        topbar.classList.add("topBarContainer");

        let exitLabel = document.createElement("label");
        exitLabel.textContent = "Sair";
        exitLabel.classList.add("topBarExitLabel");

        let topbarHomeButtonContainer = document.createElement("div");
        topbarHomeButtonContainer.classList.add("topBarHomeButtonContainer");

        let topbarHomeButtonLogo = document.createElement("span");
        topbarHomeButtonLogo.className = "fas fa-home";
        topbarHomeButtonLogo.classList.add("topBarHomeButtonLogo");


        let topbarHomeButtonText = document.createElement("label");
        topbarHomeButtonText.classList.add("topBarHomeButtonText");
        topbarHomeButtonText.textContent = "Página inicial"

        topbarHomeButtonContainer.appendChild(topbarHomeButtonLogo);
        topbarHomeButtonContainer.appendChild(topbarHomeButtonText);

        topbar.appendChild(topbarHomeButtonContainer);
        topbar.appendChild(exitLabel);

        this.appendChild(topbar);
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("top-bar", TopBar);
