//1) debo enviar un objeto con el ID del servicio y el ID del cliente (CI) a php
//2) debo insertar esos IDs en la tabla [contrata] de la BBDD
//3) debo mostrarle al usuario que el servicio fue contratado y debe poder verlo en ajustes->mi servicios 

import {sendHTTPrequest} from "../../../loginAndRegister.js";

const btn_contrata = document.getElementById("contratar");

const printHTTPrequest=(result)=>{

    console.log(result)

    alert("SERVICIO CONTRATADO CORRECTAMENTE");
}

const getServiceID=()=>{//obtengo el ID del servicio que viaja por la URL

    const params = new URLSearchParams(window.location.search); 
    const id = params.get("id");
    console.log(id)
    return Number(id);
}

btn_contrata.addEventListener("click",async()=>{ //al hacer click debo contratar el servicio

 const data = {//necesitaria el ID del usuario (CI) pero está almacenado en la session ;)
  
    idService : getServiceID()

 }

 const options = {

    method : "POST",
    headers : {"content-type":"application/json"},
    body : JSON.stringify(data)
 }


const result = await sendHTTPrequest("contrata.php",options);
printHTTPrequest(result)

})
