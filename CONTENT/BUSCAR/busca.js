import {sessionVerify} from "../../sessionVerify.js";
import {printHTTPrequest,sendHTTPrequest} from "../../loginAndRegister.js";
import {printSpinner} from "../../spinner.js";
sessionVerify();

const oferta = document.getElementById("oferta");
const form = document.getElementById("formSearch");
const filtros = document.querySelector(".filtros");

const fromData = new FormData(form); //el form data se establece acá ya que varias funciones interactuan con el

// esta funcion agrega filtros
const filters = [
    {
        title : "zona",
        option : ["sayago","lavalleja","peñarol","pocitos"]
    },

    {
        title : "calificacion",
        option : [1,2,3,4]
    },
    {
        title: "otracosa",
        option : ["cosa1","cosa2"]
    }
];

const printFilters=()=>{ //muestra los filtros

    for(let i = 0; i<=filters.length; i++){ //recorro el array de filtros

        const h2 = document.createElement("h2"); 
        h2.innerHTML = filters[i].title//creo y agrego un titulo
        filtros.appendChild(h2);

        console.log(filters[i].title)
           
      for(let j = 0; j<filters[i].option.length; j++){//recorro el array de options
        
        

         const button = document.createElement("button");
         button.classList.add("button");
         const buttonText = filters[i].option[j] //por cada option construyo un button con el texto del filtro
         button.innerHTML = buttonText;

         button.addEventListener("click",()=>{
             
            //aca van a pasar cosas, y si, debería poner esto en una funcion aparte
            //de hehco debería haber puesto toda esta programacion en un script totalmente aislado (export)
            //pero mi laptop es la del gobierno y las teclas y el mouse me limitan mucho y "relentizan" al escribir y buscar codigo
            //entonces lo puse todo acá, aclaro esto por si alguno pregunta o lo que sea

            fromData.append(h2,buttonText); //agrego al formData "universal" el filtro.
            console.log("agregado");

            const butonSelected = document.querySelector("buttonSelected"); //seleccion el boton(filtro) que tenga esa clase actualemtne
            butonSelected.classList.remove("buttonSelected") //le quito la clase

            button.classList.add("buttonSelected");
            
         })


        

         filtros.appendChild(button);
        }
        
        
    }
}

printFilters();

const getOfertas=async(filters)=>{ //esta funcion recibe como parametros los filtros(input) para hacer la busqueda en la BBDD

    const {title} = filters; //obtengo los filtros absolutos

    const dataSend = {//los filtros (valor inputs) que voy a enviar para buscar en la BBDD
            title : title
    }

    const options = {
        method : "POST",
        headers: {"Content-type": "application/json"},
        body : JSON.stringify(dataSend)
    }
    // const data = await sendHTTPrequest("busca.php",options);
    
    
    console.log("simulando envio...")
    console.log(filters.title)
    
    const result = await sendHTTPrequest("./busca.php",options); //obtengo las ofertas
    // console.log(result);
    return result; //las retorno para luego pasarselas a otra funciony que se encargue de "pintarlas/mostrarlas"
    
}


form.addEventListener("submit",async(e)=>{ 
    e.preventDefault();

    printSpinner("block") //pongo el spinner de carga

    const fromData = new FormData(form);

    const filters = { //obtengo los filtros del form para realizar la busqueda
    
        title : fromData.get("title")
    }

    const ofertas = await getOfertas(filters); //obtengo las ofertas pasandole los filtros del formulario
    console.log(ofertas); //las muestro en consola de momento xD

    printSpinner("none") //quito el spinner de carga

    //PROXIMO PASO!
    //debo crear una funcion que me permita ver las ofertas en el DOM
    //...
    //...
    //...
    //...
    //...

    
    
})