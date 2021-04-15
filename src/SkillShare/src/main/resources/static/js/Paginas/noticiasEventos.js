async function requestNoticias() {
	serverRequester.fazerGet("/destaques").then((res) => {

		res.responseJson.map((noticia) => {
			console.log("Notícias:");
			console.log(noticia);
		})

	}).catch((err) => {
        console.log(err);
    });
}

async function requestEventos() {
	serverRequester.fazerGet("/eventos").then((res) => {

		res.responseJson.map((evento) => {
			console.log("Eventos:");
			console.log(evento);
		})

	}).catch((err) => {
		console.log(err);
	});
}

requestNoticias();
requestEventos();