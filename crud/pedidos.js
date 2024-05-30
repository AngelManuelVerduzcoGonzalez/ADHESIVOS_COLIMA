const recuperarProductos = () => {

    let token = localStorage.getItem("token");
    let div = document.getElementById("pedidos");

    fetch("http://localhost:3000/pedidos", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then((response) => response.json())
    .then((pedidos) => {
        console.log(pedidos)
        const pedidosAgrupados = agruparPorIdFactura(pedidos);
        console.log(pedidosAgrupados);
        // for (let i = 0; i < pedidos.length; i++) {
        //     let pedido = separarPedidos(pedidos)
        //     let newPedido = `
        //         <div class="pedido-card">
        //             <h4 class="total">Total: ${calcularTotal(pedido)} USD</h4>
        //             <p class="fecha">Fecha: ${pedido[0].fecha}</p>
        //             <div class="productos">
        //                 <div class="producto">
        //                     <p class="product-name">${pedido[i].nombre}</p>
        //                     <p class="product-quantity">Cant: ${pedido[i].cantidad}</p>
        //                     <p class="product-price"> ${pedido[i].precio} USD</p>
        //                 </div>
        //             </div>
        //         </div>
        //     `
        //     div.innerHTML += newPedido;
        // }
    })
}

const separarPedidos = (pedidos) => {
    let arrayPedido = [];
    while (pedidos.length > 1) {
        let idFactura = pedidos[0].idFactura
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].idFactura == idFactura) {
                arrayPedido.push(pedidos[i]);
                pedidos.splice(i, 1);
            }
        }        
    }
    return arrayPedido;
}

function agruparPorIdFactura(pedidos) {
    const pedidosAgrupados = {};

    pedidos.forEach(pedido => {
        const idFactura = pedido.idfactura;
        console.log(idFactura)
        if (!pedidosAgrupados[idFactura]) {
            pedidosAgrupados[idFactura] = {
                idfactura: idFactura,
                fecha: pedido.fecha,
                productos: []
            };
        }
        pedidosAgrupados[idFactura].productos.push({
            producto: pedido.producto,
            cantidad: pedido.cantidad,
            precio: pedido.precio,
            total: pedido.total
        });
    });

    return pedidosAgrupados;
}

const calcularTotal = (pedido) => {
    let total = 0;

    for (let i = 0; i < pedido.length; i++) {
        total += pedido[i].total
    }
}

recuperarProductos();