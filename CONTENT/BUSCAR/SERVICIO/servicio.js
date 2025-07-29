import {sendHTTPrequest} from "../../../loginAndRegister.js";

//1) debo ejecutar una funcion que traiga los parametros de la URL
//2) debo enviar esos parametros a servicio.php
//3) servicio.php debe devolverme el servicio de la BBDD donde coincidn los parametros de la URL 
//   con el campo IdServicio de la BBDD
//4) crear una funcion que MUESTRE ese servicio

const printService=(service)=>{
    
    console.log("--->")
    console.log(service)
    const serviceDOM = document.getElementById("service"); //selecciono el DOM element

    const {Direccion,titulo,Precio,Descripcion,Ubicacion,Imagen,fecha} = service;

    //plantilla del servicio
    serviceDOM.innerHTML = `
       
    <h2>${titulo}</h2>
    <h3>Descripcion :${Descripcion}<h3>
    <h3>ubicacion: ${Ubicacion}<h3>
    <h3>Direccion: ${Direccion}<h3>
    <h3>Precion: ${Precio}<h3>
    <h3>Fecha: ${fecha}<h3>

    <img src = '${Imagen}' />
    


    
    `;

}

const getParams=async()=>{

    //obtengo los parametros de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
    console.log(id)

    const options = {
        method : "POST",
        header : {"Content-type" : "application/json"},
        body : JSON.stringify({id:id})
    }

     //le mando ese parametro a PHP y me devuelve el servicio
    const service = await sendHTTPrequest("./servicio.php",options);

    //pintar el servicio

    printService(service);

}

getParams();

// 5) El usuario debe saber QUE dias puede contratar un servicio (que dias tiene dispoible el proveedor)
// 6) Debo crear un "calendario modal" que me permita visaulizar esos dias 
// 7) al hacer click en esos dias, se debe elegir hora para realizar ese servicio 