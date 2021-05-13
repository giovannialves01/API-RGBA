window.onload = async function carregarConteudo() {

	let url = window.location.href;
	let quaseid = url.split("tutoriaCurso");
	let id = quaseid[1];

     console.log(id);

	let divTodasTurmas = document.getElementById("todasTurmas");

	let resposta = await serverRequester.fazerGet("/turmas/turma/tutor");

	let turmas = resposta.responseJson;

	console.log(turmas);

     for (let i = 0; i < turmas.length; i++) {
		if (turmas[i].curso.id == id) {
			let divTurma = document.createElement("div");
			divTurma.classList.add("turma");

			let icone = document.createElement("i");
			icone.classList.add("fas");
			icone.classList.add("fa-users");

			let pTexto = document.createElement("p");
			pTexto.innerText = "Início em: " + turmas[i].dataInicio + ". Término em: " + turmas[i].dataTermino + ".";

			divTurma.appendChild(icone);
			divTurma.appendChild(pTexto);

			let separador = document.createElement("div");
			separador.classList.add("separador");

			let aLinkAlunos = document.createElement("a");
			aLinkAlunos.classList.add("linkAlunosTurma");
			aLinkAlunos.href = "tutoriaAlunosTurma" + turmas[i].id;

			aLinkAlunos.appendChild(divTurma);

			divTodasTurmas.appendChild(aLinkAlunos);
			divTodasTurmas.appendChild(separador);
		}
	}

}