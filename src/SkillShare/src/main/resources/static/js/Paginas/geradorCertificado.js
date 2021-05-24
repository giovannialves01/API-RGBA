async function loadCertificados() {
    let containerCertificados = document.getElementById("certificadosToShow");
	containerCertificados.innerHTML = ''

    let response = await serverRequester.fazerGet("/alunos"); //aqui

    let destaques = response["responseJson"];

    for (let i = 0; i < destaques.length; i++) {
        const data = destaques[i];
        
        //let certificadoo = new Certificado(); //aqui

        let entityIdentifier = "certificado" + (i + 1);

        let entityContainer = document.createElement("div");
        entityContainer.classList.add("contentBox");
        entityContainer.id = 'certificado ' + (i + 1);
        
        let showContentLabel = document.createElement("label");
		showContentLabel.textContent = "aqui vai o nome do curso";
        showContentLabel.id = 'nomeCurso';
		
		let showContentButton = document.createElement("button");
		showContentButton.textContent = "Baixar Certificado";
        showContentButton.classList.add("Certificados");
        showContentButton.onclick = function (){
                now = new Date
    			monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");

    			var el = document.getElementById("certificado");
    			var doc = new jsPDF("l", 'mm', 'a4');
    			var nomeCurso= 'Curso de análise de dados publicos';
    			var nomeCursoFormatado = doc.splitTextToSize(nomeCurso, (70));
    			var nomeAluno = 'Giovanni dos Santos Alves';
   				var tmp = nomeAluno.split(' ');
    			var nomeAlunoFormatado = tmp[0] + ' ' + tmp[tmp.length-1] + ',';
    
    			doc.addImage(el, 'PNG', 0, 0, 297, 210);
    			doc.setFontSize(40);
    			doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
    			doc.addFont('ComicSansMS', 'Comic Sans', 'bold');
    			doc.setFont('Comic Sans');
    			doc.setFontType("bold");  
    			doc.text(55, 95, nomeAlunoFormatado);
    			doc.setFontSize(20);
    			doc.setFontType("normal");
    			doc.text(55, 105, 'em ' + now.getDate() + ' de ' + monName [now.getMonth() ] + ' de ' + now.getFullYear() + ', concluiu o curso de');
    			doc.setFontSize(40);
    			doc.setFontType("bold");
    			doc.text(55, 120, nomeCursoFormatado);
    			doc.setFontSize(20);
    			doc.setFontType("normal");
    			doc.save("Certificado.pdf");
        }
		
		containerCertificados.appendChild(entityContainer);
		containerCertificados.appendChild(showContentLabel);
		containerCertificados.appendChild(showContentButton);	
		
        let fieldsContainer = document.createElement("div");
        fieldsContainer.style.width = "60%";

            

            

            if(i < destaques.length - 1){
                let separador = document.createElement("div");
                separador.classList.add("separador");
    
                containerCertificados.appendChild(separador);
            }


    }
    
}
loadCertificados();