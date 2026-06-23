const contenedorProductos = document.getElementById("contenedor-productos");
const url = "http://localhost:3000/api/products/";

async function obtenerProductos() {
    try {
        const response = await fetch(url);
        console.log(response);
        // Verificamos que la respuesta HTTP fue exitosa OP1 del profe
        if (!response.ok) {
            // Traemos el message que devuelve el 500
            const parsedResponse = await response.json();
            throw new Error(`${parsedResponse.message}`);
        }

        //  Destructuring directo op2clase
        const { payload } = await response.json();
        console.log(payload);
        renderizarProductos(payload);
    } catch (error) {
        console.error(error);
        //Creamos una funcion que crea parrafos con formato error y el mensaje. Mostramos el error en el DOM
        mostrarError(error);
    }
}

function renderizarProductos(array) {
    let htmlProductos = "";
    array.forEach(producto => {
        htmlProductos += `
            <div class="card-producto">
                <img src="http://localhost:3000/img/${producto.image}" alt="${producto.name}">
                <h4>${producto.name}</h4>
                <p>Id: ${producto.id}</p>
                <p>$${producto.price}</p>
            </div>
        `;
    });
    contenedorProductos.innerHTML = htmlProductos;
}

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;}

obtenerProductos();