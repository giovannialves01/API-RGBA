/**
 * Esconde qualquer janela que estiver aberta na área de exibição de conteúdo da página
 * 
 * @author Rafael Furtado
 * @returns undefined
 */
function hideAllContent() {
    let showedContents = document.getElementsByClassName("show");

    for (let i = 0; i < showedContents.length; i++) {
        const content = showedContents[i];
        
        content.classList.remove("show");
        content.classList.add("hide");

    }

}


/**
 * Exibe um conteúdo específico na área de exibição de conteúdo da página
 * 
 * @author Rafael Furtado
 * @param {string} contentId ID do elemento que contém o conteúdo a ser exibido
 * @returns undefined
 */
function showContent(contentId) {
    let optionContent = document.getElementById(contentId);
    optionContent.classList.add("show");
    optionContent.classList.remove("hide");

}

async function registerUser(event) {
    event.preventDefault();

    let select = document.getElementById("selectUserType");

    let option = select.value.toLowerCase();

    let allowRegister = false;
    let registerPath = "";

    switch (option) {
        case "aluno":
            allowRegister = true;
            registerPath = "/aluno/cadastrar";
            break;

        case "administrador":
            allowRegister = true;
            registerPath = "/adm/cadastrar";
            break;
            
        case "gestor":
            allowRegister = true;
            registerPath = "/gestor/cadastrar";
            break;

        case "tutor":
            allowRegister = true;
            registerPath = "/tutor/cadastrar";
            break;
    
        default:
            alert("Escolha um tipo de usuário para cadastrar!");
            break;
    }

    if(allowRegister){
        let pass = document.getElementById("senhaCadastro").value;
        let rePass = document.getElementById("confirmarSenhaCadastro").value;
    
        if(pass == rePass){
            let user = new Usuario();
    
            user.setNome(document.getElementById("nomeCadastro").value);
            user.setEmail(document.getElementById("emailCadastro").value);
            user.setCpf(document.getElementById("cpfCadastro").value);
            user.setSenha(pass);
    
            let response = await serverRequester.fazerPost(registerPath, user.toData());
    
            if(response["ok"] == true){
                alert("Cadastrado com sucesso!");
    
            }else{
                alert("Ocorreu um erro ao cadastrar o cliente");
    
            }
    
        }else{
            alert("Senha diferentes!");
    
        }

    }

}

function registerBook(event) {
    event.preventDefault();

    console.log(event);
    console.log(event.target);
}

function seeInfo() {
    let selectedRow = document.getElementsByClassName("selectedRow")[0];

    console.log(selectedRow);
}

function chooseUserToShow() {
    let select = document.getElementById("userTypeEdit");

    let option = select.value;

    switch (option) {
        case "Aluno":
            loadUserToShow(option);
            break;

        case "Administrador":
            loadUserToShow(option);
            break;
            
        case "Gestor":
            loadUserToShow(option);
            break;

        case "Tutor":
            loadUserToShow(option);
            break;
    
        default:
            break;
    }

}

async function loadUserToShow(perfil) {
    let usersToShowDiv = document.getElementById("usersToShow");

    let findAllPath = "";

    switch (perfil) {
        case "Aluno":
            findAllPath = "/aluno/findAll";
            break;

        case "Administrador":
            findAllPath = "/adm/findAll";
            break;
            
        case "Gestor":
            findAllPath = "/gestor/findAll";
            break;

        case "Tutor":
            findAllPath = "/tutor/findAll";
            break;
    
        default:
            break;
    }

    let response = await serverRequester.fazerGet(findAllPath);

    let usersData = response["responseJson"];

    usersToShowDiv.innerHTML = "";

    for (let i = 0; i < usersData.length; i++) {
        const userData = usersData[i];
        
        let user = new Usuario(userData);
        let userIdentifier = "user" + (i + 1);

        let userDataDiv = document.createElement("div");
        userDataDiv.classList.add("userData");
        userDataDiv.id = userIdentifier;

        let dataDiv = document.createElement("div");
        dataDiv.classList.add("data");

        let userControlButtonsDiv = createManageButtons(userIdentifier, user);

        let nomeDiv = document.createElement("div");
        let nomeDivContent = createFieldBox("Nome", user.getNome(), "nome");

        nomeDiv.appendChild(nomeDivContent);

        dataDiv.appendChild(nomeDiv);

        let restoDiv = document.createElement("div");

        let cpfDivContent = createFieldBox("CPF", user.getCpf(), "cpf");
        let emailDivContent = createFieldBox("E-mail", user.getEmail(), "email");
        let perfilDivContent = createFieldBox("Perfil", perfil, "");

        restoDiv.appendChild(cpfDivContent);
        restoDiv.appendChild(emailDivContent);
        restoDiv.appendChild(perfilDivContent);

        dataDiv.appendChild(restoDiv);

        userDataDiv.appendChild(dataDiv);
        userDataDiv.appendChild(userControlButtonsDiv);

        usersToShowDiv.appendChild(userDataDiv);

        if(i < usersData.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador");

            usersToShowDiv.appendChild(separador);
        }

    }

}

