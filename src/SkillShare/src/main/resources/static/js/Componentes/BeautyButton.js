/**
 * Classe do Web Component BeautyButton (tag beauty-input), responsável por fornecer botões personalizados
 * para cada situação necessária
 * 
 * @author Rafael Furtado
 */
class BeautyButton extends HTMLElement{
    constructor() {
        super();

        this.title;
        this.text;

    }

    /**
     *--- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * @author Rafael Furtado
     * @returns undefined
     */
    connectedCallback(){
        this.title = this.getAttribute("title");
        this.text = this.getAttribute("text")

        this.appendChild(this.buildBeautyButton(this.text, this.title))

    }

    /**
     * Constrói o componente BeautyButton e retorna seu elemento
     * 
     * @author Rafael Furtado
     * @param {string} text Texto do botão
     * @param {function} callback Função à ser chamando quando o botão for clicado
     * @returns Elemento do botão
     */
    buildBeautyButton(text, title, callback){
        let button = document.createElement("button");
        button.classList.add("beautyButton");
        button.textContent = text;
        button.title = title;

        if(callback != undefined){
            button.onclick = function (){
                callback();

            }

        }

        return button;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("beauty-button", BeautyButton);
