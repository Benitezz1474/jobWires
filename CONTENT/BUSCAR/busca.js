import {sessionVerify} from "../../sessionVerify.js";
sessionVerify();


const filtersDOM = document.querySelector(".filters") //se hará el render de los filtros acá
const filter_selectedDOM = document.querySelector(".filters_selectedDOM");
const btn_filter_reset = document.querySelector("#filter_reset");
const form_search = document.getElementById("search");
import {sendHTTPrequest} from "../../loginAndRegister.js";
import { printServices } from "./printServices.js";

const filters = [ //filtros a mostrar
    {
        title: "zona",
        options: ["sayago","peñarol","casavalle","borro","cuarenta semanas","lavalleja"]
    },
    {
        title: "calificacion",
        options:[1,2,3,4,5]
    },

    {
        title : "categoria",
        options : ["electricista","astronauta"]
    }
]

let filter_selected = []; //iran los filtros seleccionados
let filter_atributte = []; //array de objetos que se tendra que enviar a php con los filtros

const renderServices=()=>{
    //pintar las ofertas;
const servicios = document.getElementById("servicios");
servicios.innerHTML = "";

for(let i = 0; i<= result.length; i++){
  
    servicios.innerHTML += `
     <div class = 'servicios_items'>
       <h3>${result[i].title}</h3>
      <h3>${result[i].zona}</h3>
      <h4>${result[i].calificacion}</h4> 
     </div>
      `
}
}


//agregar filtros a la seleccion
const addFilterSelected =(option,identifacdor)=>{
    
    const obj = {
        title : identifacdor,
        option : option
    }
    
    //pregunto si existe algun objeto igual
    const result = filter_atributte.some(x => x.title == identifacdor)
    
    if(result == true && result != undefined) return false //si existe un bojeto igual, salgo 
    
    filter_atributte.push(obj);
    
    
    const button = document.createElement("button");
    button.innerHTML = option
    
    filter_selectedDOM.appendChild(button);
    
    
}


//pintarlos en el DOM

for(let i = 0 ; i < filters.length; i++){

    //creo un contenedor
    const filterItem = document.createElement("div");
    filterItem.classList.add("filterItem");
    
    //obtengo el titulo del filtro
    const title = filters[i].title;
    
    //construyo el elemento h2 que mostrara el titulo
    const h2 = document.createElement("h4");
    h2.innerHTML = title;
    
    // filtersDOM.appendChild(h2)
    filterItem.appendChild(h2);
    
    for(let j = 0; j<filters[i].options.length; j++){
        //obtengo las posibles opciones
        const option = filters[i].options[j];
        
        //construyo el elemento button que mostrara la opcion
        const button = document.createElement("button");
        button.append(option);
        
        // le grego un identificador
        button.setAttribute("title",title);
        
        // filtersDOM.appendChild(button);
        filterItem.appendChild(button);

        //1) al hacer click en el botton , se debe capturar la opcion
        button.addEventListener("click",()=>{
            
            addFilterSelected(option,title) //agregar el filtro seleccionado

            //realizar la peticion http al server pero con el filtro seleccionado
            
        })

    }
    filtersDOM.appendChild(filterItem);
}

//3) mandar al servidor
//recorrer el array "filter_atributte" para obtener los filtros de busqueda
//una vez tengo esos filtros se los debo enviar a php como un json (array) de forma ordenada y clara

const getSelectAttribute=()=>{

    //objeto con datos a enviar
    
    const obj = Object.fromEntries(
    filter_atributte.map(item => [item.title, item.option]) //transformo el array de objetos en para clave valor
   );

   return obj

   
}

btn_filter_reset.addEventListener("click",()=>{ //reestablecera los filtros de busqueda

    filter_selected = [];
    filter_atributte = [];
    filter_selectedDOM.innerHTML = ""; //renderizado a 0

})



//DE AQUI EN MAS ES PARA ENVIAR DATOS AL SERVER, TODO LO ANTERIOR SE BASA EXPLICITAMENTE EN LA CREACION DE FILTROS
// 
// 
// 
const getServices=async()=>{

const input = document.getElementById("title").value; //titulo a buscar (palabra clave)

  const result = filter_atributte.some(x => x.title == input)
    
  if(result == true && result != undefined) return false //si existe un bojeto igual, salgo 
    
  const obj = {
    title : "title",
    option : input
  }

filter_atributte.push(obj);

const newfilters_atributte = getSelectAttribute(); //devuelve el array filter_atributte como para clave->valor

console.log(newfilters_atributte);

const options = {
    method : "POST",
    header : {"Content-type": "application/json"},
    body : JSON.stringify(newfilters_atributte)
}

const services = await sendHTTPrequest("./busca.php",options);
console.log("services:");

printServices(JSON.parse(services));



}

form_search.addEventListener("submit",async(e)=>{

e.preventDefault();
getServices();



});