import {sendHTTPrequest} from "../../loginAndRegister.js";

const getParams=(string)=>{//obtengo los parametros de la URL
    
    const params = new URLSearchParams(window.location.search);
    return params.get(string);
    
}

const id = getParams("idService"); //id del servicio
const CiProveedor = getParams("CiProveedor");

//debo crear una funcion que me permita renderizar los clientes que se obtuvieron de la BBDD
const printClients=(array=[])=>{


    //debo agarrar algo para renderizarlos

    const clients = document.querySelector(".clients")

    clients.innerHTML = "";

    array.forEach(client => {//debo crear un template por cada cliente 
        
        const {CI,Nombre,FechaContratacion} = client;

        clients.innerHTML += `
        <a href = 'http://localhost/jobsWebSite/CONTENT_PROVIDER/CHAT/CHAT_CLIENT/index.html?CiCliente=${CI}&idService=${id}&CiProveedor=${CiProveedor}'>
        
        <div class = 'client'>
              <h2>${CI}</h2>
              <h4>${Nombre}</h4>
              <h4>${FechaContratacion}</h4>
        </div>

        </a>
        `;


    })
}


const getClients=async()=>{//esto debe devolverme los clientes que contrataron el servicio
   
    console.log(id)

    const options = {
    method : "POST",
    headers : {"Content-Type" : "Application/json"},
    body : JSON.stringify({id}) //solo para verificar que todo se envía correctamente :)
}

const res = await sendHTTPrequest("./getClients.php",options);
console.log(JSON.parse(res));

printClients(JSON.parse(res));

}

getClients();