async function enableEdit(userIdentifier, user) {
    let editableUser = document.getElementById(userIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    let buttons = editableUser.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        if(button.textContent == "Editar"){
            button.className = "greenButton";
            button.textContent = "Salvar alterações";

            button.onclick = async function(){
                await saveChanges(userIdentifier, user);
            }
        }else{
            button.className = "redButton";
            button.textContent = "Descartar alterações";

            button.onclick = function(){
                undoChanges(userIdentifier, user);
            }
        }
    }

    for (let i = 0; i < fields.length - 1; i++) {
        const field = fields[i];
        
        field.className = "userDataFieldEnabled";
        field.disabled = false;
    }

}

async function disableEdit(userIdentifier, user) {
    let editableUser = document.getElementById(userIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    let buttons = editableUser.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        if(button.textContent == "Salvar alterações"){
            button.className = "yellowButton";
            button.textContent = "Editar";

            button.onclick = function(){
                enableEdit(userIdentifier, user);
            }
        }else{
            button.className = "redButton";
            button.textContent = "Excluir";

            button.onclick = async function(){
                await deleteUser(userIdentifier, user);
            }
        }
    }

    for (let i = 0; i < fields.length - 1; i++) {
        const field = fields[i];
        
        field.className = "userDataFieldDisabled";
        field.disabled = true;
    }
}

function undoChanges(userIdentifier, user){
    let editableUser = document.getElementById(userIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    for (let i = 0; i < fields.length - 1; i++) {
        const field = fields[i];

        switch (field.name){
            case "nome":
                field.value = user.getNome();
                break;

            case "cpf":
                field.value = user.getCpf();
                break;

            case "email":
                field.value = user.getEmail();
                break; 
        }
        
    }

    disableEdit(userIdentifier, user);
}

async function deleteUser(userIdentifier, user) {
    let editableUser = document.getElementById(userIdentifier);

    let userToDelete = {cpf: user.getCpf()};

    let pathToDelete = "";

    let select = document.getElementById("userTypeEdit");

    let option = select.value;

    switch (option) {
        case "Aluno":
            pathToDelete = "/aluno/delete";
            break;

        case "Administrador":
            pathToDelete = "/adm/delete";
            break;
            
        case "Gestor":
            pathToDelete = "/gestor/delete";
            break;

        case "Tutor":
            pathToDelete = "/tutor/delete";
            break;
    
        default:
            break;
    }

    let response = await serverRequester.fazerPost(pathToDelete, userToDelete);

    if(response["responseJson"]){
        alert("deletado");

        if(editableUser.nextSibling != null){
            editableUser.nextSibling.remove();
        }

        editableUser.remove();

    }else{
        alert("não deletado");
    }

}

async function saveChanges(userIdentifier, user) {
    let editableUser = document.getElementById(userIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    let pathToUpdate = "";

    let select = document.getElementById("userTypeEdit");

    let option = select.value;

    switch (option) {
        case "Aluno":
            pathToUpdate = "/aluno/update";
            break;

        case "Administrador":
            pathToUpdate = "/adm/update";
            break;
            
        case "Gestor":
            pathToUpdate = "/gestor/update";
            break;

        case "Tutor":
            pathToUpdate = "/tutor/update";
            break;
    
        default:
            break;
    }

    let data = {
        oldData: {
            nome: user.getNome(),
            email: user.getEmail(),
            cpf: user.getCpf(),
            senha: user.getSenha()
        }, 
        newData: {
            senha: user.getSenha()
        }
    };

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        
        switch (field.name){
            case "nome":
                data["newData"]["nome"] = field.value;
                break;

            case "cpf":
                data["newData"]["cpf"] = field.value;
                break;

            case "email":
                data["newData"]["email"] = field.value;
                break; 
        }

    }

    let response = await serverRequester.fazerPost(pathToUpdate, data);

    if(response["responseJson"]){
        alert("Alterado");
    }else{
        alert("Não alterado");
    }

    let newUser = new Usuario(data["newData"]);

    disableEdit(userIdentifier, newUser);
}

function setInputLabelName(event) {
    let label = document.getElementById("labelFileName");
    label.textContent = event.target.files.item(0).name;
    
}

function createFieldBox(title, value, name) {
    let container = document.createElement("div");

    let titleLabel = document.createElement("label");
    titleLabel.textContent = title;
    titleLabel.classList.add("titleLabel");
    let dataLabel = document.createElement("input");
    dataLabel.classList.add("userDataFieldDisabled");
    dataLabel.value = value;
    dataLabel.disabled = true;
    dataLabel.name = name;

    container.appendChild(titleLabel);
    container.appendChild(dataLabel);

    return container;
}

function createManageButtons(entityIdentifier, entity) {
    let manageButtonsDiv = document.createElement("div");
    manageButtonsDiv.classList.add("userControlButtons");

    let buttonEditar = document.createElement("button");
    buttonEditar.classList.add("yellowButton");
    buttonEditar.textContent = "Editar";
    buttonEditar.onclick = async function (){
        await enableEdit(entityIdentifier, entity);
    }

    let buttonExcluir = document.createElement("button");
    buttonExcluir.classList.add("redButton");
    buttonExcluir.textContent = "Excluir";
    buttonExcluir.onclick = async function (){
        await deleteUser(entityIdentifier, entity);
    }

    manageButtonsDiv.appendChild(buttonEditar);
    manageButtonsDiv.appendChild(buttonExcluir);

    return manageButtonsDiv;
}