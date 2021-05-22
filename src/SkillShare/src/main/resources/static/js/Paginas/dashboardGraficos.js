window.onload = async function carregarConteudo() {

	google.charts.load('current', { 'packages': ['corechart'] });
	google.charts.setOnLoadCallback(drawChart1);

	function drawChart1() {

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

		var chart = new google.visualization.PieChart(document.getElementById('piechart'));

		chart.draw(data, options);
	}

	google.charts.load("current", { packages: ["corechart"] });
	google.charts.setOnLoadCallback(drawChart2);
	function drawChart2() {
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

		var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
		chart.draw(data, options);
	}

	$(window).resize(function() {
		drawChart1();
		drawChart2();
	});
}