/**
 * Classe do Web Component BeautyButton (tag beauty-input), responsável por fornecer caixas de inputs
 * personalizadas
 * 
 * Para utilizar o componente diretamente na página HTML como uma tag, existem os seguintes atributos
 * que podem ser declarados: 
 * - type - Tipo do input. ex: text | email | password | ...
 * - title - Texto da dica flutuante
 * - icon - Icone do repositório FA (Apenas o nome, sem "fas fa-")
 * - placeholder - Texto de placeholder
 * - required - Dizer se é um campo obrigatório para um formulário. true | false
 * 
 * @author Rafael Furtado
 */
class BeautyInput extends HTMLElement{
    constructor() {
        super();

        // Váriaveis dos atributos do componente, caso criado diretamente na página HTML
        this.title;
        this.type;
        this.icon;
        this.placeholder;
        this.required;
        
    }

    /**
     *--- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * @author Rafael Furtado
     * @returns undefined
     */
    connectedCallback(){
        
        this.title = this.getAttribute("title");
        this.type = this.getAttribute("type");
        this.icon = this.getAttribute("icon");
        this.placeholder = this.getAttribute("placeholder");
        this.required = this.getAttribute("required");

        let beautyInput = this.buildBeautyInput(this.type, this.title, this.placeholder, this.required, this.icon);

        // Popula a tag com os elementos, caso seja utilizado diretamente na página HTML
        this.appendChild(beautyInput);

    }

    /**
     * Constrói o componente do BeautyInput e retorna seu elemento
     * 
     * @author Rafael Furtado
     * @param {string} type Tipo do input
     * @param {string} title Texto de dica do input
     * @param {string} placeholder Placeholder do input
     * @param {boolean} required Marca o input como requerido ou não para um formulário
     * @param {string} iconClass Nome do ícone FA para aparecer ao lado do input
     * @returns Elemento do input
     */
    buildBeautyInput(type, title, placeholder, required, iconClass){
        // Cria a div para conter os elementos
        let container = document.createElement("div");
        container.classList.add("beautyInputContainer");

        // Cria a label que será usada como placeholder do input
        let label = document.createElement("label");
        label.classList.add("beautyInputLabel");
        label.textContent = placeholder;

        // Cria o input em si
        let input = document.createElement("input");
        input.classList.add("beautyInput");
        input.type = type;
        input.placeholder = " ";
        input.title = title;
        input.required = required;
        
        // Popula a div criada com os elementos
        container.appendChild(input);
        container.appendChild(label);

        // Verifica se um icone foi fornecido, caso tenha sido, cria um novo elemento para ele e 
        //o adiciona à div
        if(iconClass != undefined){
            let icon = document.createElement("span");
            icon.className = "fas fa-" + iconClass + " fa-beautyInputIcon";
    
            container.appendChild(icon);

        }

        return container;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("beauty-input", BeautyInput);
