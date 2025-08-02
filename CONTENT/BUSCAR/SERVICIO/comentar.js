//1) captuar los datos del formulario
//2) validarlos
//3) hacer la consulta a comentar.php y guardarlos en 
// a) => comentario => "INSERT INTO comentarios (texto,fecha) VALUES ($texto,$fecha)";
// b) => servicioComentario => "INSERT INTO servicioComentario (id_servicio,id_comentario) VALUES(...)"
import {sendHTTPrequest} from "../../../loginAndRegister.js"
const form = document.getElementById("formComent");

const printComent=(coment)=>{

    alert("pintando...")
    const comentDOM = document.getElementById("comentText");

    if(coment == "success") comentDOM.innerHTML = "COMENTARIO ENVIADO :)";

    else comentDOM.innerHTML = "ERROR AL EVIAR, REVISA TU CONEXION :/";
}

function generarIDCorto() {
  const ahora = Date.now() % 1e6; // últimos 6 dígitos del timestamp
  const random = Math.floor(Math.random() * 1e3); // 3 dígitos aleatorios (000–999)
  const id = ahora * 1000 + random; // combinación

  // Si se pasa de 9 dígitos, recortamos los primeros
  return Number(String(id).slice(-9));
}


const generarFecha=()=>{ //devuelve la fecha actual

    let day = new Date().getDate(); //dia
    let mounth = new Date().getMonth(); //mes
    const year = new Date().getFullYear(); //año

    //validar los 0
    if(day < 10) day = `0${day}`;
    if(mounth < 10 ) mounth = `0${mounth}`;


    const fullDate = `${year}/${mounth}/${day}`
    console.log(fullDate)
    return fullDate;
}


//Obtener el ID del servicio

function getServiceID(){

    //obtengo los parametros de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return Number(id);

}

form.addEventListener("submit",async(e)=>{
    
    e.preventDefault(); //no se envia
    
    const formData = new FormData(form);
    
    //se debe validar el coment (lo hago despues, que funcione, es lo importante)
    const coment = formData.get("coment");
    
    const id = generarIDCorto();
    const date = generarFecha();
    const id_service = getServiceID();


    const data = {

        coment : coment,
        id : id,
        date : date,
        id_service : id_service
            
    }


    console.log("-<<<<<<<<<<------data------->>>>>>>>")
    console.log(data)

    const options = {

        method: "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify(data)
    }

    const result = await sendHTTPrequest("./comentar.php",options);

    printComent(result);

})
