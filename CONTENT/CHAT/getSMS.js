
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
    console.log(res);
    // const result_sms = document.querySelector(".result_sms");
    

}

getSMS();


