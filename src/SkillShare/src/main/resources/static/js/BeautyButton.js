class BeautyButton extends HTMLElement{
    constructor() {
        super();
    }

    connectedCallback(){

    }

    buildBeautyButton(text, callback){
        let button = document.createElement("button");
        button.classList.add("beautyButton");
        button.textContent = "Cadastrar";
        button.title = "Cadastrar";

        button.onclick = function () {
            console.log("Cadastro realizado!");

        }

        return button;
    }

}

customElements.define("beauty-button", BeautyButton);
