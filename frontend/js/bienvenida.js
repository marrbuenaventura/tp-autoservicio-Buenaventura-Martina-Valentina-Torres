const inputNombre = document.getElementById('nombre');

function continuar() {
    const nombre = inputNombre.value.trim();
    if (!nombre) {
      inputNombre.classList.add('error');
      inputNombre.focus();
      setTimeout(() => inputNombre.classList.remove('error'), 1500);
      return;
    }

    sessionStorage.setItem('nombreUsuario', nombre);
    window.location.href = 'http://localhost:3000/cliente/productos.html';
  }

inputNombre.addEventListener('keydown', e => {
    if (e.key === 'Enter') continuar()
  })
  