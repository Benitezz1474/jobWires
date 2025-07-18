import {sessionVerify} from "../sessionVerify.js";
//valido que no existan sesiones, si existen lo redirijo a otro sitio
sessionVerify("../CONTENT/BUSCA/busca.html");

import {sendHTTPrequest,printHTTPrequest} from "../loginAndRegister.js";

const form_login = document.getElementById("formLogin");

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

        //crear una funcion para enviar el contenido de hcaptcha al servidor
    //1) agarrar el token del captcha y validar que no este vacio
     const hcaptchaResponse = document.querySelector('[name="h-captcha-response"]').value;
     if(!hcaptchaResponse) alert("Porfavor, complete el captcha");
    //2) enviarlo al servidor (auth.php) y validarlo
     else {
         fetch("../REGISTRO/auth.php",{
        method : "POST",
        headers:{"Content-type" : "application/json"},
        body: JSON.stringify({hcaptcha : hcaptchaResponse})
     })
    //3) dependeiendo de la respuesta le mando el formulario o no
      .then(res => res.json())
      .then(async(data) => {
            console.log("captcha registrado")
            console.log(data)
            const {success} = data;
            if(success){
              
                 const data_json = await sendHTTPrequest("./login.php",options);
                 printHTTPrequest(data_json,"../CONTENT/index.php") //manda la configuracion a esta funcion

            }
        
      })

      .catch(err => {
        console.log("algo salio mal")
      })

     }
   
})