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
            registerPath = "/alunos/cadastrar";
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
    booksToShow.innerHTML = ''
    for (let i = 0; i < books.length; i++) {
        const bookData = books[i];
        let book = new Biblioteca(bookData);
        console.log(book);
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
            console.log(book.getArquivo());
            let file = book.getArquivo().conteudo;

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

    let inputs = editableUser.getElementsByTagName("input");
    let textAreas = editableUser.getElementsByTagName("textarea");

    let fields = [];

    for (let i = 0; i < textAreas.length; i++) {
        const textArea = textAreas[i];
        
        fields.push(textArea);
    }

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        
        fields.push(input);
    }
    
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
        
        if(field.className == ("userDataFieldDisabled")&&field.name!="cpf"){
            field.className = "userDataFieldEnabled";
            field.disabled = false;
            
        }

    }

}

async function disableEdit(userIdentifier, user) {
    let editableUser = document.getElementById(userIdentifier);

    let inputs = editableUser.getElementsByTagName("input");
    let textAreas = editableUser.getElementsByTagName("textarea");

    let fields = [];

    for (let i = 0; i < textAreas.length; i++) {
        const textArea = textAreas[i];
        
        fields.push(textArea);
    }

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        
        fields.push(input);
    }

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

    let inputs = editableUser.getElementsByTagName("input");
    let textAreas = editableUser.getElementsByTagName("textarea");

    let fields = [];

    for (let i = 0; i < textAreas.length; i++) {
        const textArea = textAreas[i];
        
        fields.push(textArea);
    }

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        
        fields.push(input);
    }

    let entityType = entity.constructor.name;

    if(entityType == "Usuario"){
            fields.map(f=>{
                switch (f.name){
                    case "nome":
                        f.value = entity.getNome();
                        break;
        
                    case "cpf":
                        f.value = entity.getCpf();
                        break;
        
                    case "email":
                        f.value = entity.getEmail();
                        break; 
        
                }
            })
           
            

    }else if(entityType == "Biblioteca"){
        fields.map((f)=>{
            switch (f.name){
                case "autor":
                    f.value = entity.getAutor();
                    break;

                case "nomeDoLivro":
                    f.value = entity.getTitulo();
                    break;
            }
        })
    }else if(entityType == "Destaque"){
            fields.map((f)=>{
                switch (f.name){
                    case "titulo":
                        f.value = entity.getTitulo();
                        break;
        
                    case "sinopse":
                        f.value = entity.getSinopse();
                        break;
                    
                    case "conteudo":
                        f.value = entity.getConteudo();
                        break;
                }
            })
            }else if(entityType == "Evento"){
                fields.map((f)=>{

                    switch (f.name){
                        case "conteudo":
                            f.value = entity.getConteudo();
                            break;
                    
                        case "titulo":
                            f.value = entity.getTitulo();
                            break;
                        case "sinopse":
                            f.value = entity.getSinopse();
                            break;
                    }
                })
            }else if(entityType == "Pilula"){
            fields.map((f)=>{
                switch (f.name){
                    case "titulo":
                        f.value = entity.getTitulo();
                        break;
                    
                    case "conteudo":
                        f.value = entity.getDescricao();
                        break;
        
                }
            })
           
            

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
                pathToDelete = `/alunos/${entity.getCpf()}`;
                break;
    
            case "Administrador":
                pathToDelete = `/adm/${entity.getCpf()}`;
                break;
                
            case "Gestor":
                pathToDelete = `/gestor/${entity.getCpf()}`;
                break;
    
            case "Tutor":
                pathToDelete = `/tutor/${entity.getCpf()}`;
                break;
        
            default:
                break;
        }

    }else if(entityType == "Biblioteca"){
        pathToDelete = `/biblioteca/${entity.getId()}`;

    }else if(entityType == "Destaque"){
        pathToDelete = `/destaques/${entity.getId()}`;

    }else if(entityType == "Evento"){
        pathToDelete = `/eventos/${entity.getId()}`;

    }
    else if(entityType == "Pilula"){
        pathToDelete = `/pilulas/${entity.getId()}`;
        
    }

    axios({
        method: "delete",
        url: pathToDelete,
        headers: { "Content-Type": "application/json"},
    })
    .then(function (res) {
        if(res.status==204){
            alert("deletado");
    
            if(editableEntity.nextSibling != null){
                editableEntity.nextSibling.remove();
            }
    
            editableEntity.remove();
    
        }else{
            alert("não deletado");
        }
    })
    .catch(function (res) {
        console.log(res);
    })

    

}

