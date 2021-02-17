async function fazerGetJson() {
    let a  = await fetch("http://localhost:8080/rest/json");

    console.log(a);
 //   console.log(await a.text());
 try {
     console.log(await a.json());
 } catch (error) {
     console.error(error);
 }
    //console.log(await a.formData());
}


async function fazerGetTexto() {
    let a  = await fetch("http://localhost:8080/rest/texto");

    console.log(a);
 //   console.log(await a.text());
 try {
     console.log(await a.text());
 } catch (error) {
     console.error(error);
 }
    //console.log(await a.formData());
}