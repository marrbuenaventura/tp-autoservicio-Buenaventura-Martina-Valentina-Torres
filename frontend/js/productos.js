
/* despues pasar a un archivo JS aparte, pero por ahora lo dejo aca para que sea mas facil de probar */
/* ===== Conexión con el back ===== */
const urlBase = "http://localhost:3000/api/products";
let productos = []; // se llena con el fetch

const CATEGORIA_ZAPATILLAS = "zapatillas";
const CATEGORIA_ROPA = "Ropa";

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
  const gridZap = document.getElementById('gridZapatillas');
  const gridRopa = document.getElementById('gridRopa');
  gridZap.innerHTML = `<p class="error-msg">${mensaje}</p>`;
  gridRopa.innerHTML = '';
}

let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

const nombre = sessionStorage.getItem('nombreUsuario') || 'Invitado';
document.getElementById('nombreUsuario').textContent = nombre + '!';

function renderProductos() {
  const gridZap = document.getElementById('gridZapatillas');
  const gridRopa = document.getElementById('gridRopa');
  gridZap.innerHTML = '';
  gridRopa.innerHTML = '';

  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img" style="${p.img ? `background-image:url('${p.img}');background-size:cover;` : ''}"></div>
      <div class="card-nombre">${p.nombre}</div>
      <div class="card-precio">$${p.precio.toLocaleString('es-AR')}</div>
      <button class="card-btn" onclick="agregarAlCarrito(${p.id}, this)">Agregar al carrito</button>
    `;
    if (p.categoria === CATEGORIA_ZAPATILLAS) gridZap.appendChild(card);
    else if (p.categoria === CATEGORIA_ROPA) gridRopa.appendChild(card);
  });
}

/* ===== Carrito ===== */
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

  if (btn) {
    const original = btn.textContent;
    btn.textContent = '✓ Agregado';
    btn.classList.add('agregado');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('agregado');
    }, 1000);
  }
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

  if (carrito.length === 0) {
    body.innerHTML = '<div class="drawer-vacio">Tu carrito está vacío! agrega un producto para empezar a comprar.</div>';
    totalEl.textContent = '$0';
    return;
  }

  let total = 0;
  body.innerHTML = carrito.map(i => {
    const p = productos.find(prod => prod.id === i.id);
    total += p.precio * i.cantidad;
    return `
      <div class="drawer-item">
        <img src="${p.img || 'https://via.placeholder.com/54'}" alt="${p.nombre}">
        <div class="drawer-item-info">
          <div class="drawer-item-nombre">${p.nombre}</div>
          <div class="drawer-item-precio">$${p.precio.toLocaleString('es-AR')}</div>
          <div class="drawer-item-qty">
            <button class="qty-btn" onclick="cambiarCantidad(${p.id}, -1)">−</button>
            <span>${i.cantidad}</span>
            <button class="qty-btn" onclick="cambiarCantidad(${p.id}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  totalEl.textContent = '$' + total.toLocaleString('es-AR');
}

function toggleDrawer(abrir) {
  document.getElementById('drawer').classList.toggle('show', abrir);
  document.getElementById('overlay').classList.toggle('show', abrir);
}

function finalizarCompra() {
  if (carrito.length === 0) return;
  // Calculamos el total para mostrarlo en el modal
  const total = carrito.reduce((acc, item) => {
    const p = productos.find(prod => prod.id === item.id);
    return acc + (p ? p.precio * item.cantidad : 0);
  }, 0);

  // Mostramos el modal con el total
  document.getElementById('modalTexto').textContent =
    `¿Confirmás la compra por $${total.toLocaleString('es-AR')}?`;
  const modal = document.getElementById('modalOverlay');
  modal.style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function confirmarCompra() {
  cerrarModal();

  // Guardamos los datos del ticket en sessionStorage para que ticket.html los lea
  const itemsVenta = carrito.map(item => {
    const p = productos.find(prod => prod.id === item.id);
    return {
      id: item.id,
      nombre: p.nombre,
      cantidad: item.cantidad,
      precio: p.precio
    };
  });

  const total = itemsVenta.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  sessionStorage.setItem('ticketProductos', JSON.stringify(itemsVenta));
  sessionStorage.setItem('ticketTotal', total);
  sessionStorage.setItem('ticketFecha', new Date().toLocaleDateString('es-AR'));

  // Limpiamos el carrito
  carrito = [];
  guardarCarrito();

  // Vamos al ticket
  window.location.href = 'http://localhost:3000/cliente/ticket.html';
}

/* ===== Init ===== */
cargarProductos();
actualizarContador();
