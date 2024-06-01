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
    
        const pedidosAgrupados = agruparPorIdFactura(pedidos[0]);
        console.log(pedidosAgrupados)

    for (let i = 0; i < pedidosAgrupados.length; i++) {
        let productosHTML = '';
        pedidosAgrupados[i].productos.forEach(producto => {
            productosHTML += `
                <div class="producto">
                    <p class="product-name">${producto.producto}</p>
                    <p class="product-quantity">Cant: ${producto.cantidad}</p>
                    <p class="product-price">${producto.precio}USD</p>
                    <p class="product-total">Total: ${producto.total} USD</p>
                </div>
            `;
        });

        let newPedido = `
            <div class="pedido-card" id="pedido-${pedidosAgrupados[i].idfactura}">
                <h4 class="total">Total: ${calcularTotal(pedidosAgrupados[i])} USD</h4>
                <p class="fecha">Fecha: ${formatearFecha(pedidosAgrupados[i].fecha)}</p>
                <div class="productos">
                    ${productosHTML}
                </div>
            </div>
        `;
        div.innerHTML += newPedido;
    }
    })
}

function agruparPorIdFactura(pedidos) {
    const pedidosAgrupados = {};

    pedidos.forEach(pedido => {
        const { idfactura, fecha, producto, cantidad, precio, total } = pedido;
        
        if (!pedidosAgrupados[idfactura]) {
            pedidosAgrupados[idfactura] = {
                idfactura: idfactura,
                fecha: new Date(fecha),
                productos: []
            };
        }

        pedidosAgrupados[idfactura].productos.push({
            producto: producto,
            cantidad: cantidad,
            precio: precio,
            total: total
        });
    });

    return Object.values(pedidosAgrupados);
}

const calcularTotal = (pedido) => {
    let total = 0;

    for (let i = 0; i < pedido.productos.length; i++) {
        console.log(pedido.productos[i].total )
        total += parseFloat(pedido.productos[i].total)
    }

    return total
}

function formatearFecha(fecha) {
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

recuperarProductos();