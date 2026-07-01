/* =====Logica de la pagina de client, se conecta con el back para traer los productos y maneja el carrito ===== */

/* configuracion */
const urlBase = "http://localhost:3000/api/products";
const CATEGORIA_ZAPATILLAS = "zapatillas";
const CATEGORIA_ROPA = "Ropa";

/* estado global */
let productos = []; // se llena con el fetch
let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
const nombre = sessionStorage.getItem('nombreUsuario') || 'Invitado';
document.getElementById('nombreUsuario').textContent = nombre + '!';

/* referencias a elementos del DOM */
const nombreUsuarioEL = document.getElementById('nombreUsuario');
const gridZapEl = document.getElementById('gridZapatillas');
const gridRopaEl = document.getElementById('gridRopa');
const cartCountEl = document.getElementById('cartCount');
const drawerBodyEl = document.getElementById('drawerBody');
const drawerTotalEl = document.getElementById('drawerTotal');
const drawerEl = document.getElementById('drawer');
const overlayEl = document.getElementById('overlay');
const modalOverlayEl = document.getElementById('modalOverlay');
const modalTextoEl = document.getElementById('modalTexto');

nombreUsuarioEL.textContent = nombre;

/* formateo */
function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-AR');
}

/* carga de productos */

async function cargarProductos() {
  try {
    const response = await fetch(urlBase);
    const data = await response.json();

    if (!response.ok) {
      mostrarErrorProductos(data.message || "No se pudieron cargar los productos");
      return;
    }

    // Normalizamos los nombres de campos del back a los que usa el render
    productos = data.payload.filter(p => p.active).map(p => ({
      id: p.id,
      nombre: p.name,
      precio: Number(p.price),
      categoria: p.category,
      img: p.image ? `http://localhost:3000/assets/img/${p.image}` : ""
    }));

    renderProductos();
    renderDrawer(); // por si el carrito ya tenía ids guardados de antes
  } catch (error) {
    console.error("Error al obtener productos: ", error);
    mostrarErrorProductos("Error de conexión con el servidor");
  }
}

function mostrarErrorProductos(mensaje) {
  gridZapEl.innerHTML = `<p class="error-msg">${mensaje}</p>`;
  gridRopaEl.innerHTML = '';
}

/* render de la grilla de productos */
function renderProductos() {
  gridZapEl.innerHTML = '';
  gridRopaEl.innerHTML = '';

  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img" style="${p.img ? `background-image:url('${p.img}');background-size:cover;` : ''}"></div>
      <div class="card-nombre">${p.nombre}</div>
      <div class="card-precio">${formatearPrecio(p.precio)}</div>
      <button class="card-btn" onclick="agregarAlCarrito(${p.id}, this)">Agregar al carrito</button>
    `;
    if (p.categoria === CATEGORIA_ZAPATILLAS) gridZapEl.appendChild(card);
    else if (p.categoria === CATEGORIA_ROPA) gridRopaEl.appendChild(card);
  });
}

/*logica del Carrito */
function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(id, btn) {
  const item = carrito.find(i => i.id === id);
  if (item) item.cantidad++;
  else carrito.push({ id, cantidad: 1 });
  guardarCarrito();
  actualizarContador();
  renderDrawer();

  if (btn) mostrarFeedbackBoton(btn);
}

function mostrarFeedbackBoton(btn) {
  const original = btn.textContent;
  btn.textContent = '✓ Agregado';
  btn.classList.add('agregado');
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('agregado');
  }, 1000);
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter(i => i.id !== id);
  }
  guardarCarrito();
  actualizarContador();
  renderDrawer();
}

/* render del drawer y contador lateral*/
function actualizarContador() {
  const total = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  const countEl = document.getElementById('cartCount');
  if (total > 0) {
    countEl.style.display = 'flex';
    countEl.textContent = total;
  } else {
    countEl.style.display = 'none';
  }
}

function renderDrawer() {
  const body = document.getElementById('drawerBody');
  const totalEl = document.getElementById('drawerTotal');
  const itemsValidos = carrito.filter(i => productos.some(p => p.id === i.id));

  if (itemsValidos.length === 0) {
    body.innerHTML = '<div class="drawer-vacio">Tu carrito está vacío! agrega un producto para empezar a comprar.</div>';
    totalEl.textContent = '$0';
    return;
  }

  let total = 0;
  body.innerHTML = itemsValidos.map(i => {
    const p = productos.find(prod => prod.id === i.id);
    total += p.precio * i.cantidad;
    return `
      <div class="drawer-item">
        <img src="${p.img || 'https://via.placeholder.com/54'}" alt="${p.nombre}">
        <div class="drawer-item-info">
          <div class="drawer-item-nombre">${p.nombre}</div>
          <div class="drawer-item-precio">${formatearPrecio(p.precio)}</div>
          <div class="drawer-item-qty">
            <button class="qty-btn" onclick="cambiarCantidad(${p.id}, -1)">−</button>
            <span>${i.cantidad}</span>
            <button class="qty-btn" onclick="cambiarCantidad(${p.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  totalEl.textContent = formatearPrecio(total);
}

function toggleDrawer(abrir) {
  document.getElementById('drawer').classList.toggle('show', abrir);
  document.getElementById('overlay').classList.toggle('show', abrir);
}

/* modal de confirmacion de compra */

function calcularTotalCarrito(items) {
  let total = 0;
  for (const item of items) {
    const producto = productos.find(p => p.id === item.id);
    if (producto) {
      total += producto.precio * item.cantidad;
    }
  }
  return total;
}

function finalizarCompra() {
  if (carrito.length === 0) return;
  const total = calcularTotalCarrito(carrito);

  document.getElementById('modalTexto').textContent =
    `¿Confirmás la compra por ${formatearPrecio(total)}?`;

  document.getElementById('modalOverlay').style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

/* post al back para registrar la venta y redirigir al ticket */

function armarItemsVenta() {
  return carrito.map(item => {
    const p = productos.find(prod => prod.id === item.id);
    if (!p) return null;
    return { id: item.id, nombre: p.nombre, cantidad: item.cantidad, precio: p.precio };
  }).filter(Boolean);
}

async function registrarVenta(itemsVenta, total) {
  try {
    const response = await fetch('http://localhost:3000/api/ventas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: nombre, total, productos: itemsVenta })
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('No se pudo registrar la venta:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión al registrar la venta:', error);
  }
}

function guardarDatosTicket(itemsVenta, total) {
  sessionStorage.setItem('ticketProductos', JSON.stringify(itemsVenta));
  sessionStorage.setItem('ticketTotal', total);
  sessionStorage.setItem('ticketFecha', new Date().toLocaleDateString('es-AR'));
}

async function confirmarCompra() {
  cerrarModal();

  const itemsVenta = armarItemsVenta();
  const total = itemsVenta.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  await registrarVenta(itemsVenta, total);
  guardarDatosTicket(itemsVenta, total);

  carrito = [];
  guardarCarrito();
  window.location.href = 'http://localhost:3000/cliente/ticket.html';
}

/* ===== Init ===== */
cargarProductos();
actualizarContador();
