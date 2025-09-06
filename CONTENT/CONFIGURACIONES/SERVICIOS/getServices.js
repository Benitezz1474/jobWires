//1) Enviar una peticion al server para que me devuelva la lista de servicios contratados
//2) Mostrarlos en el DOM

import {sendHTTPrequest} from "../../../loginAndRegister.js";
import {delteService} from "./deleteService.js";
//renderizar/mostrar/pintar servicios
const printServices=(services=[])=>{
    
    //elemento del DOM
    const servicesDOM = document.querySelector(".myServices");
    const fragment = document.createDocumentFragment();

    //renderizar el servicio :)
    services.forEach(service => {

        console.log(service)
        
        const {IdPublicacion,Servicio,CiProveedor,CiCliente} = service;


        
        //crear un boton para ver los servicios
        const button_show = document.createElement("button");
        button_show.innerHTML = "VER";
        button_show.addEventListener("click",()=>{
            window.location.href = `http://localhost/jobsWebSite/CONTENT/BUSCAR/SERVICIO/index.html?id=${IdPublicacion}`;
        })
        
        //contenedor donde van a ir todos los items
        const div = document.createElement("div");
        
        
        //crear un boton para eliminar el servicio
        const button_delete = document.createElement("button");
        button_delete.innerHTML = "ELIMINAR";
        button_delete.addEventListener("click",()=> delteService(IdPublicacion));

        //crear un boton para enviar mensaje

        const button_message = document.createElement("button");
        button_message.innerHTML = "MESSAGE";
        button_message.addEventListener("click",()=>{
            window.location.href = `http://localhost/jobsWebSite/CONTENT/CHAT/index.html?CiCliente=${CiCliente}&idService=${IdPublicacion}&CiProveedor=${CiProveedor}`;
        })

        //----------------------------------

        const h2 = document.createElement("h2");
        h2.innerHTML = Servicio;

        div.appendChild(h2)
        div.appendChild(button_show);
        div.appendChild(button_delete)
        div.appendChild(button_message);
        fragment.appendChild(div);


        

    })

    servicesDOM.appendChild(fragment);
}


//obtener servicios
const getServices = async()=>{

    const options = {
        method : "POST",
        headers : {"Content-type" : "application/json"},
        body : JSON.stringify({data:null})
    }
    const res = await sendHTTPrequest("getServices.php",options);

    printServices(JSON.parse(res));
    
}

getServices();