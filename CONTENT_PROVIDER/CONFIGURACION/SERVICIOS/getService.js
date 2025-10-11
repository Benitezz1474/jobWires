import {sendHTTPrequest} from "../../../loginAndRegister.js"
import {delteService} from "./deleteService.js";
 
const getService=async()=>{

    const options = {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify("OK") //esto es solo establecer comunicacion con apache (php)
    }

    //solo lo envío para que cuando responda pueda trabajarlo desde acá, pero esto no es realmente necesario 
    const service = await sendHTTPrequest("./getService.php",options);
    const serviceContent = JSON.parse(service);

    printServices(serviceContent);
}

// const deleteService=()=>alert("eliminando...")


function printServices(array = []){

    const div = document.getElementById("services");

    const fragment = document.createDocumentFragment();
    array.forEach(element => {

        const {IdPublicacion,Titulo,CiProveedor} = element;


    //     div.innerHTML+= `
    //    <a href = "">
    //     <div class = 'service'>
    //       <h2>${element.Titulo}</h2>
    //     </div>
    //    </a>
    //     `;

    //crear un boton para ver los servicios
        const button_show = document.createElement("button");
        button_show.innerHTML = "VER";
        button_show.addEventListener("click",()=>{
            window.location.href = `http://localhost/jobsWebSite/CONTENT/BUSCAR/SERVICIO/index.html?id=${IdPublicacion}`;
        })
        
        //contenedor donde van a ir todos los items
        // const div = document.createElement("div");
        
        
        //crear un boton para eliminar el servicio
        const button_delete = document.createElement("button");
        button_delete.innerHTML = "ELIMINAR";
        button_delete.addEventListener("click",()=> delteService(IdPublicacion));

      //crear un boton para enviar mensaje

        const button_message = document.createElement("button");
        button_message.innerHTML = "MESSAGE";
        button_message.addEventListener("click",()=>{
            window.location.href = `http://localhost/jobsWebSite/CONTENT_PROVIDER/CHAT/index.html?idService=${IdPublicacion}&CiProveedor=${CiProveedor}`;
        })

        const title = document.createElement("h2");
        title.innerHTML = Titulo;

        fragment.appendChild(title);
        fragment.appendChild(button_show);
        fragment.appendChild(button_delete);
        fragment.appendChild(button_message);

        
    })
    div.appendChild(fragment);
}

getService();