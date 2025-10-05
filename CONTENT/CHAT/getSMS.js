
//1) Tengo que agarrar el form del HTML y capturar los datos
//2) Tengo que procesar y validar esos datos (inputs) si es que me da el tiempo (espero),
//3) Tengo que mandar esos datos a apache y trabajarlos desde ahí para insertarlos en la BBDD con PHP


import {sendHTTPrequest} from "../../loginAndRegister.js";

const getParams=(string)=>{//obtengo los parametros de la URL
    
    const params = new URLSearchParams(window.location.search);
    return params.get(string);

}


const getSMS=async()=>{//esta funcion envia el mensaje a apache y lo trabajon con PHP desde ahí

    const data = {
        CiCliente : getParams("CiCliente"), //no haría falta porque la tengo en la session PEEERO por si las dudas :)
        CiProveedor : getParams("CiProveedor"),
    }

    const options = {
        method : "POST",
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(data)
    }

    const res = await sendHTTPrequest("./getSMS.php",options);
    console.log("responseGET: ")
    // const result_sms = document.querySelector(".result_sms");
    
    const arrayMessage = JSON.parse(res)
    console.log(arrayMessage);
   if(res) printMessage(arrayMessage.messages);
}


//esta funcion deberá cargar los sms de la bbdd
async function printMessage(array=[]){

    //div element del DOM donde se muestran los mensajes de la BBDD
    const messsagesContent = document.querySelector(".messages");

    messsagesContent.innerHTML = "";
    
    array.forEach(message => {

        const {contenido, fecha} = message;
        
        messsagesContent.innerHTML += `
        
        <div class = 'message'>
            <p>${contenido}</p>
            <h5>${fecha}</h5>
        </div>
        `;
    })
    
}

getSMS();


