let btn = document.getElementById("btn-registrar");

btn.addEventListener("click", () => {
    let data = {
        nombreUsuario: document.getElementById("nombreUsuario").value,
        contrasena: document.getElementById("password").value,
        contrasena_repetida: document.getElementById("repeatPassword").value,
        rfc: document.getElementById("rfc").value,
        celular: document.getElementById("celular").value,
        calle: document.getElementById("calle").value,
        numero: document.getElementById("numeroCasa").value,
        codigopostal: document.getElementById("cp").value
    };

    console.log(data)

    fetch("http://localhost:3000/sign-up", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json; charset=UTF-8"
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        if (response.status == 201) {
            window.location.href = "../pages/registro-exito.html"
        }
        return response.json();
    })
})