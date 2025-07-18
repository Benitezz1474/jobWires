import {sessionVerify} from "../../sessionVerify.js";
sessionVerify();

const filtersDOM = document.querySelector(".filters") //se hará el render de los filtros acá
const filter_selectedDOM = document.querySelector(".filters_selectedDOM");
const btn_filter_reset = document.querySelector("#filter_reset");

const filters = [ //filtros a mostrar
    {
        title: "zona",
        options: ["sayago","peñarol","casavalle","borro","cuarenta semanas","lavalleja"]
    },
    {
        title: "calificacion",
        options:[1,2,3,4,5]
    }
]

let filter_selected = []; //iran los filtros seleccionados
let filter_atributte = []; //array de objetos que se tendra que enviar a php con los filtros

btn_filter_reset.addEventListener("click",()=>{ //reestablecera los filtros de busqueda

    filter_selected = [];
    filter_atributte = [];
    filter_selectedDOM.innerHTML = ""; //renderizado a 0

})
    


//agregar filtros a la seleccion
const addFilterSelected =(option,identifacdor)=>{
    
    // filter_selectedDOM.innerHTML = "";
    // console.log(identifacdor)
    // console.log(filter_atributte)
    const obj = {
        title : identifacdor,
        option : option
    }

    // if(filter_atributte.includes(obj.title)) console.log("si")
    // if(filter_atributte.includes(identifacdor)) return false
    // else if(filter_selected.includes(option)) return false
    const result = filter_atributte.some(x => x.title == identifacdor)
    if(result == true && result != undefined) return false
    filter_atributte.push(obj);
    console.log(filter_atributte)
    // filter_atributte += identifacdor;
    // filter_selected += option;

    const button = document.createElement("button");
    button.innerHTML = option
    
    filter_selectedDOM.appendChild(button);
    
    
}


//pintarlos en el DOM

for(let i = 0 ; i < filters.length; i++){
    
    //obtengo el titulo del filtro
    const title = filters[i].title;
    
    //construyo el elemento h2 que mostrara el titulo
    const h2 = document.createElement("h2");
    h2.innerHTML = title;
    
    filtersDOM.appendChild(h2)
    
    for(let j = 0; j<filters[i].options.length; j++){
        //obtengo las posibles opciones
        const option = filters[i].options[j];
        
        //construyo el elemento button que mostrara la opcion
        const button = document.createElement("button");
        button.append(option);
        
        // le grego un identificador
        button.setAttribute("title",title);
        
        filtersDOM.appendChild(button);

        //1) al hacer click en el botton , se debe capturar la opcion
        button.addEventListener("click",()=>{
            
            //2) aregarle una clase para identificarla en el DOM
            addFilterSelected(option,title) //agregar el filtro seleccionado
            
        })


        
        
    }
    
}

//3) mandar al servidor
//recorrer el array "filter_atributte" para obtener los filtros de busqueda
//una vez tengo esos filtros se los debo enviar a php como un json (array) de forma ordenada y clara



