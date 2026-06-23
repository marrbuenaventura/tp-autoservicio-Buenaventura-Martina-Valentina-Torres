const contenedorProductos = document.getElementById("contenedor-productos")
const getProductForm = document.getElementById("getProduct-form")
const contenedorForm = document.getElementById("contenedor-form")
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
    }
})

function renderizarProducto(producto) {
    contenedorProductos.innerHTML = `
        <ul>
            <li class="lista-producto">
                <img src="http://localhost:3000/img/${producto.image}" alt="${producto.name}">
                <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                <p>Categoría: ${producto.category} / Estado: ${producto.active ? 'Activo' : 'Inactivo'}</p>
                <input type="button" id="updateProduct-button" value="Actualizar Producto">
            </li>
        </ul>
    `
    document.getElementById("updateProduct-button").addEventListener("click", event => {
        event.stopPropagation()
        if (confirm("¿Querés actualizar este producto?")) {
            mostrarFormularioPut(event, producto)
        }
    })
}

function mostrarFormularioPut(event, producto) {
    event.stopPropagation()
    // ahora el forms te deja actualizar todos los datos del producto, incluyendo el estado activo/inactivo y la categoría antes no se podia nose porq veremos si el profe aclara algo
    contenedorForm.innerHTML = `
        <hr>
        <form id="updateProduct-form" class="form-alta">
            <input type="hidden" name="id" value="${producto.id}">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.name}" required>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.image}" required>

            <label for="categoryProd">Categoría</label>
            <select name="category" id="categoryProd" required>
                <option value="ropa" ${producto.category === 'ropa' ? 'selected' : ''}>Ropa</option>
                <option value="zapatillas" ${producto.category === 'zapatillas' ? 'selected' : ''}>Zapatillas</option>
            </select>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.price}" required>

            <label for="activeProd">Estado</label>
            <select name="active" id="activeProd">
                <option value="1" ${producto.active == 1 ? 'selected' : ''}>Activo</option>
                <option value="0" ${producto.active == 0 ? 'selected' : ''}>Inactivo</option>
            </select>

            <div>
                <input type="submit" value="Actualizar producto">
            </div>
        </form>
    `
    document.getElementById("updateProduct-form").addEventListener("submit", actualizarProducto)
}

async function actualizarProducto(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.target).entries())

    try {
        const response = await fetch(`${urlBase}/${data.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        if (!response.ok) {
            mostrarMensaje("error", result.message)
            return
        }
        mostrarMensaje("exito", result.message)
    } catch (error) {
        mostrarMensaje("error", "Error de conexión con el servidor")
    }
}

function mostrarMensaje(tipo, mensaje) {
    contenedorForm.innerHTML = ""
    contenedorProductos.innerHTML = `<p class="mensaje mensaje-${tipo}">${mensaje}</p>`
}