const listarProductos = () => {
    
    let div = document.getElementById("productos");
    let token = localStorage.getItem("token");
    
    if (!token) {
        console.log("No se encontró el token en el localStorage")
    }

    fetch("http://localhost:3000/productos", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
        .then((response) => response.json())
        .then((productos) => {
            for (let i = 0; i < productos.length; i++) {
                let nombreFormatted = productos[i].nombre.replaceAll("-", " ");
                let newProduct = `
                    <div class="product-card" data-id="${productos[i].id}">
                        <h4 class="product-name">${productos[i].nombre.replaceAll("-", " ")}</h4>
                        <p class="product-price">Precio: ${productos[i].precio} USD</p>
                        <input type="number" class="product-quantity" value="1" min="1">
                        <button class="btn-cart" type="button">Agregar al carrito</button>
                    </div>
                `
                div.innerHTML += newProduct;
            }
            addCartEventListeners();
        })
}

const addCartEventListeners = () => {
    const buttons = document.querySelectorAll('.btn-cart');
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productQuantity = parseInt(productCard.querySelector('.product-quantity').value);
            
            const producto = {
                nombre: productName.replaceAll(" ", "-"),
                cantidad: productQuantity
            };
            
            addToArrayInLocalStorage(producto, 'cartItems');
        });
    });
}

const saveArrayToLocalStorage = (array, key) => {
    localStorage.setItem(key, JSON.stringify(array));
}

const getArrayFromLocalStorage = (key) => {
    const storedArray = localStorage.getItem(key);
    return storedArray ? JSON.parse(storedArray) : [];
}

const addToArrayInLocalStorage = (element, key) => {
    const array = getArrayFromLocalStorage(key);
    
    // Check if the product already exists in the cart
    const existingProductIndex = array.findIndex(item => item.nombre === element.nombre);
    
    if (existingProductIndex > -1) {
        // Update quantity if product already exists
        array[existingProductIndex].cantidad += element.cantidad;
    } else {
        // Add new product to the cart
        array.push(element);
    }
    
    saveArrayToLocalStorage(array, key);
}

listarProductos();