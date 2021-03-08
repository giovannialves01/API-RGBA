class Modal extends HTMLElement{
    constructor(){
        super();
        // Necessário "amarrar" os métodos da classe a ela mesma para que não haja problema de escopo
        //ao utilizar this.modalTypes (É um problema do próprio JavaScrip :c)
        this.buildSignUpModal = this.buildSignUpModal.bind(this);
        this.buildRecoverModal = this.buildRecoverModal.bind(this);

        // Define os tipos de modals que são aplicáveis
        this.modalTypes = {
            "signUp": this.buildSignUpModal,
            "recover": this.buildRecoverModal
            };
        
    }

    /**
     * --- connectedCallback é um método que é invocado sozinho sempre que o componente é adicionado ao HTML ---
     * 
     * Constrói o modal de acordo com o "type" específicado dentro da tag
     * 
     * @author Rafael Furtado
     * @param void
     * @returns void
     */
    connectedCallback(){
        let type = this.getAttribute("type");

        let modalElement;

        // Verifica se o "type" passado é válido e chama o método construtor adequado
        if(!Object.keys(this.modalTypes).includes(type)){
            console.error("No such modal type named: " + type);

        }else{
            modalElement = this.modalTypes[type]();

        }

        // Adiciona os elementos construídos pelo método encontrado dentro da tag "modal-element"
        this.appendChild(modalElement);

    }

    /**
     * Constrói todos os elementos correspondentes ao modal do tipo "signUp" (Registrar-se)
     * 
     * @author Rafael Furtado
     * @param void
     * @returns void
     */
    buildSignUpModal(){
        // Cria o fundo escuro e o modal em si
        let background = this.buildBackground();
        let modal = this.buildModalContainer("Cadastrar novo usuário", 
        "Preencha os campos abaixo com seus dados para realizar o cadastro");

        // Instância as classes para fornecer os componentes
        let inputBuilder = new BeautyInput();
        let buttonBuilder = new BeautyButton();

        // Cria os componentes
        let nameInput = inputBuilder.buildBeautyInput("text", "Insira seu nome", "Nome", true, "user");
        let emailInput = inputBuilder.buildBeautyInput("email", "Insira seu e-mail", "E-mail", true, "envelope");
        let passwordInput = inputBuilder.buildBeautyInput("password", "Insira sua senha", "Senha", true, "key");
        let rePasswordInput = inputBuilder.buildBeautyInput("password", "Confirme sua senha", "Confirmar senha", true, "key");
        let signUpButton = buttonBuilder.buildBeautyButton();

        // Cria as divs para organizar os componentes
        let nameEmailDiv = document.createElement("div");
        nameEmailDiv.classList.add("hBox");
        let passRepassDiv = document.createElement("div");
        passRepassDiv.classList.add("hBox");
        let div = document.createElement("div");
        div.classList.add("hBox");

        // Adiciona os componentes em suas respectivas divs
        nameEmailDiv.appendChild(nameInput);
        nameEmailDiv.appendChild(emailInput);
        passRepassDiv.appendChild(passwordInput);
        passRepassDiv.appendChild(rePasswordInput);
        div.appendChild(this.buildBeautySelect("Select", ["Gênero", "Masculino", "Feminino"]));
        div.appendChild(new UsageTerms().buildUsageTerms());

        // Coloca as divs dentro do modal
        modal.appendChild(nameEmailDiv);
        modal.appendChild(passRepassDiv);
        modal.appendChild(div);
        modal.appendChild(signUpButton);

        // Adiciona o modal por cima do fundo escuro
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

    /**
     * Constrói o fundo escuro sobre o qual o modal ficará por cima
     * 
     * @author Rafael Furtado
     * @param void
     * @returns O componente que será o fundo escuro
     */
    buildBackground(){
        let modalBackground = document.createElement("div");

        modalBackground.id = "modalMenu";
        modalBackground.classList.add("modalBackground");

        return modalBackground;
    }

    /**
     * Constrói o componente do modal em si, com um título e um texto de diálogo atrelados a sua head
     * 
     * @param {string} title Título que será exibido no modal
     * @param {string} text Texto de diálogo do modal
     * @returns Componente da janela do modal, com apenas sua head
     */
    buildModalContainer(title, text){
        let modal = document.createElement("form");
        modal.id = "modalContent";
        modal.classList.add("modal");

        // Previne que o método nativo "onsubmit" da tag form seja invocado, para
        //que não atrapalhe o método elaborado em ServerRequester
        modal.onsubmit = function (event) {
            event.preventDefault();

        }

        // Cria o componente que será o header do modal
        let header = document.createElement("div");
        header.classList.add("modalHeader");

        // Criação dos componentes da head do modal
        let headerTitle = document.createElement("h3");
        headerTitle.textContent = title;
        let headerText = document.createElement("p");
        headerText.textContent = text;

        // Adiciona os componentes ao header
        header.appendChild(headerTitle);
        header.appendChild(headerText);

        // Adiciona o header ao componente modal
        modal.appendChild(header);

        return modal;
    }

    
    buildBeautySelect(title, options){
        let select = document.createElement("select");
        select.classList.add("combobox");
        select.title = title;

        let option = document.createElement("option");
        option.textContent = options[0];
        option.value = options[0];
        option.selected = "selected";
        option.disabled = "disabled";

        select.options.add(option);

        for (let i = 1; i < options.length; i++) {
            let option = document.createElement("option");
            option.textContent = options[i];
            option.value = options[i];

            select.options.add(option);

        }

        return select;
    }

}


customElements.define("modal-element", Modal);
