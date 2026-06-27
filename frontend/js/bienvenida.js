  /* despues psasar a un archivo JS aparte, pero por ahora lo dejo aca para que sea mas facil de probar */
  function continuar() {
    const input = document.getElementById('nombre')
    const nombre = input.value.trim()
    if (!nombre) {
      input.classList.add('error')
      input.focus()
      setTimeout(() => input.classList.remove('error'), 1500)
      return
    }
    sessionStorage.setItem('nombreUsuario', nombre)
    window.location.href = 'http://localhost:3000/cliente/productos.html'
  }
  document.getElementById('nombre').addEventListener('keydown', e => {
    if (e.key === 'Enter') continuar()
  })
  