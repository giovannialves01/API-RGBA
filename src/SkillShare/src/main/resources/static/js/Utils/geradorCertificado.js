function genPDF() {

    now = new Date
    monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro");

    var el = document.getElementById("certificado");
    var doc = new jsPDF("l", 'mm', 'a4');
    var imgData = 'data:image/png;base64,'+ Base64.encode(el);
    doc.addImage(el, 'PNG', 0, 0, 297, 210);
    doc.setFontSize(40);
    doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
    doc.addFont('ComicSansMS', 'Comic Sans', 'bold');
    doc.setFont('Comic Sans');
    doc.setFontType("bold");
    doc.text(55, 95, 'Giovanni dos Santos Alves,')
    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.text(55, 105, 'em ' + now.getDate() + ' de ' + monName [now.getMonth() ] + ' de ' + now.getFullYear() + ', concluiu o curso de')
    doc.setFontSize(40);
    doc.setFontType("bold");
    doc.text(55, 120, 'Network Fundamentals')
    doc.setFontSize(20);
    doc.setFontType("normal");
    doc.save("Certificado.pdf");
}
