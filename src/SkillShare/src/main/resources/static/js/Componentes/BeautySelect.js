/**
 * Classe do Web Component BeautySelect (tag beauty-select), englobando todas as suas funcionalidades, métodos
 * e controles de ações
 * 
 * Para utilizar diretamente na página HTML, existem 2 atributos que podem ser passados na tag
 * - title - Texto de dica
 * - options - Opções para constar no select, separados por espaço. Ex: "opção1 opção2 opção3 ..."
 * 
 * @author Rafael Furtado
 */
class BeautySelect extends HTMLElement{
    constructor() {
        super();

        this.options;
        this.title;
    }

    /**
     * --- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * @author Rafael Furtado
     */
    connectedCallback(){
        this.title = this.getAttribute("title");
        this.options = this.getAttribute("options").split(" ");

        // Popula a tag com os elementos, caso seja utilizado diretamente na página HTML
        this.appendChild(this.buildBeautySelect(this.title, this.options));
    }

    /**
     * Constrói o componente BeautySelect e retorna seu elemento
     * 
     * @author Rafael Furtado
     * @param {string} title Texto de dica do componente
     * @param {array} options Array com as opções, em string, que irão constar no componente (O primeiro item é desativado por padrão)
     * @returns Elemento do BeautySelect
     */
    buildBeautySelect(title, options){
        // Cria o elemento select
        let select = document.createElement("select");
        select.classList.add("beautySelect");
        select.title = title;

        // Cria o elemento option da primeira opção e o marca como desabilitado
        let option = document.createElement("option");
        option.textContent = options[0];
        option.value = options[0];
        option.selected = "selected";
        option.disabled = "disabled";

        // Adiciona o option da primeira posição
        select.options.add(option);

        // Cria o restando das options do array e os adiciona ao select
        for (let i = 1; i < options.length; i++) {
            let option = document.createElement("option");
            option.textContent = options[i];
            option.value = options[i];

            select.options.add(option);

        }

        return select;
    }
}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("beauty-select", BeautySelect);
