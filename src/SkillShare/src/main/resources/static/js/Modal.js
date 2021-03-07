class Modal extends HTMLElement{
    constructor(){
        super();
        // Necessário "amarrar" os métodos da classe a ela mesma para que não haja problema de escopo
        //ao utilizar this.modalTypes (É um problema do próprio JavaScrip :c)
        this.buildSignUpModal = this.buildSignUpModal.bind(this);
        this.buildRecoverModal = this.buildRecoverModal.bind(this);

        this.modalTypes = {
            "signUp": this.buildSignUpModal,
            "recover": this.buildRecoverModal
            };
        
    }

    connectedCallback(){
        let type = this.getAttribute("type");

        let modalElement;

        if(!Object.keys(this.modalTypes).includes(type)){
            console.error("No such modal type named: " + type);

        }else{
            modalElement = this.modalTypes[type]();

        }

        this.appendChild(modalElement);

    }

    buildSignUpModal(){
        let background = this.buildBackground();
        let modal = this.buildModalContainer("Cadastrar novo usuário", 
        "Preencha os campos abaixo com seus dados para realizar o cadastro");

        let nameInput = this.buildBeautyInput("text", "Nome", "Nome");
        
        let emailInput = this.buildBeautyInput("email", "E-mail", "E-mail");
        
        let passwordInput = this.buildBeautyInput("password", "Senha", "Senha");
        let rePasswordInput = this.buildBeautyInput("password", "Confirmar senha", "Senha");

        let signUpButton = this.buildSignUpButton();

        let nameEmailDiv = document.createElement("div");
        nameEmailDiv.classList.add("hBox");

        let passRepassDiv = document.createElement("div");
        passRepassDiv.classList.add("hBox");

        let genderSelect = this.buildBeautySelect("Gênero", ["Escolha seu gênero", 
        "Masculino", "Feminino", "Prefiro não informar"]);

        nameEmailDiv.appendChild(nameInput);
        nameEmailDiv.appendChild(emailInput);

        passRepassDiv.appendChild(passwordInput);
        passRepassDiv.appendChild(rePasswordInput);

        modal.appendChild(nameEmailDiv);
        modal.appendChild(passRepassDiv);
        modal.appendChild(genderSelect);
        modal.appendChild(signUpButton);

        background.appendChild(modal);

        return background;
    }

    buildRecoverModal(){
        let background = this.buildBackground();
        let modal = this.buildModalContainer();

        let title = document.createElement("h4");
        title.textContent = "Recuperação de senha";

        let text = document.createElement("span");
        text.textContent = "Esqueceu sua senha? Preencha o campo abaixo com seu e-mail e, caso o " +
        "e-mail fornecido tenha uma conta vinculada à ele, lhe enviaremos um e-mail de recuperação";

        let emailInput = document.createElement("input");
        emailInput.title = "E-mail";
        emailInput.placeholder = "E-mail";
        emailInput.classList.add("modalInputs");

        let recoverButton = document.createElement("button");
        recoverButton.textContent = "Recuperar";
        recoverButton.onclick = function () {
            console.log("a");
            
        }

        modal.appendChild(title);
        modal.appendChild(text);
        modal.appendChild(emailInput);
        modal.appendChild(recoverButton);

        background.appendChild(modal);

        return background;
    }






    buildBackground(){
        let modalBackground = document.createElement("div");

        modalBackground.id = "modalMenu";
        modalBackground.classList.add("modalBackground");

        return modalBackground;
    }

    buildModalContainer(title, text){
        let modal = document.createElement("div");
        modal.id = "modalContent";
        modal.classList.add("modal");

        let header = document.createElement("div");
        header.classList.add("modalHeader");

        let headerTitle = document.createElement("h3");
        headerTitle.textContent = title;

        let headerText = document.createElement("p");
        headerText.textContent = text;

        header.appendChild(headerTitle);
        header.appendChild(headerText);
        modal.appendChild(header);

        return modal;
    }

    buildBeautyInput(type, placeholder, title){
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

    buildBeautySelect(title, options){
        let select = document.createElement("select");
        select.classList.add("beautySelect");
        select.title = title;

        for (let i = 0; i < options.length; i++) {
            let option = document.createElement("option");
            option.textContent = options[i];
            option.value = options[i];

            select.options.add(option);

        }

        return select;
    }

    buildSignUpButton(){
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


customElements.define("modal-element", Modal);
