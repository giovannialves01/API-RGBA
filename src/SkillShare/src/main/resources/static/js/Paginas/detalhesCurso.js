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

window.onload = async function carregarConteudo() {

	let url = window.location.href;
	let quaseid = url.split("detalhesCurso");
	let id = quaseid[1];

	let resposta = await serverRequester.fazerGet("/turmas/curso/" + id + "/aluno/");

	let gestorResponse = await serverRequester.fazerGet("/cursos/" + id + "/gestor");
	let gestor = gestorResponse.responseJson.nome;

	let resp = resposta.responseJson;
	
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
				aLinkCurso.target = "_blank";
			});

			let cursoScorm = getProgressoAluno(registrationId, token).then((res) => {
	    	
				console.log(res);
/* 
				let porcentagemProgressoCurso = document.getElementById("totalProgressoCurso");
				let barraProgresso = document.getElementById("barraProgressoAluno");


				let progressoScorm = "1";
				if (res.registrationCompletion == "COMPLETED") {
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
					let diaSemFormatar = res.firstAccessDate;
					let valores = diaSemFormatar.split('T');
					let dataFormatada = formatarDataDMA(valores[0]);
					diaInicio.textContent = "Você iniciou esse curso no dia " + dataFormatada; // + " às " + valores[1].slice(0, 8); problema de fuso horário
				}
				else {
					diaInicio.textContent = "Você ainda não iniciou esse curso";
				}

				let diaTermino = document.getElementById("finalizacaoCurso");
				
				if (res.registrationCompletion != "COMPLETED"){
					diaTermino.textContent = "ainda não o finalizou";
				}
				else {
					let diaSemFormatar = res.completedDate;
					let valores = diaSemFormatar.split('T');
					let dataFormatada = formatarDataDMA(valores[0]);
					diaTermino.textContent = "o finalizou no dia " + dataFormatada + " (parabéns!)";
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


				let divQuizzes = document.getElementById("itensAvaliativos1");
				let atividadesCurso = res.activityDetails.children[0].runtime.runtimeInteractions;
				for (let i = 0; i < atividadesCurso.length; i++) {
					let divQuestao = document.createElement("div");
					divQuestao.classList.add("itemAvaliativo");
					
					let iconeQuestao = document.createElement("i");
					iconeQuestao.classList.add("fas");
					iconeQuestao.classList.add("fa-book-reader");
					
					
					
					let spanTexto = document.createElement("span");
					let pesoQuestao = res.activityDetails.children[0].runtime.runtimeInteractions[i].weighting;
					let notaAluno = res.activityDetails.children[0].runtime.runtimeInteractions[i].result == "correct" ? pesoQuestao : "0";
					spanTexto.innerText = "Questão " + (i + 1) + " (nota: "+ notaAluno +"/"+ pesoQuestao +")";
					
					divQuestao.appendChild(iconeQuestao);
					divQuestao.appendChild(spanTexto);
					
					divQuizzes.appendChild(divQuestao);
				}
			});

			renderIMG(resp.turma.curso.thumb.arquivo.conteudo, resp.turma.curso.thumb.arquivo.tipoArquivo, "image-1");

	});

}
