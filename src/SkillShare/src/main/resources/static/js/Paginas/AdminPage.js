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
            findAllPath = "/alunos";
            break;

        case "Administrador":
            findAllPath = "/adm";
            break;
            
        case "Gestor":
            findAllPath = "/gestor";
            break;

        case "Tutor":
            findAllPath = "/tutor";
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
        userDataDiv.classList.add("contentData");
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

async function loadBooksToShow() {
    let response = await serverRequester.fazerGet("/biblioteca/findAll");

    let books = response["responseJson"];

    let booksToShow = document.getElementById("booksToShow");

    for (let i = 0; i < books.length; i++) {
        const bookData = books[i];
        let book = new Biblioteca(bookData);
        let bookIdentifier = "book" + (i + 1);
        
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("contentData");
        bookDiv.id = bookIdentifier;
        let dataDiv = document.createElement("div");
        dataDiv.classList.add("bookData");


        let bookDataDiv = document.createElement("div");

        let bookNameDiv = createFieldBox("Nome do livro:", book.getNome(), "nomeDoLivro");
        let bookAuthorDiv = createFieldBox("Autor:", book.getAutor(), "autor");

        bookDataDiv.appendChild(bookNameDiv);
        bookDataDiv.appendChild(bookAuthorDiv);

        let bookMiscDiv = document.createElement("div");

        let bookCursoDiv = await createSelectFieldBox("Curso de tema:", book.getCurso(), "cursoDeTema");
        let showContentButton = document.createElement("button");
        showContentButton.textContent = "Visualizar material";
        showContentButton.classList.add("visualizeMaterial");

        bookMiscDiv.appendChild(bookCursoDiv);
        bookMiscDiv.appendChild(showContentButton);

        let manageButtonsDiv = createManageButtons(bookIdentifier, book);

        dataDiv.appendChild(bookDataDiv);
        dataDiv.appendChild(bookMiscDiv);

        bookDiv.appendChild(dataDiv);
        bookDiv.appendChild(manageButtonsDiv);

        booksToShow.appendChild(bookDiv);

        if(i < books.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador");

            booksToShow.appendChild(separador);
        }

    }

}








