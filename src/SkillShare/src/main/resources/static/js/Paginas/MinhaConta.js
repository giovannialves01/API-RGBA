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

loadDadosUsuario()