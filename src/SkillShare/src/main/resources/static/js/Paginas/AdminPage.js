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
    let response = await serverRequester.fazerGet("/biblioteca");

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

        let bookNameDiv = createFieldBox("Nome do livro:", book.getTitulo(), "nomeDoLivro");
        let bookAuthorDiv = createFieldBox("Autor:", book.getAutor(), "autor");

        bookDataDiv.appendChild(bookNameDiv);
        bookDataDiv.appendChild(bookAuthorDiv);

        let bookMiscDiv = document.createElement("div");

        let showContentButton = document.createElement("button");
        showContentButton.textContent = "Visualizar material";
        showContentButton.classList.add("visualizeMaterial");
        showContentButton.onclick = function (){
            let file = book.getArquivo()["conteudo"];

            let pdfWindow = window.open("");

            pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(file) + "'></iframe>");

        }

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

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        
        if(field.className == ("userDataFieldDisabled")){
            field.className = "userDataFieldEnabled";
            field.disabled = false;
            
        }

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
                await deleteEntity(userIdentifier, user);
            }
        }
    }

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        
        if(field.classList.contains("userDataFieldEnabled")){
            field.className = "userDataFieldDisabled";
            field.disabled = true;

        }

    }

}

function undoChanges(entityIdentifier, entity){
    let editableUser = document.getElementById(entityIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    let entityType = entity.constructor.name;

    if(entityType == "Usuario"){
        for (let i = 0; i < fields.length - 1; i++) {
            const field = fields[i];
    
            switch (field.name){
                case "nome":
                    field.value = entity.getNome();
                    break;
    
                case "cpf":
                    field.value = entity.getCpf();
                    break;
    
                case "email":
                    field.value = entity.getEmail();
                    break; 
    
            }
            
        }

    }else if(entityType == "Biblioteca"){
        for (let i = 0; i < fields.length - 1; i++) {
            const field = fields[i];
    
            switch (field.name){
                case "autor":
                    field.value = entity.getAutor();
                    break;
    
                case "nomeDoLivro":
                    field.value = entity.getTitulo();
                    break;
    
            }
            
        }

    }


    disableEdit(entityIdentifier, entity);
}

async function deleteEntity(entityIdentifier, entity) {
    let editableEntity = document.getElementById(entityIdentifier);

    let pathToDelete = "";

    let select = document.getElementById("userTypeEdit");

    let option = select.value;

    let entityType = entity.constructor.name;

    if(entityType == "Usuario"){
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

    }else if(entityType == "Biblioteca"){
        pathToDelete = "/biblioteca/delete";

    }

    let response = await serverRequester.fazerPost(pathToDelete, entity.toData());

    if(response["responseJson"]){
        alert("deletado");

        if(editableEntity.nextSibling != null){
            editableEntity.nextSibling.remove();
        }

        editableEntity.remove();

    }else{
        alert("não deletado");
    }

}

async function saveChanges(entityIdentifier, entity) {
    let editableUser = document.getElementById(entityIdentifier);

    let fields = editableUser.getElementsByTagName("input");

    let pathToUpdate = "";

    let data = {newData: {}, oldData: {}};
    let newEntity;

    if(entity.constructor.name == "Biblioteca"){
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            
            switch (field.name){
                case "nomeDoLivro":
                    data["newData"]["titulo"] = field.value;
                    break;
    
                case "autor":
                    data["newData"]["autor"] = field.value;
                    break;

            }
    
        }
        
        data["oldData"]["id"] = entity.getId();

        pathToUpdate = "/biblioteca/update";

        newEntity = new Biblioteca();

        newEntity.setArquivo(entity.getArquivo());
        newEntity.setAutor(data["newData"]["autor"]);
        newEntity.setTitulo(data["newData"]["titulo"]);
        newEntity.setId(entity.getId());
    
    }else if(entity.constructor.name == "Usuario"){
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
    
        data = {
            oldData: {
                nome: entity.getNome(),
                email: entity.getEmail(),
                cpf: entity.getCpf(),
                senha: entity.getSenha()
            }, 
            newData: {
                senha: entity.getSenha()
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

        newEntity = new Usuario(data["newData"]);
    }

    let response = await serverRequester.fazerPost(pathToUpdate, data);

    if(response["responseJson"]){
        alert("Alterado");
    }else{
        alert("Não alterado");
    }

    disableEdit(entityIdentifier, newEntity);
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
    if(title == "Perfil"){
        dataLabel.classList.add("notEditable");
    }
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
        await deleteEntity(entityIdentifier, entity);
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
    entitys.forEach(curso => {
        let option = document.createElement("option");
        option.value = curso.id;
        option.textContent = curso.titulo;
        select.appendChild(option);
    });
}

async function registerBook(event) {
    event.preventDefault();
    let form = $('#bibliotecaRegistrar')[0];
    let formData = new FormData(form);   
    let url
    let opt = $('#selectCursoParaLivro').val()
    if((opt==0)||(opt==undefined)||(opt==null)){
        url=`${serverRequester.serverURL}/biblioteca/cadastrar`
    }
    else{
        url=`${serverRequester.serverURL}/cursos/biblioteca/cadastrar`
    }
    alert("Chamando função para cadastrar livro");
    sendFile(formData,url);
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

loadAllCursos("selectCursoParaPilula");
