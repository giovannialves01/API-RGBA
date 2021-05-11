window.onload = async function carregarConteudo () {

	var divTodosCursos = document.getElementById("todosCursos");
	divTodosCursos.innetHTML = "";

	let resposta = await serverRequester.fazerGet("/turmas/cursos/aluno/");
	
	let turmas = resposta.responseJson;
	
	console.log(turmas);
	
    for (let i = 0; i < turmas.length; i++) {
    	
    	// div que engloba as coisas do curso
    	var divCurso = document.createElement("div");
    	divCurso.classList.add("curso");
    	
    	let imgCurso = document.createElement("img");
    	imgCurso.alt = "foto do curso";
    	imgCurso.src = "https://gestiona.com.br/wp-content/uploads/2019/11/Inform%C3%A1tica-1-1.jpg";
    	divCurso.appendChild(imgCurso);
    	
    	let pTituloCurso = document.createElement("p");
    	pTituloCurso.innerText = turmas[i].curso.titulo;
    	divCurso.appendChild(pTituloCurso);
    	
    	var divBarraProgresso = document.createElement("div");
    	divBarraProgresso.classList.add("barraProgresso");
    	
    	var divProgresso = document.createElement("div");
    	divProgresso.classList.add("progresso");
    	divProgresso.style.width = "90%";
    	divBarraProgresso.appendChild(divProgresso);
    	
    	divCurso.appendChild(divBarraProgresso);
    	
    	divTodosCursos.appendChild(divCurso);
    	
    }
}
