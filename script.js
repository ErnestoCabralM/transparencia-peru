function formatearFecha(fecha) {

  if(!fecha || !fecha.includes("-")) return fecha;

  let partes = fecha.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;

}

fetch("data/pedidos.json")
  .then(response => response.json())
  .then(data => {

    let contenedor = document.getElementById("lista");

    data.forEach(pedido => {

      let div = document.createElement("div");
      div.className = "pedido-card";

      div.innerHTML = `
        <h3>${pedido.resumen}</h3>
        <p><b>Entidad:</b> ${pedido.entidad}</p>
        <p><b>Fecha solicitud:</b> ${formatearFecha(pedido.fecha_solicitud)}</p>
        <p><b>Resultado:</b> ${pedido.resultado}</p>
        <p><b>Estado:</b> ${pedido.estado_actual}</p>

        <a href="pedido.html?id=${pedido.id}">Ver expediente</a>
      `;

      contenedor.appendChild(div);

    });

});

/* =========================
CONTADOR
========================= */

Promise.all([
  fetch("data/pedidos.json").then(r => r.json()),
  fetch("data/documentos.json").then(r => r.json())
]).then(([pedidos, documentos]) => {

  let contenedor = document.getElementById("contador");

  let totalPedidos = pedidos.length;
  let totalDocs = documentos.length;

  contenedor.innerHTML = `
    <p><b>${totalPedidos}</b> pedidos publicados · <b>${totalDocs}</b> documentos liberados</p>
  `;

});

.pedido-card{

  border:1px solid #ddd;
  border-radius:10px;

  padding:18px;

  background:white;

  box-shadow:0 2px 6px rgba(0,0,0,0.05);

  transition:transform 0.15s ease, box-shadow 0.15s ease;

}

.pedido-card:hover{

  transform:translateY(-3px);

  box-shadow:0 6px 14px rgba(0,0,0,0.1);

}

.pedido-card h3{

  margin-top:0;

}

.pedido-card a{

  display:inline-block;

  margin-top:10px;

  font-weight:bold;

}
