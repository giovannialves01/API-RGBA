window.onload = async function carregarConteudo () {

	var divTodosCursos = document.getElementById("todosCursos");
	divTodosCursos.innetHTML = "";

	let resposta = await serverRequester.fazerGet("/turmas/cursos/aluno/");
	
	let res = resposta.responseJson;
	let turmas = res.turmas;
	
	console.log(turmas);
	
	auth().then((token) => {
		
	    for (let i = 0; i < turmas.length; i++) {
	    	
	    	// div que engloba as coisas do curso
	    	var divCurso = document.createElement("div");
	    	divCurso.classList.add("curso");
	    	
	    	
	    	let imgCurso = document.createElement("img");
	    	imgCurso.alt = "foto do curso";
	    	var id_img_curso = "imgCurso" + turmas[i].curso.id;
	    	imgCurso.id = id_img_curso;
	    	divCurso.appendChild(imgCurso);
	    	
	    	let pTituloCurso = document.createElement("p");
	    	pTituloCurso.innerText = turmas[i].curso.titulo;
	    	divCurso.appendChild(pTituloCurso);
	    	
	    	var divBarraProgresso = document.createElement("div");
	    	divBarraProgresso.classList.add("barraProgresso");
	    	
	    	
	    	var divProgresso = document.createElement("div");
	    	divProgresso.classList.add("progresso");
	    	
	    	let cursoScorm = getProgressoAluno(turmas[i].curso.id + res.cpfAluno, token).then((res) => {
	    	
	    		let progressoScorm = res.registrationCompletionAmount;
	    		let progressoPorcentagem = progressoScorm * 100;
	    		
	    		divProgresso.style.width = progressoPorcentagem + "%";
	    	});
	    	
	    	
	    	divBarraProgresso.appendChild(divProgresso);
	    	
	    	divCurso.appendChild(divBarraProgresso);
	    	
	    	var aLinkCurso = document.createElement("a");
	    	aLinkCurso.href = "/detalhesCurso" + turmas[i].curso.id;
	    	aLinkCurso.style.textDecoration = "none";
	    	aLinkCurso.style.color = "black";
	    	
	    	aLinkCurso.appendChild(divCurso);
	    	
	    	divTodosCursos.appendChild(aLinkCurso);
	    	
	    	renderIMG(turmas[i].curso.thumb.arquivo.conteudo, turmas[i].curso.thumb.arquivo.tipoArquivo, id_img_curso);
	    	
	    }
		
	});
	
}
