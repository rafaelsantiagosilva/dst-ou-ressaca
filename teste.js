navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    buscarFarmacias(lat, lon);
  },
  (error) => console.error("Erro ao obter localização:", error),
  { enableHighAccuracy: true }
);

function buscarFarmacias(lat, lon) {
  const query = `
    [out:json];
    (
      node["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
      way["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
      relation["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
    );
    out center;
  `;

  fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query))
    .then((response) => response.json())
    .then((data) => {
      console.log(data.elements);
      mostrarFarmacias(data.elements);
    })
    .catch((error) => console.error("Erro ao buscar farmácias:", error));
}

function mostrarFarmacias(farmacias) {
  if (farmacias.length === 0) {
    console.log("Nenhuma farmácia encontrada.");
    return;
  }

  farmacias.forEach((farmacia) => {
    console.log(`Farmácia encontrada: ${farmacia.tags.name || "Nome desconhecido"}`);
    console.log(`Localização: ${farmacia.lat}, ${farmacia.lon}`);
  });
}
