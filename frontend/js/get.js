const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const urlBase = "http://localhost:3000/api/products";

getProductForm.addEventListener("submit", async event => {
    event.preventDefault(); // Evitamos el envio por defecto del formulario
    // para extraer solamente un valor, como el id en nuestro miniformulario, podemos saltarnos el FormData + Object.fromEntries
    const idProd = event.target.idProd.value.trim();
    // nos aseguramos de que se haya enviado un id valido
    if (!idProd) {
        mostrarError("Ingresá un id válido");
        return;
    }
    /*Creo un objeto nativo FormData a partir del formulario del evento
    const formData = new FormData(event.target);
    console.log(formData); // FormData { idProd → "1" }
    Transformo mi objeto nativo FormData en un objeto normal JS
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Object { idProd: "1" }
    const idProd = data.idProd; // 1
    */


    try {
        //Guardamos en una variable aparte la URL base para no hardcodearla aca
        const response = await fetch(`${urlBase}/${idProd}`);
        console.log(response);

        const data = await response.json();

        // mostramos por pantalla el error (400 o 500) que nos devuelve el servidor
        if (!response.ok) {
            mostrarError(data.message);
            return;
        }
        console.log(data.payload[0]); 

        const producto = data.payload;
        const htmlProducto = `
            <ul>
                <li class="lista-producto">
                    <img src="http://localhost:3000/img/${producto.image}" alt="${producto.name}">
                    <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                </li>
            </ul>
        `;

        contenedorProductos.innerHTML = htmlProducto;
    } catch (error) {
        console.error("Error al obtener productos: ", error);
        //Mostramos errores de red (en el try catch del fetch no capturamos errores 400 o 500) OP DEL  PROFE OA
        mostrarError("Error de conexion con el servidor")
    }
})

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}
