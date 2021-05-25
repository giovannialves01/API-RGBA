document.addEventListener("DOMContentLoaded", function(event) { // pelo que entendi não pode usar mais de um window.onload na mesma página
																// que no nosso caso é a "administracao". estava dando conflito das coisas das turmas
  async function qtdDeUsuarios() {

		let respostaDash = await serverRequester.fazerGet("/usuario/all");

		let usuarios = respostaDash.responseJson;

		let pUsuarios = document.getElementById("qtdUsuariosDash");
		pUsuarios.innerText = usuarios.length;

	}
	
	async function qtdDeAlunosDash(){
		let respostaDash = await serverRequester.fazerGet("/alunos");

		let alunos = respostaDash.responseJson;
		return alunos;
	}
	
	async function qtdDeTutores(){
		let respostaDash = await serverRequester.fazerGet("/tutor");

		let tutores = respostaDash.responseJson;
		return tutores.length;
	}
	
	async function qtdDeGestores(){
		let respostaDash = await serverRequester.fazerGet("/gestor");

		let gestores = respostaDash.responseJson;
		return gestores.length;
	}
	
	async function qtdDeAdms(){
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

			resposta.then((res)=>{
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
		alert(select.value);
	}

	let filter = document.getElementById('selectCursoDashboard');
	filter.onchange = function() {
	  dadosDoCursoSelecionadoDash(filter);
	} 

	google.charts.load('current', { 'packages': ['corechart'] });
	google.charts.setOnLoadCallback(drawChart3);

	function drawChart3() {

		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work', 11],
			['Eat', 2],
			['Commute', 2],
			['Watch TV', 2],
			['Sleep', 7]
		]);

		var options = {
			title: 'My Daily Activities',
			width: 300,
			height: 300
		};

		var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

		chart.draw(data, options);
	}

	google.charts.load("current", { packages: ["corechart"] });
	google.charts.setOnLoadCallback(drawChart4);
	function drawChart4() {
		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work', 11],
			['Eat', 2],
			['Commute', 2],
			['Watch TV', 2],
			['Sleep', 7]
		]);

		var options = {
			title: 'My Daily Activities',
			pieHole: 0.4,
			width: 300,
			height: 300
		};

		var chart = new google.visualization.PieChart(document.getElementById('donutchart2'));
		chart.draw(data, options);
	}

	google.charts.load('current', { packages: ['corechart', 'bar'] });
	google.charts.setOnLoadCallback(drawBasic);

	function drawBasic() {

		var data = new google.visualization.DataTable();
		data.addColumn('timeofday', 'Time of Day');
		data.addColumn('number', 'Motivation Level');

		data.addRows([
			[{ v: [8, 0, 0], f: '8 am' }, 1],
			[{ v: [9, 0, 0], f: '9 am' }, 2],
			[{ v: [10, 0, 0], f: '10 am' }, 3],
			[{ v: [11, 0, 0], f: '11 am' }, 4],
			[{ v: [12, 0, 0], f: '12 pm' }, 5],
			[{ v: [13, 0, 0], f: '1 pm' }, 6],
			[{ v: [14, 0, 0], f: '2 pm' }, 7],
			[{ v: [15, 0, 0], f: '3 pm' }, 8],
			[{ v: [16, 0, 0], f: '4 pm' }, 9],
			[{ v: [17, 0, 0], f: '5 pm' }, 10],
		]);

		var options = {
			title: 'Motivation Level Throughout the Day',
			hAxis: {
				title: 'Time of Day',
				format: 'h:mm a',
				viewWindow: {
					min: [7, 30, 0],
					max: [17, 30, 0]
				}
			},
			vAxis: {
				title: 'Rating (scale of 1-10)'
			},
			width: 600
		};

		var chart = new google.visualization.ColumnChart(
			document.getElementById('columnchart'));

		chart.draw(data, options);
	}


	google.charts.load('current', { packages: ['corechart', 'bar'] });
	google.charts.setOnLoadCallback(drawBasic2);

	function drawBasic2() {

		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Mês');
		data.addColumn('number', 'Vendas');

		data.addRows(
			[
				['Janeiro', 78],
				['Fevereiro', 178],
			]
		);

		var options = {
			'title': 'Vendas por Mês',
			'width': 300,
		};

		var chart = new google.visualization.ColumnChart(
			document.getElementById('columnchart2'));

		chart.draw(data, options);
	}

	$(window).resize(function() {
		graficoUsuariosPorTipo();
		graficoAlunosRealizandoCursos();
		drawChart3();
		drawChart4();
		drawBasic();
		drawBasic2();
	});

	qtdDeUsuarios();
	qtdDeCursos();
});