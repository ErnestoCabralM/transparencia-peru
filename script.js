fetch("data/pedidos.json")
  .then(response => response.json())
  .then(data => {

    let contenedor = document.getElementById("lista");

    data.forEach(pedido => {

      let div = document.createElement("div");

      div.innerHTML = `
        <h3>${pedido.resumen}</h3>
        <p><b>Entidad:</b> ${pedido.entidad}</p>
        <p><b>Resultado:</b> ${pedido.resultado}</p>
        <p><b>Estado:</b> ${pedido.estado_actual}</p>
        <hr>
      `;

      contenedor.appendChild(div);

    });

});
