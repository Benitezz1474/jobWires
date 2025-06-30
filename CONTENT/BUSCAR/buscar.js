// Datos de servicios
const servicios = [
  {
    titulo: "Electricista Profesional",
    subtitulo: "Instalaciones y Reparaciones",
    proveedor: "ElectricPro",
    ubicacion: "Ciudad, País",
    precio: "Desde $100",
    rating: 4,
    categoria: "electricista",
    disponibilidad: "inmediata"
  },
  {
    titulo: "Fontanero 24/7",
    subtitulo: "Emergencias y Mantenimiento",
    proveedor: "AguaFix",
    ubicacion: "Ciudad, País",
    precio: "Desde $80",
    rating: 5,
    categoria: "fontaneria",
    disponibilidad: "24h"
  },
  {
    titulo: "Limpieza de Oficinas",
    subtitulo: "Servicio Completo",
    proveedor: "CleanOffice",
    ubicacion: "Ciudad, País",
    precio: "Desde $150",
    rating: 4,
    categoria: "limpieza",
    disponibilidad: "semana"
  },
  {
    titulo: "Soporte Técnico IT",
    subtitulo: "Reparación de Equipos",
    proveedor: "TechHelp",
    ubicacion: "Ciudad, País",
    precio: "Desde $120",
    rating: 5,
    categoria: "informatica",
    disponibilidad: "inmediata"
  },
  {
    titulo: "Mantenimiento Integral",
    subtitulo: "Preventivo y Correctivo",
    proveedor: "MantenPro",
    ubicacion: "Ciudad, País",
    precio: "Desde $200",
    rating: 4,
    categoria: "mantenimiento",
    disponibilidad: "24h"
  },
  {
    titulo: "Seguridad Privada",
    subtitulo: "Vigilancia Profesional",
    proveedor: "SecureCorp",
    ubicacion: "Ciudad, País",
    precio: "Desde $300",
    rating: 5,
    categoria: "seguridad",
    disponibilidad: "inmediata"
  }
];

// Variable global para filtro de calificación
let minRating = 0;

// Función para crear tarjeta de servicio
function crearTarjetaServicio(servicio) {
  const stars = Array.from({length: 5}, (_, i) => 
    `<span class="rating-star ${i < servicio.rating ? '' : 'empty'}">★</span>`
  ).join('');

  return `
    <div class="service-card" data-categoria="${servicio.categoria}" data-rating="${servicio.rating}">
      <div class="service-image">
        <div class="service-image-placeholder"></div>
      </div>
      <div class="service-title">${servicio.titulo}</div>
      <div class="service-subtitle">${servicio.subtitulo}</div>
      <div class="service-provider">${servicio.proveedor}</div>
      <div class="service-location">${servicio.ubicacion}</div>
      <div class="service-price">${servicio.precio}</div>
      <div class="service-rating">${stars}</div>
      <button class="service-btn">Ver más</button>
    </div>
  `;
}

// Función para mostrar servicios en la interfaz
function mostrarServicios(serviciosFiltrados = servicios) {
  const container = document.getElementById('servicesContainer');
  container.innerHTML = serviciosFiltrados.map(crearTarjetaServicio).join('');
}

// Función principal de filtrado
function filtrarServicios() {
  const busqueda = document.getElementById('searchInput').value.toLowerCase();
  const categoria = document.getElementById('categoryFilter').value;
  const ubicacion = document.getElementById('locationFilter').value;
  const minPrecio = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPrecio = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  const disponibilidad = document.getElementById('availabilityFilter').value;

  const serviciosFiltrados = servicios.filter(servicio => {
    const cumpleBusqueda = !busqueda || 
      servicio.titulo.toLowerCase().includes(busqueda) ||
      servicio.subtitulo.toLowerCase().includes(busqueda) ||
      servicio.proveedor.toLowerCase().includes(busqueda);
    
    const cumpleCategoria = !categoria || servicio.categoria === categoria;
    const cumpleRating = servicio.rating >= minRating;
    const cumpleDisponibilidad = !disponibilidad || servicio.disponibilidad === disponibilidad;
    
    // Simulamos filtro de precio extrayendo el número del string
    const precioServicio = parseInt(servicio.precio.match(/\d+/)[0]);
    const cumplePrecio = precioServicio >= minPrecio && precioServicio <= maxPrecio;

    return cumpleBusqueda && cumpleCategoria && cumpleRating && cumplePrecio && cumpleDisponibilidad;
  });

  mostrarServicios(serviciosFiltrados);
}