async function saveChanges(entityIdentifier, entity) {
    let editableUser = document.getElementById(entityIdentifier);

    let inputs = editableUser.getElementsByTagName("input");
    let textAreas = editableUser.getElementsByTagName("textarea");

    let fields = [];

    for (let i = 0; i < textAreas.length; i++) {
        const textArea = textAreas[i];
        
        fields.push(textArea);
    }

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        
        fields.push(input);
    }

    let pathToUpdate = "";
    let newEntity;
    
    if(entity.constructor.name == "Biblioteca"){
        var data = {
            autor:entity.getAutor(),
            titulo:entity.getTitulo()
        }

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            switch (field.name){
                case "nomeDoLivro":
                    data.titulo = field.value
                    break;
    
                case "autor":
                    data.autor = field.value
                    break;
            }
    
        }
        
        data.id = entity.getId()
        pathToUpdate = `/biblioteca/${entity.getId()}`;

        newEntity = new Biblioteca();
        
        newEntity.setArquivo(entity.getArquivo());
        newEntity.setAutor(data.autor);
        newEntity.setTitulo(data.titulo);
        newEntity.setId(entity.getId());
    }else if(entity.constructor.name == "Usuario"){
        let select = document.getElementById("userTypeEdit");

        let option = select.value;

        var data = {
            nome:entity.getNome(),
            cpf:entity.getCpf(),
            email:entity.getEmail(),
            contato:entity.getContatos()
        }

        switch (option) {
            case "Aluno":
                pathToUpdate = `/alunos/${entity.getCpf()}`;
                break;
    
            case "Administrador":
                pathToUpdate = `/adm/${entity.getCpf()}`;
                break;
                
            case "Gestor":
                pathToUpdate = `/gestor/${entity.getCpf()}`;
                break;
    
            case "Tutor":
                pathToUpdate = `/tutor/${entity.getCpf()}`;
                break;
        
            default:
                break;
        }
    
   
    
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            switch (field.name){
                case "nome":
                    console.log("nome: "+field.value);
                    data.nome = field.value;
                    break;
    
                case "email":
                    console.log("email: "+field.value);
                    data.email = field.value;
                    break; 
            }
    
        }
        newEntity = new Usuario(data);
    }else if(entity.constructor.name == "Destaque"){
        pathToUpdate = `/destaques/${entity.getId()}`;
        var data = {
            id:entity.getId(),
            titulo:entity.getTitulo(),
            sinopse:entity.getSinopse(),
            conteudo:entity.getConteudo(),
            fonte:entity.getFonte()
        }
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            
            switch (field.name){
                case "titulo":
                    data.titulo = field.value;
                    break;
    
                case "sinopse":
                    data.sinopse = field.value;
                    break;
    
                case "conteudo":
                    data.conteudo = field.value;
                    break; 
            }
    
        }
        let newNoticia = {
            "id": entity.getId(),
            "titulo": data.titulo,
            "sinopse": data.sinopse,
            "conteudo": data.conteudo,
            "fonte": entity.getFonte(),
            "data": entity.getData(),
            "thumb": {
                "id": 0,
                "arquivo": {
                    "id": entity.getArquivo().id,
                    "nomeArquivo": entity.getArquivo().nomeArquivo,
                    "conteudo":entity.getArquivo().conteudo,
                    "tipoArquivo": entity.getArquivo().tipoArquivo
                }
            }
        }
        newEntity = new Destaque(newNoticia);
    }else if(entity.constructor.name == "Evento"){
        pathToUpdate = `/eventos/${entity.getId()}`;
        var data = {
            id:entity.getId(),
            titulo:entity.getTitulo(),
            sinopse:entity.getSinopse(),
            conteudo:entity.getConteudo(),
        }
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            
            switch (field.name){
                case "titulo":
                    data.titulo = field.value;
                    break;
    
                case "sinopse":
                    data.sinopse = field.value;
                    break;
    
                case "conteudo":
                    data.conteudo = field.value;
                    break; 
            }
    
        }
        let newEvento ={
            "id": entity.getId(),
            "titulo": data.titulo,
            "sinopse": data.sinopse,
            "conteudo": data.conteudo,
            "data": entity.getData(),
            "thumb": {
                "id": 0,
                "arquivo": {
                    "id": entity.getArquivo().id,
                    "nomeArquivo": entity.getArquivo().nomeArquivo,
                    "conteudo":entity.getArquivo().conteudo,
                    "tipoArquivo": entity.getArquivo().tipoArquivo
                }
            }
        }
        newEntity = new Evento(newEvento);
    }else if(entity.constructor.name == "Pilula"){
        pathToUpdate = `/pilulas/${entity.getId()}`;

        var data = {
            id: entity.getId(),
            titulo: entity.getTitulo,
            descricao: entity.getDescricao()
        }
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            
            switch (field.name){
                case "titulo":
                    data.titulo = field.value;
                    break;
    
                case "conteudo":
                    data.descricao = field.value;
                    break; 
            }
    
        }

        newEntity = new Pilula(entity);
        newEntity.setTitulo(data.titulo)
        newEntity.setDescricao(data.descricao)

        console.log(entity);

    }
    axios({
        method: "put",
        url: pathToUpdate,
        data: data,
        headers: { "Content-Type": "application/json"},
    }).then((res)=>{
        if(res.status==204){
            alert("Alterado");
        }else{
            alert("Não alterado");
        }
    }).catch((err)=>{
        console.log(err);
    })

    

    disableEdit(entityIdentifier, newEntity);
}

