const div = document.getElementById("productos");

const listarProductos = () => {
    let data = JSON.parse(localStorage.getItem("cartItems"));
    console.log(data)

    for (let i = 0; i < data.length; i++) {
        let newCard = `
            <div class="product-card">
                <h4 class="product-name">${data[i].nombre.replaceAll("-", " ")}</h4>
                <p class="product-quantity">Cantidad: ${data[i].cantidad}</p>
            </div>
        `
        div.innerHTML += newCard;
    }
}

let btn = document.getElementById("comprar");

btn.addEventListener("click", () => {
    let data = JSON.parse(localStorage.getItem("cartItems"));
    let token = localStorage.getItem("token");

    // Obtener la fecha actual
    const now = new Date();

// Obtener las partes de la fecha
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // El mes es 0 indexado, por lo que sumamos 1
    const day = String(now.getDate()).padStart(2, '0');

// Formatear la fecha en formato MySQL (YYYY-MM-DD)
    const mysqlDate = `${year}-${month}-${day}`;

    if (data.length > 0 && token) {
        fetch("http://localhost:3000/pedidos", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                productos: data,
                fecha: mysqlDate
            })
        })
        .then((response) => {
            if (response.status == 200 || response.status == 201) {
                localStorage.removeItem("cartItems");
                console.log("Compra realizada correctamente")
                location.href = "../pages/compra-exitosa.html" 
            } else {
                console.log("Parece que ocurrío un error")
            }
        })
        .catch((err) => {
            console.log(err)    
        })
    }
})

listarProductos();