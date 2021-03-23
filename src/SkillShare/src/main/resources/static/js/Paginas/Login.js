async function logar(event) {
    event.preventDefault();

    let cpf = document.getElementById("cpf-beautyInput").value;
    let senha = document.getElementById("senha-beautyInput").value;
    
    let credenciais = {"cpf": cpf, "senha":senha};
    
    let resposta = await serverRequester.fazerPost("/usuario/logar", credenciais);
    
    if (resposta["ok"]){
    	window.location.href = resposta["responseJson"]["nivel"];
    }
    else {
    	alert("Dados incorretos");
    }
}