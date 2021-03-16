/**
 * Classe do Web Component Modal (tag usage-terms), construída para facilitar a insersão do elemento
 * no modal de cadastro
 * 
 * @author Rafael Furtado
 */
class UsageTerms extends HTMLElement{
    constructor(){
        super();

        this.usageTermsURL;

    }
    
    /**
     *--- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * @author Rafael Furtado
     * @returns undefined
     */
    connectedCallback(){
        this.usageTermsURL = this.getAttribute("usageTermsURL");

        // Popula a tag com os elementos, caso seja utilizado diretamente na página HTML
        this.appendChild(this.buildUsageTerms(this.usageTermsURL));
        
    }

    /**
     * Constrói o componente UsageTerms e retorna seu elemento
     * 
     * @author Rafael Furtado
     * @param {string} usageTermsURL URL para onde o termo de uso se encontra
     * @returns Elemento usage-terms
     */
    buildUsageTerms(usageTermsURL){
        // Cria a div que ira comportar os elementos do componente
        let div = document.createElement("div");
        div.classList.add("usageTermsContainer");

        // Cria os elementos do componente
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        let label = document.createElement("label");
        label.classList.add("usageTermsLabel");
        label.textContent = "Declaro que li e aceito os termos de uso declarados ";
        let link = document.createElement("a");
        link.href = usageTermsURL;
        link.textContent = "aqui"
        
        // Posiciona o texto de link após a label
        label.insertAdjacentElement("beforeend", link);

        // Preenche a div com os elementos
        div.appendChild(checkbox);
        div.appendChild(label);

        return div;
    }

}

// Declara a nova tag para que seja reconhecida na página HTML
customElements.define("usage-terms", UsageTerms);