// Función para búsqueda desde el botón
function buscarServicios() {
  filtrarServicios();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar la página con todos los servicios
  mostrarServicios();

  // Event listeners para filtros
  document.getElementById('searchInput').addEventListener('input', filtrarServicios);
  document.getElementById('categoryFilter').addEventListener('change', filtrarServicios);
  document.getElementById('locationFilter').addEventListener('change', filtrarServicios);
  document.getElementById('minPrice').addEventListener('input', filtrarServicios);
  document.getElementById('maxPrice').addEventListener('input', filtrarServicios);
  document.getElementById('availabilityFilter').addEventListener('change', filtrarServicios);

  // Rating filter con estrellas interactivas
  document.getElementById('ratingFilter').addEventListener('click', (e) => {
    if (e.target.classList.contains('star')) {
      const rating = parseInt(e.target.dataset.rating);
      minRating = rating;
      
      document.querySelectorAll('.star').forEach((star, index) => {
        star.classList.toggle('active', index < rating);
      });
      
      filtrarServicios();
    }
  });

  // Búsqueda con tecla Enter
  document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      buscarServicios();
    }
  });
});
 function buscarServicios() {
      const searchInput = document.getElementById('searchInput');
      const query = searchInput.value.trim();
      
      if (query) {
        console.log('Buscando:', query);
        // Aquí iría la lógica de búsqueda
        document.getElementById('resultsTitle').textContent = `Resultados para "${query}"`;
      }
    }

    // Category chip functionality
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        const category = this.dataset.category;
        document.getElementById('searchInput').value = category;
        buscarServicios();
      });
    });

    // Rating filter functionality
    document.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', function() {
        const rating = parseInt(this.dataset.rating);
        document.querySelectorAll('.star').forEach((s, index) => {
          if (index < rating) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });

    // Clear filters
    document.getElementById('clearFilters').addEventListener('click', function() {
      document.getElementById('categoryFilter').value = '';
      document.getElementById('locationFilter').value = '';
      document.getElementById('minPrice').value = '';
      document.getElementById('maxPrice').value = '';
      document.getElementById('availabilityFilter').value = '';
      document.querySelectorAll('.star').forEach(star => {
        star.classList.remove('active');
      });
    });

    // Mobile filter toggle
    document.getElementById('mobileFilterToggle').addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar');
      sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
    });

    // Search on Enter key
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        buscarServicios();
      }
    });
     document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.querySelector('.search-input');
            const searchBtn = document.querySelector('.search-btn');
            const categoryChips = document.querySelectorAll('.category-chip');

            // Búsqueda
            searchBtn.addEventListener('click', function() {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    console.log('Buscando:', searchTerm);
                    // Aquí iría la lógica de búsqueda
                }
            });

            // Enter en el campo de búsqueda
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });

            // Chips de categorías
            categoryChips.forEach(chip => {
                chip.addEventListener('click', function() {
                    const category = this.textContent.trim();
                    searchInput.value = category;
                    console.log('Categoría seleccionada:', category);
                    // Aquí iría la lógica de filtrado por categoría
                });
            });

            // Filtros del sidebar
            const filterSelects = document.querySelectorAll('.filter-select');
            const filterInputs = document.querySelectorAll('.filter-input');

            filterSelects.forEach(select => {
                select.addEventListener('change', function() {
                    console.log('Filtro aplicado:', this.value);
                    // Aquí iría la lógica de filtrado
                });
            });

            filterInputs.forEach(input => {
                input.addEventListener('input', function() {
                    console.log('Precio filtrado:', this.value);
                    // Aquí iría la lógica de filtrado por precio
                });
            });
        });