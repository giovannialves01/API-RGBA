function genPDF() {
    var el = document.getElementById("certificado");
    var doc = new jsPDF("l", 'mm', 'a4');
    var imgData = 'data:image/png;base64,'+ Base64.encode(el);
    doc.addImage(el, 'PNG', 0, 0, 297, 210);
    doc.save("Test.pdf");
}
