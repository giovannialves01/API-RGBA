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

	async function dadosDoCursoSelecionadoDash(select) {
		// variaveis do gráfico tempoFinalizacaoCurso()
		let ate2horas = 0;
		let de2a3horas = 0;
		let de3a6horas = 0;
		let maisde6horas = 0;
		// -------------------------------------------
		// variaveis do gráfico de qtd de aluno dentro e fora do curso alunosCursoXalunosPlataforma()
		let alunosGrafico = 0;
		let qtdAlunosCurso = 0;
		// -------------------------------------------
		// variaveis do grafico de alunos engajados engajamentoAlunosCurso()
		let alunosEngajados = 0
		let alunosPausados = 0;
		let alunosFinalizados = 0;
		// -------------------------------------------

		let idCurso = select.value;

		let respostaInfosCurso = await serverRequester.fazerGet("/cursos/" + idCurso);
		console.log("Infos do curso no nosso banco:");
		console.log(respostaInfosCurso);
		console.log("-------------------");

		let provaCurso = respostaInfosCurso.responseJson.prova.id;
		let respostaFeedbacks = await serverRequester.fazerGet("/alunos/getAllFeedbacks/" + provaCurso);		
		console.log("Feedbacks desse curso:");
		console.log(respostaFeedbacks);
		console.log("-------------------");
		let qtdFinalizados = respostaFeedbacks.responseJson.length;
		let qtdCertificados = document.getElementById("qtdCursosFinalizadosDash");
		qtdCertificados.innerText = qtdFinalizados;

		auth().then((token) => {
			let infosCurso = getCourseInfo(idCurso, token).then((infos) => {
				console.log(infos);
			});

			// let qtdFinalizados = 0;
			let segundosTotalCurso = 0;
			let segundosTotalCursoFinalizado = 0;
			let qtdAlunos = 0;
			alunosDoCurso = getRegistrations(idCurso, token)
				.then((alunos) => {
					console.log(alunos);
					alunos.registrations.forEach((aluno) => {
						qtdAlunos++;
						segundosTotalCurso = segundosTotalCurso + aluno.totalSecondsTracked;
						if (aluno.registrationCompletion == "COMPLETED") {
							alunosFinalizados++;
							let horasTotalCursoFinalizado = 0;
							segundosTotalCursoFinalizado = segundosTotalCursoFinalizado + aluno.totalSecondsTracked;
							horasTotalCursoFinalizado = parseFloat(segundosTotalCurso / 3600);
							if (horasTotalCursoFinalizado < 2) {
								ate2horas++;
							}
							else if (horasTotalCursoFinalizado >= 2 && horasTotalCursoFinalizado < 3) {
								de2a3horas++
							}
							else if (horasTotalCursoFinalizado >= 3 && horasTotalCursoFinalizado < 6) {
								de3a6horas++
							}
							else {
								maisde6horas++
							}

						}

						// grafico engajamentoAlunosCurso()
						if (aluno.registrationCompletion == "UNKNOWN" || aluno.registrationCompletion ==  "INCOMPLETE") {
							let ultimoAcessoAluno = moment(aluno.lastAccessDate);
							console.log("DIA DO ALUNO AQUI");
							console.log(ultimoAcessoAluno);
							// let ultimoAcessoAluno = moment("2021-05-01T19:13:24Z"); linha só para teste
							let hoje = moment();

							let diffTempo = hoje.diff(ultimoAcessoAluno, 'days')
							
							if (diffTempo >= 7) {
								alunosPausados++;
							}
							else {
								alunosEngajados++;
							}
						}
					});

					// variaveis do gráfico tempoFinalizacaoCurso()
					console.log(ate2horas);
					console.log(de2a3horas);
					console.log(de3a6horas);
					console.log(maisde6horas);
					tempoFinalizacaoCurso()
					// -------------------------------------------


					// let qtdCertificados = document.getElementById("qtdCursosFinalizadosDash");
					// qtdCertificados.innerText = qtdFinalizados; // está só exibindo o total que terminou o curso!!!!

					let qtdHoras = document.getElementById("qtdHorasCursoDash");
					qtdHoras.innerText = parseFloat(segundosTotalCurso / 3600).toFixed(2);

					let respostaAlunosPlataforma = serverRequester.fazerGet("/alunos").then((alunosDoCursoGrafico) => {

						alunosGrafico = alunosDoCursoGrafico.responseJson;
			
						alunosGrafico.forEach(aluno => {
							alunos.registrations.forEach(alunoDoCurso => {
								if (idCurso + aluno.cpf == alunoDoCurso.id) {	
									qtdAlunosCurso++;
								}
							});
						});
			
						console.log("Quantidade de alunos desse curso: " + qtdAlunosCurso);
						alunosCursoXalunosPlataforma();
					});
					engajamentoAlunosCurso()
				});
		});

		google.charts.load('current', { 'packages': ['corechart'] });
		google.charts.setOnLoadCallback(tempoFinalizacaoCurso);

		async function tempoFinalizacaoCurso() {

			var data = google.visualization.arrayToDataTable([

				['Tempo', 'Quantidade'],
				['Até 2 horas', ate2horas],
				['2 a 3 horas', de2a3horas],
				['3 a 6 horas', de3a6horas],
				['mais de 6 horas', maisde6horas]
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

		async function alunosCursoXalunosPlataforma() {

			var data = google.visualization.arrayToDataTable([
				['Inserção no curso', 'Quantidade'],
				['Estão no curso', qtdAlunosCurso],
				['Não estão no curso', alunosGrafico.length - qtdAlunosCurso]
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

			let qtd0 = 0;
			let qtd1 = 0;
			let qtd2 = 0;
			let qtd3 = 0;
			let qtd4 = 0;
			let qtd5 = 0;
			let qtd6 = 0;
			let qtd7 = 0;
			let qtd8 = 0;
			let qtd9 = 0;
			let qtd10 = 0;
			let todosOsFeedbacks = respostaFeedbacks.responseJson;
			console.log("todos feedbacks:");
			console.log(todosOsFeedbacks);
			console.log("--------------");
			todosOsFeedbacks.forEach(feedback => {
				if (feedback.notaFinal == "0") {
					qtd0++;
				}
				else if (feedback.notaFinal == "1.00") {
					qtd1++;
				}
				else if (feedback.notaFinal == "2.00") {
					qtd2++;
				}
				else if (feedback.notaFinal == "3.00") {
					qtd3++;
				}
				else if (feedback.notaFinal == "4.00") {
					qtd4++;
				}
				else if (feedback.notaFinal == "5.00") {
					qtd5++;
				}
				else if (feedback.notaFinal == "6.00") {
					qtd6++;
				}
				else if (feedback.notaFinal == "7.00") {
					qtd8++;
				}
				else if (feedback.notaFinal == "8.00") {
					qtd8++;
				}
				else if (feedback.notaFinal == "9.00") {
					qtd9++;
				}
				else {
					qtd10++;
				}
			});

			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Alunos');
			data.addColumn('number', 'Notas');

			data.addRows(
				[
					['0', qtd0],
					['1', qtd1],
					['2', qtd2],
					['3', qtd3],
					['4', qtd4],
					['5', qtd5],
					['6', qtd6],
					['7', qtd7],
					['8', qtd8],
					['9', qtd9],
					['10', qtd10]
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
					['Em curso', alunosEngajados],
					['Pausado', alunosPausados],
					['Finalizado', alunosFinalizados]
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