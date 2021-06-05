document.addEventListener("DOMContentLoaded", async function (event) {
	
	let resposta = await serverRequester.fazerGet("/alunos");
	
	let alunos = resposta.responseJson;

	let tabelaAlunos = document.getElementById("tbodyTurma");

	console.log(alunos);
	
	alunos.forEach(aluno => {

		let tr = document.createElement("tr");

		let tdNomeAluno = document.createElement("td");
		let divNomeAluno = document.createElement("div");
		divNomeAluno.classList.add("published");

		let checkboxAluno = document.createElement("input");
		checkboxAluno.setAttribute("type", "checkbox");
		checkboxAluno.id = aluno.cpf;
		checkboxAluno.name= "AlunosInserirTurma";
		divNomeAluno.appendChild(checkboxAluno);

		let labelNomeAluno = document.createElement("label");
		labelNomeAluno.classList.add("titleTurma");
		labelNomeAluno.innerText = aluno.nome;
		labelNomeAluno.for = aluno.cpf;
		divNomeAluno.appendChild(labelNomeAluno);

		tdNomeAluno.appendChild(divNomeAluno);

		let tdCpf = document.createElement("td");
		tdCpf.innerText = aluno.cpf;

		tr.appendChild(tdNomeAluno);
		tr.appendChild(tdCpf);

		tabelaAlunos.appendChild(tr);

	});
});