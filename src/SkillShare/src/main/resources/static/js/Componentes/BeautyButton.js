/**
 * Classe do Web Component BeautyButton (tag beauty-input), responsável por fornecer botões personalizados
 * para cada situação necessária
 * 
 * Para utilizar o componente diretamente na página HTML, pode-se adicionar os seguintes atributos:
 * 
 * - text - Texto que ficara dentro do botão
 * - title - Texto da dica flutuante
 * - type - Tipo do botão. default: "normal" / Tipos possíveis: "normal" | "red"
 * - onclick - Função a ser chamada após clicar no botão
 * 
 * @author Rafael Furtado
 * @dependencies A classe é dependente dos arquivos de estilos BeautyButton.css e GlobalComponents.css
 */
class BeautyButton extends HTMLElement{
    constructor() {
        super();

        this.title;
        this.text;
        this.type;
    }

    /**
     *--- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * @author Rafael Furtado
     * @returns undefined
     */
    connectedCallback(){
        this.title = this.getAttribute("title");
        this.text = this.getAttribute("text");
        this.type = this.getAttribute("type");
        let onclick = this.onclick;
        this.onclick = "";
        this.appendChild(this.buildBeautyButton(this.text, this.title, this.type, onclick));

    }

    /**
     * Constrói o componente BeautyButton e retorna seu elemento
     * 
     * @author Rafael Furtado
     * @param {string} text Texto do botão
     * @param {function} callback Função à ser chamando quando o botão for clicado
     * @returns Elemento do botão
     */
    buildBeautyButton(text, title, type, callback){
        let button = document.createElement("button");
        button.classList.add("beautyButton");
        button.textContent = text;
        button.title = title;

        if(callback != undefined){
            button.onclick = function (){
                callback();

            }

        }

        switch (type) {
            case "normal":
                button.classList.add("beautyButtonNormal");
                break;

            case "red":
                button.classList.add("beautyButtonRed");
                break;

            default:
                button.classList.add("beautyButtonNormal");
                break;

        }

        return button;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("beauty-button", BeautyButton);
