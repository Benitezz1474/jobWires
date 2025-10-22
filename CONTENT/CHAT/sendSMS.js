//1) tengo que insertar el ID del usuario en la tabla envia
//2) tengo que inserar el ID del SMS en la tabla envía
//3) tengo que insertar el ID del proveedor,el texto y la hora (desde PHP) en la tabla sms

import {sendHTTPrequest} from "../../loginAndRegister.js";

const getParams=async(string)=>{

    //obtengo los parametros de la URL
    const params = new URLSearchParams(window.location.search);
    return params.get(string);

}

function generarIDCorto() {
  const ahora = Date.now() % 1e6; // últimos 6 dígitos del timestamp
  const random = Math.floor(Math.random() * 1e3); // 3 dígitos aleatorios (000–999)
  const id = ahora * 1000 + random; // combinación

  // Si se pasa de 9 dígitos, recortamos los primeros
  return Number(String(id).slice(-9));
}



const insertSMS=async()=>{
    
const idSMS = generarIDCorto();
const idUser = getParams("idUser");
const idService = getParams("idService");

const data = {
    idSMS,
    idUser,
    idService
}

const options = {

    method : "POST",
    header : {"content-type" : "application/json"},
    body : JSON.stringify(data)
}

const result = sendHTTPrequest("./sendSMS.php",options);

console.log(JSON.parse(result))

}

