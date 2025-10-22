// servicios.js

// FUNCIÓN PARA CREAR LOS SERVICIOS
function crearServicios(servicios) {
    const container = document.getElementById('servicesContainer');
    
    const estadosConfig = {
        confirmado: { texto: 'Confirmado', icono: '✓', clase: 'status-confirmado' },
        pendiente: { texto: 'Pendiente', icono: '⏱', clase: 'status-pendiente' },
        finalizado: { texto: 'Finalizado', icono: '✓', clase: 'status-finalizado' }
    };

    if (servicios.length === 0) {
        container.innerHTML = '<div class="no-services">No se encontraron servicios</div>';
        return;
    }

    container.innerHTML = servicios.map((servicio, index) => {
        const estadoInfo = estadosConfig[servicio.estado];
        return `
            <div class="service-card">
                <div class="service-info">
                    <h3>${servicio.titulo}</h3>
                    <div class="service-details">
                        <div class="detail-item">
                            <span class="icon">📅</span>
                            <span>${servicio.fecha}</span>
                        </div>
                        <div class="detail-item">
                            <span class="icon">👤</span>
                            <span>${servicio.cliente}</span>
                        </div>
                    </div>
                </div>
                <div class="service-actions">
                    <span class="status-badge ${estadoInfo.clase}">
                        <span>${estadoInfo.icono}</span>
                        ${estadoInfo.texto}
                    </span>
                    <button class="btn-detalles" onclick="verDetalles(${index})">Ver detalles</button>
                </div>
            </div>
        `;
    }).join('');
}

// Función para mostrar opciones de estado
function mostrarOpcionesEstado(index) {
    const opciones = document.getElementById(`opciones-estado-${index}`);
    const btnEditar = document.getElementById(`btn-editar-${index}`);
    
    if (opciones.style.display === 'none' || opciones.style.display === '') {
        opciones.style.display = 'block';
        btnEditar.textContent = '✏️ Cerrar opciones';
    } else {
        opciones.style.display = 'none';
        btnEditar.textContent = '✏️ Editar Estado';
    }
}

// Función para cambiar el estado
function cambiarEstado(index, nuevoEstado) {
    serviciosData[index].estado = nuevoEstado;
    cerrarModal();
    crearServicios(serviciosData);
}

// Función para eliminar servicio
function eliminarServicio(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
        serviciosData.splice(index, 1);
        cerrarModal();
        crearServicios(serviciosData);
    }
}

// Función para ver detalles - Abre el modal
function verDetalles(index) {
    const servicio = serviciosData[index];
    
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'modalDetalles';
    
    // Generar estrellas para las reseñas
    const generarEstrellas = (cantidad) => {
        return '⭐'.repeat(cantidad);
    };
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="cerrarModal()">&times;</button>
            
            <div class="modal-header">
                <h1>${servicio.titulo}</h1>
            </div>
            
            <div class="modal-body">
                <div class="modal-grid">
                    <div class="modal-left">
                        <div class="service-image">
                            <img src="${servicio.imagen}" alt="${servicio.titulo}">
                        </div>
                        
                        <div class="service-section">
                            <h2>Descripción</h2>
                            <p>${servicio.descripcion}</p>
                        </div>
                        
                        <div class="service-section">
                            <h2>Proveedor</h2>
                            <div class="proveedor-info">
                                <div class="proveedor-avatar">👤</div>
                                <div>
                                    <div class="proveedor-nombre">${servicio.proveedor.nombre}</div>
                                    <div class="proveedor-exp">${servicio.proveedor.experiencia}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="service-section">
                            <h2>Reseñas</h2>
                            <div class="reseñas-container">
                                ${reseñasEjemplo.map(reseña => `
                                    <div class="reseña-card">
                                        <div class="reseña-header">
                                            <div class="reseña-avatar">👤</div>
                                            <div>
                                                <div class="reseña-usuario">${reseña.usuario}</div>
                                                <div class="reseña-estrellas">${generarEstrellas(reseña.estrellas)}</div>
                                            </div>
                                        </div>
                                        <p class="reseña-comentario">${reseña.comentario}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-right">
                        <div class="info-card">
                            <h3>${servicio.categoria}</h3>
                            
                            <div class="info-item">
                                <span class="info-icon">📍</span>
                                <div>
                                    <div class="info-label">Ubicación:</div>
                                    <div class="info-value">${servicio.ubicacion}</div>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <span class="info-icon">💰</span>
                                <div>
                                    <div class="info-label">Desde</div>
                                    <div class="info-value">${servicio.precio}</div>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <span class="info-icon">🕒</span>
                                <div>
                                    <div class="info-label">Disponibilidad:</div>
                                    <div class="info-value">${servicio.disponibilidad}</div>
                                </div>
                            </div>
                            
                            <div class="info-item">
                                <span class="info-icon">📋</span>
                                <div>
                                    <div class="info-label">Estado actual:</div>
                                    <div class="info-value" style="text-transform: capitalize;">${servicio.estado}</div>
                                </div>
                            </div>
                            
                            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                                <button class="btn-editar" id="btn-editar-${index}" onclick="mostrarOpcionesEstado(${index})">
                                    ✏️ Editar Estado
                                </button>
                                <div id="opciones-estado-${index}" class="opciones-estado" style="display: none;">
                                    <button class="btn-estado-opcion btn-pendiente" onclick="cambiarEstado(${index}, 'pendiente')">
                                        ⏱ Pendiente
                                    </button>
                                    <button class="btn-estado-opcion btn-confirmado" onclick="cambiarEstado(${index}, 'confirmado')">
                                        ✓ Confirmado
                                    </button>
                                    <button class="btn-estado-opcion btn-finalizado" onclick="cambiarEstado(${index}, 'finalizado')">
                                        ✓ Finalizado
                                    </button>
                                </div>
                                <button class="btn-eliminar" onclick="eliminarServicio(${index})">
                                    🗑️ Eliminar Servicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modalDetalles');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// Función de búsqueda
function inicializarBuscador() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filtrados = serviciosData.filter(servicio => 
                servicio.titulo.toLowerCase().includes(searchTerm) ||
                servicio.cliente.toLowerCase().includes(searchTerm) ||
                servicio.estado.toLowerCase().includes(searchTerm) ||
                servicio.fecha.toLowerCase().includes(searchTerm)
            );
            crearServicios(filtrados);
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    crearServicios(serviciosData);
    inicializarBuscador();
});

// También exportar las funciones por si se necesitan en otro lugar
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { crearServicios, verDetalles, serviciosData, cerrarModal, cambiarEstado, eliminarServicio };
}