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
 
 async function loadDadosUsuario() {

    let response = await serverRequester.fazerGet("/usuario/getData");

    let usuario = response.responseJson;

    document.getElementById("cpfUsuario").value = usuario.cpf;
    document.getElementById("nomeUsuario").value = usuario.nome;
    document.getElementById("emailUsuario").value = usuario.email;
    document.getElementById("senhaUsuario").value = usuario.senha;


}

async function atualizarUsuario(event) {
    event.preventDefault();

    var data = {
        cpf: document.getElementById("cpfUsuario").value,
        nome: document.getElementById("nomeUsuario").value,
        email: document.getElementById("emailUsuario").value,
        senha: document.getElementById("senhaUsuario").value
    }

    let response = await serverRequester.fazerPost("/usuario/atualizar", data);

    if(response["ok"]){
        alert("Dados alterados");

        let log = new LogRegister();
        log.createNewLog("Alteração de dados do usuário: " + data.cpf);

    }else{
        alert("Não foi possível alterar os dados");

    }

}

loadDadosUsuario();