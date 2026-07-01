function obtenerDatosTicket() {
  return {
    nombre: sessionStorage.getItem('nombreUsuario') || 'Invitado',
    fecha: sessionStorage.getItem('ticketFecha') || new Date().toLocaleDateString('es-AR'),
    total: Number(sessionStorage.getItem('ticketTotal') || 0),
    productos: JSON.parse(sessionStorage.getItem('ticketProductos') || '[]')
  };
}

function renderDatos(datos) {
  document.getElementById('ticketNombre').textContent = datos.nombre;
  document.getElementById('ticketFecha').textContent = datos.fecha;
  document.getElementById('ticketTotal').textContent = '$' + datos.total.toLocaleString('es-AR');
}

function renderProductosTicket(productos) {
  const itemsContenedor = document.getElementById('ticketItems');

  if (productos.length === 0) {
    itemsContenedor.innerHTML = '<p class="ticket-item-vacio">No hay productos.</p>';
    return;
  }

  itemsContenedor.innerHTML = productos.map(item => {
    const subtotal = item.precio * item.cantidad;
    return `
      <div class="ticket-item">
        <span class="ticket-item-nombre">${item.nombre}</span>
        <span class="ticket-item-qty">x${item.cantidad}</span>
        <span class="ticket-item-precio">$${subtotal.toLocaleString('es-AR')}</span>
      </div>
    `;
  }).join('');
}

function descargarPDF() {
  const elemento = document.getElementById('ticketParaPDF');
  const fechaArchivo = sessionStorage.getItem('ticketFecha') || new Date().toLocaleDateString('es-AR');
  const fechaPDF = fechaArchivo.replace(/\//g, '-');

  const opciones = {
    margin: 10,
    filename: `ticket-sport-and-sweet-${fechaPDF}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 }, // escala alta para que salga nítido
    jsPDF: { unit: 'mm', format: 'a5', orientation: 'portrait' }
  };

  html2pdf().set(opciones).from(elemento).save();
}

function nuevaCompra() {
  sessionStorage.removeItem("ticketNombre");
  sessionStorage.removeItem('ticketProductos');
  sessionStorage.removeItem('ticketTotal');
  sessionStorage.removeItem('ticketFecha');
  localStorage.removeItem('carrito');
  window.location.href = "/cliente/bienvenida.html";
}

function init() {
  const datos = obtenerDatosTicket();
  renderDatos(datos);
  renderProductosTicket(datos.productos);
}

init();