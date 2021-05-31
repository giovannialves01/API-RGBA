/**
 * Funcao para formatar datas para o formato dd/MM/yyyy. DMA = DiaMesAno
 * @author Barbara Port
 * @return String com a data formatada
 */
function formatarDataDMA (dia) {
  let partes = dia.split("-");
  let diaOK = partes[2];
  let mesOK = partes[1];
  let anoOK = partes[0];
  let novaData = diaOK + "/" + mesOK + "/" + anoOK;
  return novaData
}

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
                let log = new LogRegister();
                await log.createNewLog("Cadastro de novo usuário: " + user.getNome());
    
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
        
    }else if(entityType == "Questao"){
        pathToDelete = "/questoes/" + entity.getId();
    }
    else if(entityType == "Turma"){
        pathToDelete = "/turmas/" + entity.getId();
    }
    else if(entityType == "Curso"){
        pathToDelete = "/cursos/" + entity.getId();
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

            let log = new LogRegister();
            log.createNewLog("Exclusão de entidade: " + entity.getDeleteMessage());
    
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

        let data = {
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

    }else if(entity.constructor.name == "Questao"){
        pathToUpdate = "/questoes/" + entity.getId();
        
        var data = {};

        data["alternativaCorreta"] = editableUser.querySelector('input[name="alternativaCorreta"]:checked').value;
        data["curso"] = document.getElementById("selectQuestaoPorCurso").value;
        data["id"] = entity.getId();

        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            
            switch (field.name){
                case "enunciado":
                    data["enunciado"] = field.value;
                    break;
    
                case "alternativaA":
                    data["alternativaA"] = field.value;
                    break; 

                case "alternativaB":
                    data["alternativaB"] = field.value;
                    break; 

                case "alternativaC":
                    data["alternativaC"] = field.value;
                    break; 

                case "alternativaD":
                    data["alternativaD"] = field.value;
                    break; 

            }
    
        }

        newEntity = new Questao(data);

    }else if(entity.constructor.name == "Turma"){
        console.log(entity.toData());
        pathToUpdate = `/turmas/${entity.getId()}`;
        var data = {
            cpfTutor: entity.getTutor().cpf,
            dataInicio: entity.getDataInicio,
            dataTermino: entity.getDataTermino
        }
        fields.forEach(field => {
            switch (field.name){
                case "tutor":
                    data.cpfTutor = field.value
                    break;
                case "dataTermino":
                    data.dataTermino = field.value
                    break;
                case "dataInicio":
                    data.dataInicio = field.value
            }
        });
        entity.setDataInicio(data.dataInicio)
        entity.setDataTermino(data.dataTermino)
        axios({
            method: "get",
            url: `http://localhost:8080/tutor/${data.cpfTutor}`,
        })
        .then(function (response) {
            entity.setTutor(response.data)
        })
        .catch(function (err) {
          console.log(err);
        });

        console.log(data);
        newEntity = new Turma(entity.toData());

    }else if(entity.constructor.name == "Curso"){
        pathToUpdate = `/cursos/${entity.getId()}`;
        var data = {
            nome: entity.getTitulo(),
            descricao: entity.getDescricao(),
            cpfGestor: entity.getGestor()

        }
        fields.forEach(field => {
            switch (field.name){
                case "titulo":
                    data.nome = field.value
                    break;
                case "descricao":
                    data.descricao = field.value
                    break;
                case "gestor":
                    data.cpfGestor = field.value
            }
        });
        entity.setTitulo(data.nome);
        entity.setDescricao(data.descricao);
        entity.setGestor(data.cpfGestor);

        newEntity = new Curso(entity);

    }


    axios({
        method: "put",
        url: pathToUpdate,
        data: data,
        headers: { "Content-Type": "application/json"},
    }).then((res)=>{
        if(res.status==204){
            alert("Alterado");

            let log = new LogRegister();
            log.createNewLog("Alteração de dados da entidade: " + newEntity.getDeleteMessage());
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
    if(title == "Perfil" || title == "Curso" || title == "Gestor"){
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
    let url=`${serverRequester.serverURL}/biblioteca/cadastrar`

    let res = sendFile(formData,url);
    res.then((r)=>{
        console.log(r);
        if(r.status==201){
            alert("Biblioteca cadastrada.");
            formData.get("titulo");
            let log = new LogRegister();
            log.createNewLog("Cadastro de novo conteúdo na Biblioteca: " + formData.get("titulo"));

        }else{
            alert("Erro no cadastro da biblioteca.");

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
            alert("Pílula cadastrada.");

            let log = new LogRegister();
            log.createNewLog("Cadastro de nova pílula de conhecimento: " + formData.get("titulo"));

        }else{
            alert("Erro no cadastro de pílula.");

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
            alert("Destaque cadastrado.");

            let log = new LogRegister();
            log.createNewLog("Cadastro de nova notícia: " + formData.get("titulo"));

        }else{
            alert("Erro no cadastro do destaque.");

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
            alert("Evento cadastrado.");

            let log = new LogRegister();
            log.createNewLog("Cadastro de novo evento: " + formData.get("titulo"));

        }else{
            alert("Erro no cadastro do evento.");

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

async function loadLog(){
    let resposta = await serverRequester.fazerGet("/logs");

    let container = document.getElementById("logs");
    
    let entidades = resposta["responseJson"];
    
    for (let i = 0; i < entidades.length; i++) {
        const element = entidades[i];
        
        let log = new Log(element);

        let logContainer = document.createElement("div");
        logContainer.classList.add("logContainer");

        let autorContainer = document.createElement("div");
        autorContainer.classList.add("logInfo");
        let tituloautor = document.createElement("label");
        tituloautor.textContent = "Autor do registro:";
        tituloautor.classList.add("titleLabel");
        let valorautor = document.createElement("label");
        valorautor.textContent = log.getAutor();
        autorContainer.appendChild(tituloautor);
        autorContainer.appendChild(valorautor);

        let nivelContainer = document.createElement("div");
        nivelContainer.classList.add("logInfo");
        let titulonivel = document.createElement("label");
        titulonivel.textContent = "Nivel de acesso do usuário:";
        titulonivel.classList.add("titleLabel");
        let valornivel = document.createElement("label");
        valornivel.textContent = log.getNivelDeAcesso();
        nivelContainer.appendChild(titulonivel);
        nivelContainer.appendChild(valornivel);

        let dataContainer = document.createElement("div");
        dataContainer.classList.add("logInfo");
        let titulodata = document.createElement("label");
        titulodata.textContent = "Data do registro:";
        titulodata.classList.add("titleLabel");
        let valordata = document.createElement("label");
        valordata.textContent = log.getData();
        dataContainer.appendChild(titulodata);
        dataContainer.appendChild(valordata);

        let acaoContainer = document.createElement("div");
        acaoContainer.classList.add("logInfo");
        let tituloacao = document.createElement("label");
        tituloacao.textContent = "Ação realizada:";
        tituloacao.classList.add("titleLabel");
        let valoracao = document.createElement("label");
        valoracao.textContent = log.getAcao();
        acaoContainer.appendChild(tituloacao);
        acaoContainer.appendChild(valoracao);

        let infosContainer = document.createElement("div");
        infosContainer.classList.add("infosContainer");
        infosContainer.appendChild(autorContainer);
        infosContainer.appendChild(nivelContainer);
        infosContainer.appendChild(dataContainer);
        
        logContainer.appendChild(infosContainer);
        logContainer.appendChild(acaoContainer);

        container.appendChild(logContainer);

        if(i < entidades.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador");

            container.appendChild(separador);

        }
    }

}
async function carregarcursos(){
    let resposta = await serverRequester.fazerGet("/cursos");
    let entidades = resposta["responseJson"];
    let container = document.getElementById("cursos");
    container.innerHTML = "";
    for (let i = 0; i < entidades.length; i++) {
        const element = entidades[i];

        let curso = new Curso(element);

        let containerIdentifier = "curso" + (i + 1);

        let mainDiv = document.createElement("div");
        mainDiv.classList.add("containerCurso");
        mainDiv.id = containerIdentifier;

        let divDetalhes = document.createElement("div");
        divDetalhes.classList.add("detalhesCurso");
        
        let divThumb = document.createElement("div");
        let thumb = document.createElement("img");
        let imgTipo = curso.getThumb()["arquivo"]["tipoArquivo"];
        let imgArquivo = curso.getThumb()["arquivo"]["conteudo"];
        thumb.setAttribute("src", `data:` + imgTipo + `;base64,` + imgArquivo);
        thumb.classList.add("thumbCurso");
        divThumb.appendChild(thumb);

        console.log(curso.toData());
        let divNomeDescricao = document.createElement("div");
        let divNome = createFieldBox("Nome:", curso.getTitulo(), "titulo");
        let divDescricao = createTextFieldBox("Descrição:", curso.getDescricao(), "descricao");
        axios({
            method: "get",
            url: `${serverRequester.serverURL}/cursos/${curso.getId()}/gestor`
        })
        .then(function (response) {
            curso.setGestor(response.data.nome)          
            let divGestor = createFieldBox("Gestor", curso.getGestor(), "gestor");
            divNomeDescricao.appendChild(divNome);
            divNomeDescricao.appendChild(divDescricao);
            divNomeDescricao.appendChild(divGestor);
    
        })
        .catch(function (err) {
          console.log(err);
        });
        

        


        let manageButtons = createManageButtons(containerIdentifier, curso);

        divDetalhes.appendChild(divThumb);
        divDetalhes.appendChild(divNomeDescricao);
        divDetalhes.appendChild(manageButtons);

        mainDiv.appendChild(divDetalhes);

        let respostaTurmas = await serverRequester.fazerGet("/turmas/turma/curso/" + curso.getId());
        let turmas = respostaTurmas["responseJson"];

        let divTurmas = document.createElement("div");
        divTurmas.classList.add("turmasCurso");

        let divManageTurmas = document.createElement("div");
        divManageTurmas.classList.add("manageTurmas");
        let manageTurmasIcone = document.createElement("Span");
        manageTurmasIcone.className = "fas fa-users";
        let titleManageTurmas = document.createElement("label");
        titleManageTurmas.textContent = "Turmas desse curso";

        divManageTurmas.appendChild(manageTurmasIcone);
        divManageTurmas.appendChild(titleManageTurmas);

        divTurmas.appendChild(divManageTurmas);

        for (let x = 0; x < turmas.length; x++) {
            const turmaData = turmas[x];
            
            let turma = new Turma(turmaData);

            let turmaIdentifier = containerIdentifier + "-" + "turma" + (x + 1);
            let turmaContainer = document.createElement("div");
            turmaContainer.classList.add("turmaContainerCurso");
            turmaContainer.classList.add("hideTurma");
            turmaContainer.id = turmaIdentifier;

            let divManageTurma = document.createElement("div");
            divManageTurma.classList.add("manageTurmaCursoContainer");

            let divManageTurmaInfos = document.createElement("div");
            divManageTurmaInfos.classList.add("manageTurmaCurso");
            let expandirTurma = document.createElement("span");
            expandirTurma.className = "fas fa-chevron-left fa-chevron-ExpandirTurma";
            expandirTurma.onclick = function(){
                colapsarTurma(turmaIdentifier);
            }
            let iconeTurma = document.createElement("span");
            iconeTurma.className = "fas fa-graduation-cap";
            let labelTitleTurma = document.createElement("label");
            labelTitleTurma.textContent = "Início em " + turma.getDataInicio() + " e finalização em " + turma.getDataTermino();
            let botaoAdicionarAluno = document.createElement("button");
            botaoAdicionarAluno.classList.add("buttonAddAluno");
            let iconeAdicionarAluno = document.createElement("span");
            iconeAdicionarAluno.className = "fas fa-user-plus";
            botaoAdicionarAluno.appendChild(iconeAdicionarAluno);
            botaoAdicionarAluno.insertAdjacentText("beforeend", "Aluno");
            botaoAdicionarAluno.onclick = async function(){
                let alunosResponse = await serverRequester.fazerGet("/alunos");
                let alunosArray = alunosResponse["responseJson"];

                let menuAddAluno = document.createElement("div");
                menuAddAluno.classList.add("menuAddAluno");

                let titleAddAluno = document.createElement("p");
                titleAddAluno.textContent = "Adicionar novo aluno à turma";
                titleAddAluno.style.width = "100%";
                titleAddAluno.style.textAlign = "center";

                let fecharAddAluno = document.createElement("span");
                fecharAddAluno.className = "fas fa-times fecharAddAluno";
                fecharAddAluno.onclick = function(){
                    menuAddAluno.remove();
                }

                let sep = document.createElement("div");
                sep.classList.add("separador");
    
                menuAddAluno.appendChild(fecharAddAluno);
                menuAddAluno.appendChild(titleAddAluno);
                menuAddAluno.appendChild(sep);

                for (let a = 0; a < alunosArray.length; a++) {
                    const element = alunosArray[a];
                    
                    let aluno = new Usuario(element);

                    let divAlunoAdd = document.createElement("div");
                    divAlunoAdd.classList.add("alunoTurmaCurso");

                    let alunoIconeAdd = document.createElement("span");
                    alunoIconeAdd.className = "fas fa-user";

                    let alunoIconeAdd2 = document.createElement("span");
                    alunoIconeAdd2.className = "fas fa-plus";
                    alunoIconeAdd2.style.cursor = "pointer";
                    alunoIconeAdd2.style.color = "#2aca2a";

                    let alunoNomeAdd = document.createElement("label");
                    alunoNomeAdd.textContent = aluno.getNome();

                    divAlunoAdd.appendChild(alunoIconeAdd);
                    divAlunoAdd.appendChild(alunoNomeAdd);
                    divAlunoAdd.appendChild(alunoIconeAdd2);

                    menuAddAluno.appendChild(divAlunoAdd);

                    alunoIconeAdd2.onclick = async function(){
                        await serverRequester.fazerPut("/turmas/add/" + turma.getId() + "/" + aluno.getCpf());
        
                        divAlunoAdd.remove();

                        let alunoContainer = document.createElement("div");
                        alunoContainer.classList.add("alunoTurmaCurso");
        
                        let alunoIcone = document.createElement("span");
                        alunoIcone.className = "fas fa-user";
                        let alunoNome = document.createElement("label");
                        alunoNome.textContent = aluno.getNome();
                        let alunoBotaoExcluir = document.createElement("span");
                        alunoBotaoExcluir.className = "fas fa-times deleteUserTurmaCurso";
                        alunoBotaoExcluir.onclick = async function (){
                            console.log("Removendo aluno");
                            console.log(alunoContainer);
                            alunoContainer.remove();
        
                            await serverRequester.fazerPut("/turmas/remove/" + turma.getId() + "/" + aluno.getCpf());
        
                        }
        
                        alunoContainer.appendChild(alunoIcone);
                        alunoContainer.appendChild(alunoNome);
                        alunoContainer.appendChild(alunoBotaoExcluir);

                        turmaContainer.appendChild(alunoContainer);
                        

                    }

                }

                document.body.appendChild(menuAddAluno);
            }

            divManageTurmaInfos.appendChild(iconeTurma);
            divManageTurmaInfos.appendChild(labelTitleTurma);
            divManageTurmaInfos.appendChild(botaoAdicionarAluno);
            divManageTurma.appendChild(divManageTurmaInfos);
            divManageTurma.appendChild(expandirTurma);

            turmaContainer.appendChild(divManageTurma);

            let alunos = turma.getAlunos();

            for (let y = 0; y < alunos.length; y++) {
                const alunoData = alunos[y];
                
                let aluno = new Usuario(alunoData);

                let alunoContainer = document.createElement("div");
                alunoContainer.classList.add("alunoTurmaCurso");

                let alunoIcone = document.createElement("span");
                alunoIcone.className = "fas fa-user";
                let alunoNome = document.createElement("label");
                alunoNome.textContent = aluno.getNome();
                let alunoBotaoExcluir = document.createElement("span");
                alunoBotaoExcluir.className = "fas fa-times deleteUserTurmaCurso";
                alunoBotaoExcluir.onclick = async function (){
                    console.log("Removendo aluno");
                    console.log(alunoContainer);
                    alunoContainer.remove();

                    await serverRequester.fazerPut("/turmas/remove/" + turma.getId() + "/" + aluno.getCpf());

                }

                alunoContainer.appendChild(alunoIcone);
                alunoContainer.appendChild(alunoNome);
                alunoContainer.appendChild(alunoBotaoExcluir);

                turmaContainer.appendChild(alunoContainer);

            }

            divTurmas.appendChild(turmaContainer);

        }

        mainDiv.appendChild(divTurmas);

        container.appendChild(mainDiv);

        if(i < entidades.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador");

            container.appendChild(separador);

        }
        
    }

}

function createDataContainer(title, value){
    let div = document.createElement("div");
    div.classList.add("columnContainer");

    let titulo = document.createElement("label");
    titulo.textContent = title;
    titulo.className.add("titleLabel");
    let valor = document.createElement("label");
    valor.textContent = value;

    div.appendChild(titulo);
    div.appendChild(valor);

    return div;
}

async function loadGestoresSelect(idSelect){
    let select = document.getElementById(idSelect);

    let response = await serverRequester.fazerGet("/gestor");

    let entitys = response["responseJson"];

    entitys.forEach(gestor => {
        let option = document.createElement("option");
        option.value = gestor.cpf;
        option.textContent = gestor.nome;
        select.appendChild(option);
    });
}

async function loadTutoresSelect(idSelect){
    let select = document.getElementById(idSelect);

    let response = await serverRequester.fazerGet("/tutor");

    let entitys = response["responseJson"];

    entitys.forEach(tutor => {
        let option = document.createElement("option");
        option.value = tutor.cpf;
        option.textContent = tutor.nome;
        select.appendChild(option);
    });
}

async function registerCurso(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("titulo",document.getElementById("inserirNome").value)
    formData.append("th",document.getElementById("inputUploadCursoTumbnail").files[0])
    formData.append("descricao",document.getElementById("descricaoCursoUpload").value)
    formData.append("cpf",document.getElementById("escolhaDeGestor").value)
    axios({
        method: "post",
        url: `${serverRequester.serverURL}/cursos/cadastrar`,
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
        })
        .then(function (response) {
            console.log("-------------------SUCESSO UPLOAD CURSO BANCO DE DADOS-------------------");
            console.log(response);
            let curso = response.data
            let formDataScorm = new FormData();
            formDataScorm.append("file",document.getElementById("inputUploadArquivoScorm").files[0])

            let token = auth()
            token.then((t)=>{
                uploadScorm(curso.id,t,formDataScorm).then((importJobId)=>{
                    let status = setInterval(()=>{
                        getImportStatus(importJobId,t).then((res)=>{
                            console.log(res)
                            if(res.status=="COMPLETE"){
                                alert("Curso postado com sucesso")
                                clearInterval(status)

                                let log = new LogRegister();
                                log.createNewLog("Cadastro de novo curso: " + formData.get("titulo"));
                            }
                        })
                    },5000)
                })
            }) 
        })
        .catch(function (err) {
          console.log("-------------------ERRO UPLOAD CURSO BANCO DE DADOS-------------------");
          console.log(err);
        });

}

async function registerQuestao(event) {
    event.preventDefault();

    let form = document.getElementById("uploadQuestao");

    let cursoId = document.getElementById("selectCursoQuestao").value;

    let formData = new FormData();
    let data = {
        "enunciado": document.getElementById("textAreaEnunciado").value,
        "alternativaA": document.getElementById("textArearesp1").value,
        "alternativaB": document.getElementById("textArearesp2").value,
        "alternativaC": document.getElementById("textArearesp3").value,
        "alternativaD": document.getElementById("textArearesp4").value,
        "alternativaCorreta": document.querySelector('input[name="alternativaCorreta"]:checked').value
    }

    let response = await serverRequester.fazerPost("/questoes/cadastrar/" + cursoId, data);

    let log = new LogRegister();
    log.createNewLog("Cadastro de nova questão: " + data["enunciado"]);
}

async function chooseQuestaoToShow() {
    let select = document.getElementById("selectQuestaoPorCurso");

    let idCursoSelecionado = select.value;

    await showQuestoesPorCurso(idCursoSelecionado);
}

async function showQuestoesPorCurso(idCursoSelecionado) {
    let response = await serverRequester.fazerGet("/questoes/curso/" + idCursoSelecionado);
    let entidades = response["responseJson"];

    let container = document.getElementById("questoesToShow");
    container.innerHTML = "";

    for (let i = 0; i < entidades.length; i++) {
        const entidade = entidades[i];
        
        let questao = new Questao(entidade);

        let entityIdentifier = "questao" + (i + 1);

        let divAlternativaECorreta = document.createElement("div");
        divAlternativaECorreta.classList.add("questaoAlternativaECorreta");

        let divAlternativas = document.createElement("div");
        divAlternativas.classList.add("questaoAlternativas");
        let alternativaA = generateQuestaoAlternativa("Alternativa a)", questao.getAlternativaA(), "alternativaA");
        let alternativaB = generateQuestaoAlternativa("Alternativa b)", questao.getAlternativaB(), "alternativaB");
        let alternativaC = generateQuestaoAlternativa("Alternativa c)", questao.getAlternativaC(), "alternativaC");
        let alternativaD = generateQuestaoAlternativa("Alternativa d)", questao.getAlternativaD(), "alternativaD");

        divAlternativas.appendChild(alternativaA);
        divAlternativas.appendChild(alternativaB);
        divAlternativas.appendChild(alternativaC);
        divAlternativas.appendChild(alternativaD);

        let divAlternativaCorreta = document.createElement("div");
        let alternativaCorretaTitle = document.createElement("label");
        alternativaCorretaTitle.textContent = "Alternativa correta";
        alternativaCorretaTitle.classList.add("titleLabel");
        let radioA = generateRadioAlternativaCorreta("a)", "alternativaCorreta", "A");
        let radioB = generateRadioAlternativaCorreta("b)", "alternativaCorreta", "B");
        let radioC = generateRadioAlternativaCorreta("c)", "alternativaCorreta", "C");
        let radioD = generateRadioAlternativaCorreta("d)", "alternativaCorreta", "D");

        switch (questao.getAlternativaCorreta()) {
            case "A":
                radioA.getElementsByTagName("input")[0].checked = true;
                break;

            case "B":
                radioB.getElementsByTagName("input")[0].checked = true;
                break;

            case "C":
                radioC.getElementsByTagName("input")[0].checked = true;
                break;

            case "D":
                radioD.getElementsByTagName("input")[0].checked = true;
                break;
        }

        divAlternativaCorreta.appendChild(alternativaCorretaTitle);
        divAlternativaCorreta.appendChild(radioA);
        divAlternativaCorreta.appendChild(radioB);
        divAlternativaCorreta.appendChild(radioC);
        divAlternativaCorreta.appendChild(radioD);

        divAlternativaECorreta.appendChild(divAlternativas);
        divAlternativaECorreta.appendChild(divAlternativaCorreta);

        let divEnunciado = document.createElement("div");
        divEnunciado.classList.add("containerEnunciadoQuestao");
        let titleEnunciado = document.createElement("label");
        titleEnunciado.textContent = "Enunciado da questão";
        titleEnunciado.classList.add("titleLabel");
        let textAreaEnunciado = document.createElement("textarea");
        textAreaEnunciado.classList.add("textAreaEnunciado")
        textAreaEnunciado.textContent = questao.getEnunciado();
        textAreaEnunciado.name = "enunciado";

        divEnunciado.appendChild(titleEnunciado);
        divEnunciado.appendChild(textAreaEnunciado);

        let divQuestaoData = document.createElement("div");
        divQuestaoData.classList.add("dataQuestao");
        divQuestaoData.appendChild(divEnunciado);
        divQuestaoData.appendChild(divAlternativaECorreta);

        let manageButtons = createManageButtons(entityIdentifier, questao);

        let mainDiv = document.createElement("div");
        mainDiv.classList.add("questaoContainer");
        mainDiv.appendChild(divQuestaoData);
        mainDiv.appendChild(manageButtons);
        mainDiv.id = entityIdentifier;

        container.appendChild(mainDiv);

        if(i < entidades.length - 1){
            let separador = document.createElement("div");
            separador.classList.add("separador");

            container.appendChild(separador);

        }

    }

}

function generateQuestaoAlternativa(title, content, name) {
    let container = document.createElement("div");
    container.classList.add("questaoAlternativaContainer");
    
    let titleLabel = document.createElement("label");
    titleLabel.classList.add("titleLabel");
    titleLabel.textContent = title;

    let textArea = document.createElement("textarea");
    textArea.classList.add("questaoAlternativaTexto");
    textArea.textContent = content;
    textArea.name = name;

    container.appendChild(titleLabel);
    container.appendChild(textArea);

    return container;
}

function generateRadioAlternativaCorreta(title, group, value) {
    let container = document.createElement("div");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.value = value;
    radio.name = group;

    let radioTitle = document.createElement("label");
    radioTitle.textContent = title;

    container.appendChild(radioTitle);
    container.appendChild(radio);

    return container;

}

async function registerTurma(event){
    event.preventDefault();
    
    // let form = document.getElementById("formAdicionarTurma")

    let cursoId = document.getElementById("selectCursoParaTurma").value;
    
    let checkboxesAlunos = document.getElementsByName("AlunosInserirTurma");

    var cpfsAlunos = [];

    checkboxesAlunos.forEach(checkboxAluno => {
        if (checkboxAluno.checked) {
            let cpfAluno = checkboxAluno.id;
            cpfsAlunos.push(cpfAluno);
        }
    });
    
    console.log(cpfsAlunos);

    // let formData = new FormData();
    let data = {
    	"idCurso": cursoId,
        "dataInicio": formatarDataDMA(document.getElementById("diaInicio").value),
        "dataTermino": formatarDataDMA(document.getElementById("diaFim").value),
        "cpfTutor": document.getElementById("escolhaDeTutor").value,
        "cpfList": cpfsAlunos
    }
    
    await serverRequester.fazerPost("/turmas/cadastrar/" , data).then((res) => {
        console.log(res.responseJson);
        let alunos = res.responseJson.alunos;
        let curso = res.responseJson.curso;

        auth().then((token) => {
            
            alunos.forEach(aluno => {
                let registrationID = curso.id + aluno.cpf;
    
                let nomeCompleto = aluno.nome.split(" ");
                let primeiroNome = nomeCompleto[0];
                let ultimoNome = nomeCompleto[-1];
    
                console.log(registrationID);
    
                let usuario = {
                    id: registrationID,
                    nome: primeiroNome,
                    sobrenome: ultimoNome,
                    email: aluno.email
                }

                uploadAluno(curso.id, token, usuario);

                let log = new LogRegister();
                log.createNewLog("Cadastro de nova turma no curso");
            });

        });

    });

}

async function gerirTurmasToShow() {
    let container = document.getElementById("gerirTurmasToShow");
    container.innerHTML = "";

    let response = await serverRequester.fazerGet("/turmas");

    let turmas = response["responseJson"];

    turmas.forEach(turma => {

        let turmaClass = new Turma(turma);

        let entityIdentifier = "turma" + (turmas.indexOf(turma) + 1);

        turmaClass.setDataInicio(turma.dataInicio);
        turmaClass.setDataTermino(turma.dataTermino);
        turmaClass.setTutor(turma.tutor);

        let entityContainer = document.createElement("div");
        entityContainer.classList.add("contentBox");
        entityContainer.style.width = "90%";
        entityContainer.id = entityIdentifier;

        let fieldsContainer = document.createElement("div");
        fieldsContainer.style.width = "60%";

        let div1 = document.createElement("div");
        div1.style.display = "flex";
        div1.style.flexDirection = "row";

        let fieldDataInicio = createFieldBox("Data de início: ", turmaClass.getDataInicio(), "dataInicio");
        let fieldDataTermino = createFieldBox("Data de término: ", turmaClass.getDataTermino(), "dataTermino");
        let fieldTutor = createFieldBox("Tutor: ", turmaClass.getTutor().cpf, "tutor");

        div1.appendChild(fieldDataInicio);
        div1.appendChild(fieldDataTermino);
        div1.appendChild(fieldTutor);
        
        let manageButtons = createManageButtons(entityIdentifier, turmaClass);

        fieldsContainer.appendChild(div1);

        entityContainer.appendChild(fieldsContainer);
        entityContainer.appendChild(manageButtons);

        container.appendChild(entityContainer);

        let separador = document.createElement("div");
        separador.classList.add("separador");

        container.appendChild(separador);

    });

}

function colapsarTurma(turmaIdentifier){
    let container = document.getElementById(turmaIdentifier);

    let botaoExpandir = container.getElementsByClassName("fa-chevron-ExpandirTurma")[0];

    if(botaoExpandir.className.includes("left")){
        botaoExpandir.className = "fas fa-chevron-down fa-chevron-ExpandirTurma";
        container.classList.remove("hideTurma");
        container.classList.add("showTurma");

    }else{
        botaoExpandir.className = "fas fa-chevron-left fa-chevron-ExpandirTurma";
        container.classList.remove("showTurma");
        container.classList.add("hideTurma");
        
    }
    
}

async function showQuestoesProva() {
    let select = document.getElementById("selectCursoProva");
    let idCurso = select.value;

    let response = await serverRequester.fazerGet("/cursos/" + idCurso);

    let questoes = response["responseJson"]["questoes"];

    let container = document.getElementById("questoesNaoSelecionadasProva");
    let containerSelecionadas = document.getElementById("questoesSelecionadasProva");
    containerSelecionadas.innerHTML = "";
    container.innerHTML = "";

    for (let i = 0; i < questoes.length; i++) {
        const questaoData = questoes[i];
        
        let questao = new Questao(questaoData);

        let questaoProvaId = "questaoProva-" + questao.getId();

        let containerQuestao = document.createElement("div");
        containerQuestao.classList.add("containerQuestaoProva");
        containerQuestao.id = questaoProvaId;

        let divEnunciadoResposta = document.createElement("div");
        divEnunciadoResposta.classList.add("divEnunciadoRespostaProva");

        let labelEnunciado = document.createElement("label");
        labelEnunciado.textContent = questao.getEnunciado();
        let labelResposta = document.createElement("label");
        labelResposta.textContent = "Resposta correta: ";

        switch (questao.getAlternativaCorreta()) {
            case "A":
                labelResposta.textContent += questao.getAlternativaA();
                break;
        
            case "B":
                labelResposta.textContent += questao.getAlternativaB();
                break;
            
            case "C":
                labelResposta.textContent += questao.getAlternativaC();
                break;

            case "D":
                labelResposta.textContent += questao.getAlternativaD();
                break;

            default:
                break;

        }

        divEnunciadoResposta.appendChild(labelEnunciado);
        divEnunciadoResposta.appendChild(labelResposta);

        let botaoAdicionarQuestao = document.createElement("span");
        botaoAdicionarQuestao.className = "fas fa-plus fa-buttonAddQuestaoProva";
        botaoAdicionarQuestao.onclick = function(){
            colocarQuestaoListaProva(containerQuestao);
        }

        containerQuestao.appendChild(divEnunciadoResposta);
        containerQuestao.appendChild(botaoAdicionarQuestao);
        containerQuestao.getElementsByClassName("fa-buttonAddQuestaoProva");

        container.appendChild(containerQuestao);

    }

}

async function registerProva() {
    let containerListaQuestoesAdicionadas = document.getElementById("questoesSelecionadasProva");
    let select = document.getElementById("selectCursoProva");
    let idCurso = select.value;

    let data = {"questoes": []};

    let questoes = containerListaQuestoesAdicionadas.getElementsByClassName("containerQuestaoProva");

    for (let i = 0; i < questoes.length; i++) {
        const questao = questoes[i];
        
        let idQuestao = questao.id.split("-")[1];

        data["questoes"].push({"id": idQuestao});
        
    }

    await serverRequester.fazerPost("/cursos/setProva?idCurso=" + idCurso, data);

}

function colocarQuestaoListaProva(containerQuestao) {
    let listaQuestoesAdicionadas = document.getElementById("questoesSelecionadasProva");

    containerQuestao.remove();

    listaQuestoesAdicionadas.appendChild(containerQuestao);
    let botaoRemoverQuestao = containerQuestao.getElementsByClassName("fa-buttonAddQuestaoProva")[0];
    botaoRemoverQuestao.className = "fas fa-minus fa-buttonRemoveQuestaoProva";
    botaoRemoverQuestao.onclick = function () {
        tirarQuestaoListaProva(containerQuestao);

    }

}

function tirarQuestaoListaProva(containerQuestao) {
    let listaQuestoesCurso = document.getElementById("questoesNaoSelecionadasProva");

    containerQuestao.remove();

    listaQuestoesCurso.appendChild(containerQuestao);
    let botaoAdicionarQuestao = containerQuestao.getElementsByClassName("fa-buttonRemoveQuestaoProva")[0];
    botaoAdicionarQuestao.className = "fas fa-plus fa-buttonAddQuestaoProva";
    botaoAdicionarQuestao.onclick = function () {
        colocarQuestaoListaProva(containerQuestao);

    }

}

loadAllCursos("selectCursoParaPilula");
loadAllCursos("selectCursoQuestao");
loadAllCursos("selectQuestaoPorCurso");
loadAllCursos("selectCursoParaTurma");
loadAllCursos("selectCursoDashboard");
loadAllCursos("selectCursoProva");
loadGestoresSelect("escolhaDeGestor");
loadTutoresSelect("escolhaDeTutor");
