import {sessionVerify} from "../sessionVerify.js";
//valido que no existan sesiones, si existen lo redirijo a otro sitio
sessionVerify("../CONTENT/BUSCA/busca.html");

import {sendHTTPrequest,printHTTPrequest} from "../loginAndRegister.js";

const form_login = document.getElementById("form_login");

form_login.addEventListener("submit",async(e) => {
    
    e.preventDefault(); //evito que el fomrulario se mande al hacer un "submit"

    const data_form  = new FormData(form_login); 
    
    const email = data_form.get("email");
    const password = data_form.get("password");

    const data = {
        password,
        email
    }

    const options  = {
        method:"POST",
        headers:{"Const-type":"application/json"},
        body:JSON.stringify(data)
    }

    const data_json = await sendHTTPrequest("login.php",options);
    printHTTPrequest(data_json,"../CONTENT/index.php") //manda la configuracion a esta funcion

})