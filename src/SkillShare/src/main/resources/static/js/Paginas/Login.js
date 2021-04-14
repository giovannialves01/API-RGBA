async function logar(event) {
    event.preventDefault();

    let cpf = document.getElementById("cpf-beautyInput").value;
    let senha = document.getElementById("senha-beautyInput").value;
    
    let credenciais = {"cpf": cpf, "senha":senha};
    
    let resposta = await serverRequester.fazerPost("/usuario/logar", credenciais);
    
    if (resposta["ok"]){
        let userType = resposta["responseJson"]["type"];
    	
        switch (userType) {
            case "admin":
                window.location.href = "adminPage";
                break;
    
            case "gestor":
                window.location.href = "gestorPage";
                break;
    
            case "tutor":
                window.location.href = "tutorPage";
                break;

            case "aluno":
                window.location.href = "alunoPage";
                break;

        }

    }else {
    	alert("Dados incorretos ou usuário inexistente");

    }

}
