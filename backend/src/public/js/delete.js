const contenedorProductos = document.getElementById("contenedor-productos")
const getProductForm = document.getElementById("getProduct-form")
const urlBase = "http://localhost:3000/api/products"

getProductForm.addEventListener("submit", async event => {
    event.preventDefault()
    const idProd = event.target.idProd.value.trim()
    if (!idProd) {
        mostrarMensaje("error", "Ingresá un id válido")
        return
    }
    try {
        const response = await fetch(`${urlBase}/${idProd}`)
        const datos = await response.json()

        if (!response.ok) {
            mostrarMensaje("error", datos.message)
            return
        }
        renderizarProducto(datos.payload)
    } catch (error) {
        mostrarMensaje("error", "Error de conexión con el servidor")
    }})

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <ul>
            <li class="lista-producto">
                <img src="http://localhost:3000/assets/img/${producto.image}" alt="${producto.name}">
                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                <p>Categoría: ${producto.category} / Estado: ${producto.active ? 'Activo' : 'Inactivo'}</p>
                <input type="button" id="deleteProduct-button" value="Eliminar Producto">
            </li>
        </ul>
    `
    document.getElementById("deleteProduct-button").addEventListener("click", event => {
        event.stopPropagation()
        if (confirm("¿Querés eliminar este producto?")) {
            eliminarProducto(producto.id)
        }
    })
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`${urlBase}/${id}`, {
            method: "DELETE"
        })

        const result = await response.json()

        if (!response.ok) {
            mostrarMensaje("error", result.message)
            return
        }
        mostrarMensaje("exito", result.message)
    } catch (error) {
        mostrarMensaje("error", "Error de conexión con el servidor")
    }}

function mostrarMensaje(tipo, mensaje) {
    contenedorProductos.innerHTML = `<p class="mensaje mensaje-${tipo}">${mensaje}</p>`
}