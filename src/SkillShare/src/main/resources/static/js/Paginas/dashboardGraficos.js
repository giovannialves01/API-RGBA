document.addEventListener("DOMContentLoaded", function (event) { // pelo que entendi não pode usar mais de um window.onload na mesma página
	// que no nosso caso é a "administracao". estava dando conflito das coisas das turmas
	async function qtdDeUsuarios() {

		let respostaDash = await serverRequester.fazerGet("/usuario/all");

		let usuarios = respostaDash.responseJson;

		let pUsuarios = document.getElementById("qtdUsuariosDash");
		pUsuarios.innerText = usuarios.length;

	}

	async function qtdDeAlunosDash() {
		let respostaDash = await serverRequester.fazerGet("/alunos");

		let alunos = respostaDash.responseJson;
		return alunos;
	}

	async function qtdDeTutores() {
		let respostaDash = await serverRequester.fazerGet("/tutor");

		let tutores = respostaDash.responseJson;
		return tutores.length;
	}

	async function qtdDeGestores() {
		let respostaDash = await serverRequester.fazerGet("/gestor");

		let gestores = respostaDash.responseJson;
		return gestores.length;
	}

	async function qtdDeAdms() {
		let respostaDash = await serverRequester.fazerGet("/adm");

		let administradores = respostaDash.responseJson;
		return administradores.length;
	}

	async function qtdDeCursos() {

		let respostaDash = await serverRequester.fazerGet("/cursos");

		let cursos = respostaDash.responseJson;

		let pCursos = document.getElementById("qtdCursosDash");
		pCursos.innerText = cursos.length;
	}

	google.charts.load('current', { 'packages': ['corechart'] });
	google.charts.setOnLoadCallback(graficoUsuariosPorTipo);

	async function graficoUsuariosPorTipo() {

		let adms = await qtdDeAdms();
		let gests = await qtdDeGestores();
		let tuts = await qtdDeTutores();
		let alns = await qtdDeAlunosDash();
		console.log(alns);

		var data = google.visualization.arrayToDataTable([
			['Nível de acesso', 'Quantidade'],
			['Administrador', adms],
			['Gestor', gests],
			['Tutor', tuts],
			['Aluno', alns.length]
		]);

		var options = {
			title: 'Usuários por tipo',
			width: 400,
			height: 400
		};

		var chart = new google.visualization.PieChart(document.getElementById('graficoUsuariosPorTipo'));

		chart.draw(data, options);
	}

	google.charts.load("current", { packages: ["corechart"] });
	google.charts.setOnLoadCallback(graficoAlunosRealizandoCursos);

	async function graficoAlunosRealizandoCursos() {
		let nenhum = 0;
		let algum = 0;
		let alunos = await qtdDeAlunosDash();

		alunos.forEach(async aluno => {
			let resposta = serverRequester.fazerGet("/turmas/turma/aluno/" + aluno.cpf);

			resposta.then((res) => {
				if (res.responseJson.length == 0) {
					nenhum++;
				}
				else {
					algum++;
				}


				var data = google.visualization.arrayToDataTable([
					['Alunos', 'Quantidade'],
					['Em curso', algum],
					['Nenhum', nenhum]
				]);

				var options = {
					title: 'Alunos realizando cursos',
					pieHole: 0.4,
					width: 400,
					height: 400
				};

				var chart = new google.visualization.PieChart(document.getElementById('graficoAlunosRealizandoCursos'));
				chart.draw(data, options);
			});
		});

	}

	function dadosDoCursoSelecionadoDash(select) {

		let idCurso = select.value;
		auth().then((token) => {
			let infosCurso = getCourseInfo(idCurso, token).then((infos) => {
				console.log(infos);
			});

			let qtdFinalizados = 0;
			let segundosTotalCurso = 0;
			let qtdAlunos = 0;
			let alunosDoCurso = getRegistrations(idCurso, token)
				.then((alunos) => {
					console.log(alunos);
					alunos.registrations.forEach((aluno) => {
						qtdAlunos++;
						segundosTotalCurso = segundosTotalCurso + aluno.totalSecondsTracked;
						if (aluno.registrationCompletion == "COMPLETED") {
							qtdFinalizados++;
						}
					});

					let qtdCertificados = document.getElementById("qtdCursosFinalizadosDash");
					qtdCertificados.innerText = qtdFinalizados; // está só exibindo o total que terminou o curso!!!!

					let qtdHoras = document.getElementById("qtdHorasCursoDash");
					qtdHoras.innerText = parseFloat(segundosTotalCurso / 3600).toFixed(2);
				});
		});

		google.charts.load('current', { 'packages': ['corechart'] });
		google.charts.setOnLoadCallback(tempoFinalizacaoCurso);

		function tempoFinalizacaoCurso() {

			var data = google.visualization.arrayToDataTable([

				['Tempo', 'Quantidade'],
				['1 a 2 horas', 11],
				['2 a 3 horas', 2],
				['3 a 6 horas', 2],
				['mais de 6 horas', 2]
			]);

			var options = {
				title: 'Tempo de finalização do curso',
				width: 300,
				height: 300
			};

			var chart = new google.visualization.PieChart(document.getElementById('tempoFinalizacaoCurso'));

			chart.draw(data, options);
		}

		google.charts.load("current", { packages: ["corechart"] });
		google.charts.setOnLoadCallback(alunosCursoXalunosPlataforma);

		function alunosCursoXalunosPlataforma() {
			var data = google.visualization.arrayToDataTable([
				['Inserção no curso', 'Quantidade'],
				['Estão no curso', 11],
				['Não estão no curso', 2]
			]);

			var options = {
				title: 'Alunos do curso X alunos da plataforma',
				pieHole: 0.4,
				width: 300,
				height: 300
			};

			var chart = new google.visualization.PieChart(document.getElementById('alunosCursoXalunosPlataforma'));
			chart.draw(data, options);
		}

		google.charts.load('current', { packages: ['corechart', 'bar'] });
		google.charts.setOnLoadCallback(graficoNotaDosAlunosCurso);

		function graficoNotaDosAlunosCurso() {

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Alunos');
			data.addColumn('number', 'Notas');

			data.addRows(
				[
					['0', 1],
					['1', 2],
					['2', 3],
					['3', 4],
					['4', 5],
					['5', 6],
					['6', 7],
					['7', 8],
					['8', 9],
					['9', 10],
					['10', 11]
				]
			);

			var options = {
				'title': 'Notas dos alunos',
				'width': 500,
			};

			var chart = new google.visualization.ColumnChart(
				document.getElementById('graficoNotaDosAlunosCurso'));

			chart.draw(data, options);
		}


		google.charts.load('current', { packages: ['corechart', 'bar'] });
		google.charts.setOnLoadCallback(engajamentoAlunosCurso);

		function engajamentoAlunosCurso() {

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Situação');
			data.addColumn('number', 'Quantidade');

			data.addRows(
				[
					['Em curso', 78],
					['Pausado', 178],
				]
			);

			var options = {
				'title': 'Engajamento dos alunos',
				'width': 300,
			};

			var chart = new google.visualization.ColumnChart(
				document.getElementById('engajamentoAlunosCurso'));

			chart.draw(data, options);
		}

		let divCursoSelecionado = document.getElementById("infosDoCursoDivDash");
		divCursoSelecionado.classList.remove("centerDashEscondida");
		divCursoSelecionado.classList.add("centerDash");
		let divCursoSelecionado2 = document.getElementById("infosDoCursoDivDash2");
		divCursoSelecionado2.classList.remove("centerDashEscondida");
		divCursoSelecionado2.classList.add("centerDash");
	}

	let filter = document.getElementById('selectCursoDashboard');
	filter.onchange = function () {
		dadosDoCursoSelecionadoDash(filter);
	}

	qtdDeUsuarios();
	qtdDeCursos();
});