async function enableEdit(userIdentifier, user) {
    let editableUser = document.getElementById(userIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    let buttons = editableUser.getElementsByClassName("controlButtons")[0].getElementsByTagName("button");

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

    let buttons = editableUser.getElementsByClassName("controlButtons")[0].getElementsByTagName("button");

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
            pathToDelete = "/alunos/delete";
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

function setInputLabelName(event, labelName) {
    let label = document.getElementById(labelName);
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
    manageButtonsDiv.classList.add("controlButtons");

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

async function createSelectFieldBox(title, value, name, pathToPopulate, dataToList) {
    let response = await serverRequester.fazerGet("/cursos");
    let entitys = response["responseJson"];
    let entityDataToList = [];
    dataToList = "titulo";

    for (let i = 0; i < entitys.length; i++) {
        const entity = entitys[i];
        
        entityDataToList.push(entity[dataToList]);
    }


    let container = document.createElement("div");

    let titleLabel = document.createElement("label");
    titleLabel.textContent = title;
    titleLabel.classList.add("titleLabel");

    let dataSelect = document.createElement("select");
    let option0 = document.createElement("option");
    option0.value = "0";
    option0.textContent = "Escolha um curso...";
    option0.disabled = true;
    dataSelect.appendChild(option0);

    let option1 = document.createElement("option");
    option1.value = "Não específico";
    option1.textContent = "Não específico";
    dataSelect.appendChild(option1);

    for (let i = 0; i < entityDataToList.length; i++) {
        const data = entityDataToList[i];
        
        let option = document.createElement("option");
        option.value = data;
        option.textContent = data;

        dataSelect.appendChild(option);
    }
    dataSelect.classList.add("userDataFieldDisabled");
    dataSelect.value = value;
    dataSelect.disabled = true;
    dataSelect.name = name;

    container.appendChild(titleLabel);
    container.appendChild(dataSelect);

    return container;
}

async function loadAllCursos(selectId){
    let select = document.getElementById(selectId);

    let response = await serverRequester.fazerGet("/cursos");
    let entitys = response["responseJson"];
    dataToList = "titulo";

    for (let i = 0; i < entitys.length; i++) {
        const entity = entitys[i];

        let option = document.createElement("option");
        option.value = entity["id"];
        option.textContent = entity[dataToList];

        select.appendChild(option);
    }


}

async function registerBook(event) {
    event.preventDefault();

    let fileInput = document.getElementById("inputUploadLivro");
    let inputNome = document.getElementById("nomeLivro");
    let inpuAutor = document.getElementById("nomeAutor");
    let select = document.getElementById("selectCursoParaLivro");

    let cursoId = select.value;
    let file = fileInput.files[0];

    console.log(file);

    alert("Chamando função para cadastrar livro");
}

async function registerPilula(event) {
    event.preventDefault();

    let fileInput = document.getElementById("inputUploadPilula");
    let inputTitulo = document.getElementById("tituloPilula");
    let textFieldCorpo = document.getElementById("textAreaCriarPilula");
    let select = document.getElementById("selectCursoParaPilula");

    let cursoId = select.value;
    let file = fileInput.files[0];

    console.log(file);

    alert("Chamando função para cadastrar pílulas");
}

async function registerNoticia(event){
    event.preventDefault();

    let fileInput = document.getElementById("inputUploadNoticia");
    let inputTituloNoticia = document.getElementById("tituloNoticia");
    let inputFonteNoticia = document.getElementById("fonteNoticia");
    let textFieldSubtitulo = document.getElementById("textAreaSubtituloNoticia");
    let textFieldCorpo = document.getElementById("textAreaCorpoNoticia");

    let file = fileInput.files[0];

    console.log(file);

    alert("Chamando função para cadastrar noticia");
}


async function registerEvento(event){
    event.preventDefault();

    let inputTituloEvento = document.getElementById("tituloEvento");
    let textFieldSubtitulo = document.getElementById("textAreaSubtituloEvento");
    let textFieldCorpo = document.getElementById("textAreaCorpoEvento");

    alert("Chamando função para cadastrar evento");
}

function showEvento() {
    let formNoticia = document.getElementById("formNoticia");
    let formEvento = document.getElementById("formEvento");
    let chooserNoticia = document.getElementById("chooseBarNoticia");
    let chooserEvento = document.getElementById("chooseBarEvento");

    formNoticia.classList.remove("showChoose");
    formEvento.classList.remove("hideChoose");

    formNoticia.classList.add("hideChoose");
    formEvento.classList.add("showChoose");

    chooserNoticia.classList.remove("choosed");
    chooserEvento.classList.remove("notChoosed");

    chooserNoticia.classList.add("notChoosed");
    chooserEvento.classList.add("choosed");

}

function showNoticia() {
    let formNoticia = document.getElementById("formNoticia");
    let formEvento = document.getElementById("formEvento");
    let chooserNoticia = document.getElementById("chooseBarNoticia");
    let chooserEvento = document.getElementById("chooseBarEvento");

    formNoticia.classList.remove("hideChoose");
    formEvento.classList.remove("showChoose");

    formNoticia.classList.add("showChoose");
    formEvento.classList.add("hideChoose");

    chooserNoticia.classList.remove("notChoosed");
    chooserEvento.classList.remove("choosed");

    chooserNoticia.classList.add("choosed");
    chooserEvento.classList.add("notChoosed");
}

function clearFileLabel(event, labelName){
    let label = document.getElementById(labelName);
    label.textContent = "Nada escolhido";
}

loadAllCursos("selectCursoParaLivro");
loadAllCursos("selectCursoParaPilula");
