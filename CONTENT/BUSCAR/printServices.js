export const printServices = (array = []) => {
  // Obtengo el contenedor donde se renderizarán los servicios de la BBDD
  const services = document.getElementById("services");
  const container = document.createElement("div"); // Contenedor temporal
  const fragment = document.createDocumentFragment(); // Acumulador de nodos

  services.innerHTML = ""; //siempre que se llame a esta funcion, deja el contenido vacio

  let html = "";

  array.forEach((item, index) => {
    const {titulo,Direccion,Descripcion,Precio,IdServicio} = item;
    html += `
      <div class='services__item'>
        <a href = 'SERVICIO/index.html?id=${IdServicio}'>
        <h2>${titulo}</h2>
        <h2>${Direccion}</h2>
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
