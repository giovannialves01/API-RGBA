class UsageTerms extends HTMLElement{
    constructor(){
        super();

    }

    connectedCallback(){
        this.appendChild(this.buildUsageTerms());
    }


    buildUsageTerms(){
        let div = document.createElement("div");
        div.classList.add("usageTermsContainer");

        let label = document.createElement("label");
        label.classList.add("maxlabel");

        let link = document.createElement("a");
        link.href = "link";
        link.textContent = "aqui"
        label.textContent = "Declaro que li e aceito os termos de uso declarados ";
        

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        label.insertAdjacentElement("beforeend", link);
        div.appendChild(checkbox);
        div.appendChild(label);

        return div;
    }

}

customElements.define("usage-terms", UsageTerms);
