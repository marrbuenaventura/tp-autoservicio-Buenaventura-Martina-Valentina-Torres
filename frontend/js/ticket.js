 /*
    Leemos todo lo que guardo confirmarCompra() en sessionStorage.
    Acordate que sessionStorage persiste entre paginas
    de la misma pestana del navegador, por eso podemos
    leerlo aca aunque lo guardamos en productos.html
  */
    const nombre  = sessionStorage.getItem('nombreUsuario') || 'Invitado';
    const fecha   = sessionStorage.getItem('ticketFecha')   || new Date().toLocaleDateString('es-AR');
    const total   = Number(sessionStorage.getItem('ticketTotal') || 0);
  
    /*
      ticketProductos es un string JSON que guardamos en productos.html.
      JSON.parse lo convierte de string a array de objetos JS.
      Cada objeto tiene: { id, nombre, cantidad, precio }
    */
    const productos = JSON.parse(sessionStorage.getItem('ticketProductos') || '[]');
  
    /* Insertamos los valores en el HTML */
    document.getElementById('ticketNombre').textContent = nombre;
    document.getElementById('ticketFecha').textContent  = fecha;
    document.getElementById('ticketTotal').textContent  = '$' + total.toLocaleString('es-AR');
  
    /*
      Recorremos el array de productos.
      Por cada uno creamos una fila con nombre, cantidad y subtotal.
      innerHTML += agrega cada fila sin borrar las anteriores.
    */
    const contenedorItems = document.getElementById('ticketItems');
  
    if (productos.length === 0) {
      contenedorItems.innerHTML = '<p style="color:var(--gris);font-size:14px;padding:8px 0;">No hay productos.</p>';
    } else {
      productos.forEach(item => {
        // subtotal = precio unitario x cantidad de ese producto
        const subtotal = item.precio * item.cantidad;
        contenedorItems.innerHTML += `
          <div class="ticket-item">
            <span class="ticket-item-nombre">${item.nombre}</span>
            <span class="ticket-item-qty">x${item.cantidad}</span>
            <span class="ticket-item-precio">$${subtotal.toLocaleString('es-AR')}</span>
          </div>
        `;
      });
    }
  
    /*
      descargarPDF toma el elemento del ticket y lo convierte a PDF.
      html2pdf() crea el conversor.
      .set(opciones) le dice el formato, nombre de archivo, calidad.
      .from(elemento) le dice que elemento convertir.
      .save() lo descarga automaticamente.
    */
    function descargarPDF() {
      const elemento = document.getElementById('ticketParaPDF');
      const opciones = {
        margin: 10,
        filename: `ticket-sport-and-sweet-${fecha}.pdf`,
        image:       { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },  // escala alta para que salga nitido
        jsPDF:       { unit: 'mm', format: 'a5', orientation: 'portrait' }
      };
      html2pdf().set(opciones).from(elemento).save();
    }
  
    /*
      nuevaCompra limpia TODO y vuelve a bienvenida.html.
      Esto es lo que hace que sea un autoservicio:
      cada compra es independiente, el sistema se reinicia completamente.
      - sessionStorage: borra nombre, productos, total y fecha del ticket
      - localStorage: borra el carrito
    */
    function nuevaCompra() {
      sessionStorage.removeItem("ticketNombre");
      sessionStorage.removeItem('ticketProductos');
      sessionStorage.removeItem('ticketTotal');
      sessionStorage.removeItem('ticketFecha');
      localStorage.removeItem('carrito');
      window.location.href = "/cliente/bienvenida.html";
    }