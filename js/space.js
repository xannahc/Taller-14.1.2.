// Seleccionamos el input, el botón y el contenedor de resultados
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

// Agregamos un evento al botón
btnBuscar.addEventListener("click", function () {
  const input = inputBuscar.value.trim();
  if (input) {
    const APIUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(input)}`;


    fetch(APIUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud a la API");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        mostrarResultados(data);
      })
      .catch((error) => {
        console.error("Hubo un problema con la solicitud:", error);
      });
  } else {
    console.log("Por favor, ingresa un término de búsqueda.");
  }
});

function mostrarResultados(data) {
  contenedor.innerHTML = ""; // Limpiar resultados previos

  const items = data.collection.items; // Extraemos los elementos de la API

  if (items.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  // Iteramos sobre los resultados
  items.forEach((item) => {
    const titulo = item.data[0]?.title || "Sin título";
    const descripcion = item.data[0]?.description || "Sin descripción";
    const fecha = item.data[0]?.date_created || "Fecha no disponible";
    const imagenUrl = item.links?.[0]?.href || "";

    // Creamos un div para cada resultado
    const resultadoHTML = `
            <div class="card mb-3">
                <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                    <h5 class="card-title">${titulo}</h5>
                    <p class="card-text">${descripcion}</p>
                    <p class="card-text"><small class="text-muted">${new Date(
                      fecha
                    ).toLocaleDateString()}</small></p>
                </div>
            </div>
        `;

    contenedor.innerHTML += resultadoHTML; // Añadimos el HTML al contenedor
  });
}
