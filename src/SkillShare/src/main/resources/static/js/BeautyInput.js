class BeautyInput extends HTMLElement{
    constructor() {
        super();

        this.type = this.getAttribute("type");
        this.title = this.getAttribute("title");

    }

    connectedCallback(){
        let beautyInput = this.buildBeautyInput(this.type, this.title);

        this.appendChild(beautyInput);

    }

    buildBeautyInput(type, title, placeholder){
        let container = document.createElement("div");
        container.classList.add("beautyInputContainer");

        let label = document.createElement("label");
        label.classList.add("beautyInputLabel");
        label.textContent = placeholder;

        let input = document.createElement("input");
        input.classList.add("beautyInput");
        input.type = type;
        input.placeholder = " ";
        input.title = title;

        container.appendChild(input);
        container.appendChild(label);

        return container;
    }

}

customElements.define("beauty-input", BeautyInput);
