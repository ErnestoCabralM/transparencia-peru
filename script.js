function formatearFecha(fecha) {

  if(!fecha || !fecha.includes("-")) return fecha;

  let partes = fecha.split("-");
  return `${partes[2]}/${partes[1]}/${partes[0]}`;

};

function normalizarTexto(texto){
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/* =========================
RENDER PEDIDOS
========================= */

let pedidosGlobal = [];

function renderPedidos(lista){

  let contenedor = document.getElementById("lista");

  contenedor.innerHTML = "";

  lista.forEach(pedido => {

    let div = document.createElement("div");
    let claseResultado = "";

    if(pedido.resultado === "Entregado"){
      claseResultado = "resultado-entregado";
    }

    else if(pedido.resultado === "Denegado"){
      claseResultado = "resultado-denegado";
    }

    else if(pedido.resultado === "Parcial"){
      claseResultado = "resultado-parcial";
    }

    else if(pedido.estado_actual === "Proceso judicial"){
      claseResultado = "resultado-judicial";
    }

    div.className = `pedido-card ${claseResultado}`;

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

}

/* =========================
CARGAR PEDIDOS
========================= */

fetch("data/pedidos.json")
  .then(response => response.json())
  .then(data => {

    pedidosGlobal = data;

    renderPedidos(data);

});

/* =========================
BUSCADOR
========================= */

let buscador = document.getElementById("buscador");

if(buscador){

  buscador.addEventListener("input", function(){

    let texto = normalizarTexto(this.value);

    let filtrados = pedidosGlobal.filter(p =>

      normalizarTexto(p.resumen).includes(texto) ||
      normalizarTexto(p.entidad).includes(texto)

    );

    renderPedidos(filtrados);

  });

}

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

/* =========================
QR YAPE
========================= */

function mostrarQR(){
  document.getElementById("qr-modal").style.display="flex";
}

function cerrarQR(){
  document.getElementById("qr-modal").style.display="none";
}