function setInputLabelName(event, labelName) {
    let label = document.getElementById(labelName);
    label.textContent = event.target.files.item(0).name;
    
}

function createFieldBox(title, value, name) {
    let container = document.createElement("div");
    container.classList.add("fieldBox");

    let titleLabel = document.createElement("label");
    titleLabel.textContent = title;
    titleLabel.classList.add("titleLabel");

    let dataLabel = document.createElement("input");
    dataLabel.classList.add("userDataFieldDisabled");
    if(title == "Perfil" || title == "Curso"){
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
    console.log(entityIdentifier);
    console.log(entity);

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
    let url=`${serverRequester.serverURL}/biblioteca/cadastrar`

    let res = sendFile(formData,url);
    res.then((r)=>{
        console.log(r);
        if(r.status==201){
            alert("Biblioteca cadastrada.")
        }else{
            alert("Erro no cadastro da biblioteca.")

        }
    })
}

async function registerPilula(event) {
    event.preventDefault();
    let form = $('#formPilula')[0];
    let formData = new FormData(form);   
    let url=`${serverRequester.serverURL}/pilulas/cadastrar`
    let res = sendFile(formData,url);
    res.then((r)=>{
        if(r.status==201){
            alert("Pílula cadastrada.")
        }else{
            alert("Erro no cadastro de pílula.")

        }
    })
}

async function registerNoticia(event){
    event.preventDefault();
    let form = $('#formNoticia')[0];
    let formData = new FormData(form);   
    let url=`${serverRequester.serverURL}/destaques/cadastrar`
    let res = sendFile(formData,url);
    res.then((r)=>{
        if(r.status==201){
            alert("Destaque cadastrado.")
        }else{
            alert("Erro no cadastro do destaque.")

        }
    })

}


async function registerEvento(event){
    event.preventDefault();
    let form = $('#formEvento')[0];
    let formData = new FormData(form);   
    let url=`${serverRequester.serverURL}/eventos/cadastrar`
    let res = sendFile(formData,url);
    res.then((r)=>{
        if(r.status==201){
            alert("Evento cadastrado.")
        }else{
            alert("Erro no cadastro do evento.")

        }
    })
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

function chooseNoticiaEventoToShow(){
    let select = document.getElementById("selectEventoNoticia");
    let typeToShow = select.value;
    
    let containerToShow;
    let containerToHide;

    if(typeToShow == "Noticia"){
        containerToShow = document.getElementById("noticiasToShow");
        containerToHide = document.getElementById("eventosToShow");
    }else{
        containerToShow = document.getElementById("eventosToShow");
        containerToHide = document.getElementById("noticiasToShow");
    }

    containerToHide.classList.remove("showChoose");
    containerToHide.classList.add("hideChoose");
    
    containerToShow.classList.remove("hideChoose");
    containerToShow.classList.add("showChoose");
}

async function loadNoticias() {
    let containerNoticias = document.getElementById("noticiasToShow");
    containerNoticias.innerHTML = "";

    let response = await serverRequester.fazerGet("/destaques");

    let destaques = response["responseJson"];

    for (let i = 0; i < destaques.length; i++) {
        const data = destaques[i];
        
        let destaque = new Destaque(data);

        let entityIdentifier = "destaque" + (i + 1);

        let entityContainer = document.createElement("div");
        entityContainer.classList.add("contentBox");
        entityContainer.id = entityIdentifier;

            let fieldsContainer = document.createElement("div");
            fieldsContainer.style.width = "60%";

            let fieldTitulo = createFieldBox("Título", destaque.getTitulo(), "titulo");
            let fieldSubtitulo = createFieldBox("Subtitulo", destaque.getSinopse(), "sinopse");
            let fieldCorpo = createTextFieldBox("Corpo", destaque.getConteudo(), "conteudo");

            let manageButtons = createManageButtons(entityIdentifier, destaque);

            fieldsContainer.appendChild(fieldTitulo);
            fieldsContainer.appendChild(fieldSubtitulo);
            fieldsContainer.appendChild(fieldCorpo);

            entityContainer.appendChild(fieldsContainer);
            entityContainer.appendChild(manageButtons);

            containerNoticias.appendChild(entityContainer);

            if(i < destaques.length - 1){
                let separador = document.createElement("div");
                separador.classList.add("separador");
    
                containerNoticias.appendChild(separador);
            }


    }
    
}

async function loadEventos() {
    let containerEventos = document.getElementById("eventosToShow");
    containerEventos.innerHTML = "";

    let response = await serverRequester.fazerGet("/eventos");

    let eventos = response["responseJson"];

    for (let i = 0; i < eventos.length; i++) {
        const data = eventos[i];
        
        let evento = new Evento(data);

        let entityIdentifier = "evento" + (i + 1);

        let entityContainer = document.createElement("div");
        entityContainer.classList.add("contentBox");
        entityContainer.id = entityIdentifier;
            let fieldsContainer = document.createElement("div");
            fieldsContainer.style.width = "60%";

            let fieldTitulo = createFieldBox("Título", evento.getTitulo(), "titulo");
            let fieldSubtitulo = createFieldBox("Subtitulo", evento.getSinopse(), "sinopse");
            let fieldCorpo = createTextFieldBox("Corpo", evento.getConteudo(), "conteudo");

            let manageButtons = createManageButtons(entityIdentifier, evento);

            fieldsContainer.appendChild(fieldTitulo);
            fieldsContainer.appendChild(fieldSubtitulo);
            fieldsContainer.appendChild(fieldCorpo);

            entityContainer.appendChild(fieldsContainer);
            entityContainer.appendChild(manageButtons);

            containerEventos.appendChild(entityContainer);

            if(i < eventos.length - 1){
                let separador = document.createElement("div");
                separador.classList.add("separador");
    
                containerEventos.appendChild(separador);
            }

    }
    
}

function createTextFieldBox(title, value, name) {
    let container = document.createElement("div");
    container.classList.add("textFieldBox");

    let titleLabel = document.createElement("label");
    titleLabel.textContent = title;
    titleLabel.classList.add("titleLabel");

    let dataLabel = document.createElement("textarea");
    dataLabel.classList.add("userDataFieldDisabled");
    if(title == "Perfil"){
        dataLabel.classList.add("notEditable");
    }
    dataLabel.value = value;
    dataLabel.disabled = true;
    dataLabel.name = name;
    dataLabel.style.height = "150px";
    dataLabel.style.resize = "none";

    container.appendChild(titleLabel);
    container.appendChild(dataLabel);

    return container;
}

async function loadPilulasToShow() {
    let container = document.getElementById("pilulasToShow");
    container.innerHTML = "";

    let response = await serverRequester.fazerGet("/cursos");

    let cursos = response["responseJson"];

    for (let i = 0; i < cursos.length; i++) {
        const data = cursos[i];
        cursos[i].pilulas.map((p)=>{
            let pilula = new Pilula(p);
            pilula.setNomeCurso(cursos[i].titulo)

            let entityIdentifier = "pilula" + (cursos[i].pilulas.indexOf(p) + 1);
    
            let entityContainer = document.createElement("div");
            entityContainer.classList.add("contentBox");
            entityContainer.id = entityIdentifier;
    
            let fieldsContainer = document.createElement("div");
            fieldsContainer.style.width = "60%";
    
            let div1 = document.createElement("div");
            div1.style.display = "flex";
            div1.style.flexDirection = "row";
    
            let fieldTitulo = createFieldBox("Título", pilula.getTitulo(), "titulo");
            let fieldCurso = createFieldBox("Curso", pilula.getNomeCurso(), "curso");
    
            div1.appendChild(fieldTitulo);
            div1.appendChild(fieldCurso);
    
            let fieldCorpo = createTextFieldBox("Corpo", pilula.getDescricao(), "conteudo");
            
            let manageButtons = createManageButtons(entityIdentifier, pilula);
    
            fieldsContainer.appendChild(div1);
            fieldsContainer.appendChild(fieldCorpo);
    
            entityContainer.appendChild(fieldsContainer);
            entityContainer.appendChild(manageButtons);
    
            container.appendChild(entityContainer);
    
            if(i < cursos[i].pilulas.length - 1){
                let separador = document.createElement("div");
                separador.classList.add("separador");
    
                container.appendChild(separador);
    
            }
        })


    }

}

loadAllCursos("selectCursoParaPilula");