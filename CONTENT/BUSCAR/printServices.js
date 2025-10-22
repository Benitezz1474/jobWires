export const printServices = (array = []) => {
  // Obtengo el contenedor donde se renderizarán los servicios de la BBDD
  const services = document.getElementById("services");
  const container = document.createElement("div"); // Contenedor temporal
  const fragment = document.createDocumentFragment(); // Acumulador de nodos

  services.innerHTML = ""; //siempre que se llame a esta funcion, deja el contenido vacio

  let html = "";

  array.forEach((item, index) => {
    const {Titulo,Ubicacion,Descripcion,Precio,IdPublicacion} = item;
    html += `
      <div class='services__item'>
        <a href = 'SERVICIO/index.html?id=${IdPublicacion}'>
        <h2>${Titulo}</h2>
        <h2>${Ubicacion}</h2>
        <h2>${Precio}</h2>
        <h2>${Descripcion}</h2>
        </a>

      </div>
    `;
  });


  container.innerHTML = html; // Convierte el HTML en nodos reales

  // Muevo todos los nodos del contenedor temporal al fragment
  while (container.firstChild) {
    fragment.appendChild(container.firstChild);
  }

  services.appendChild(fragment); // Renderiza todo de una vez
};
