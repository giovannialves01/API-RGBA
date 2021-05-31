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
                window.location.href = "administracao";
                break;
    
            case "gestor":
                window.location.href = "administracao";
                break;
    
            case "tutor":
                window.location.href = "tutoria";
                break;

            case "aluno":
                window.location.href = "alunoPage";
                
                break;

        }

        localStorage.setItem("cpfUser", cpf);

    }else {
    	alert("Dados incorretos ou usuário inexistente");

    }

}
