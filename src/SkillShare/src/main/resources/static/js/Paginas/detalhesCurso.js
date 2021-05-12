window.onload = async function carregarConteudo() {

	let url = window.location.href;
	let quaseid = url.split("detalhesCurso");
	let id = quaseid[1];

	let resposta = await serverRequester.fazerGet("/turmas/curso/" + id + "/aluno/");

	let gestorResponse = await serverRequester.fazerGet("/cursos/" + id + "/gestor");
	let gestor = gestorResponse.responseJson.nome;

	let resp = resposta.responseJson;
	console.log(resp);

	auth().then((token) => {

			let registrationId = resp.turma.curso.id + resp.cpfAluno;

			let tituloCurso = document.getElementById("titleCurso");
			tituloCurso.innerText = resp.turma.curso.titulo;

			let descricaoCurso = document.getElementById("descricaoCurso");
			descricaoCurso.innerText = resp.turma.curso.descricao;

			let gestorCurso = document.getElementById("gestorCurso");
			gestorCurso.textContent = gestor;

			let linkCursoScorm = getLinkCurso(registrationId, token, "localhost:8080/meusCursosAluno").then((link) => {
				let aLinkCurso = document.getElementById("linkCurso");
				aLinkCurso.href = link;
			});

			let cursoScorm = getProgressoAluno(registrationId, token).then((res) => {
	    	
				console.log(res);

				//let porcentagemProgressoCurso = document.getElementById("totalProgressoCurso");
				//let barraProgresso = document.getElementById("barraProgressoAluno");


				let progressoScorm = "1";
				/* if (res.registrationCompletion == "COMPLETED") {
					porcentagemProgressoCurso.textContent = "100%";
				}
				else {
					progressoScorm = res.registrationCompletionAmount;
					let progressoPorcentagem = progressoScorm * 100;
					porcentagemProgressoCurso.textContent = progressoPorcentagem + "%";

					barraProgresso.style.width = progressoPorcentagem + "%";
				} */

				let diaInicio = document.getElementById("dataInicioCurso");
				if (res.firstAccessDate) {
					diaInicio.textContent = "Você iniciou esse curso no dia " + res.firstAccessDate;
				}
				else {
					diaInicio.textContent = "Você ainda não iniciou esse curso";
				}

				let diaTermino = document.getElementById("finalizacaoCurso");
				if (progressoScorm != "1"){
					diaTermino.textContent = "ainda não o finalizou";
				}
				else {
					diaTermino.textContent = "o finalizou";
				}

				let totalHorasCurso = document.getElementById("totalHorasCurso");
				let horasScorm = 0;
				if (res.totalSecondsTracked >= 3600) {
					horasScorm = parseFloat((res.totalSecondsTracked / 3600).toFixed(2)) + " horas";
				}
				else {
					horasScorm = parseFloat((res.totalSecondsTracked / 60).toFixed(2)) + " minutos"
				}

				totalHorasCurso.textContent = horasScorm;

			});

			renderIMG(resp.turma.curso.thumb.arquivo.conteudo, resp.turma.curso.thumb.arquivo.tipoArquivo, "image-1");

	});

}
