let btn = document.getElementById("btn-logear");

btn.addEventListener("click", () => {
    let data = {
        nombreUsuario: document.getElementById("nombreUsuario").value,
        contrasena: document.getElementById("password").value
    }

    fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json; charset=UTF-8"
        }
    }).then(response => response.json())
    .then(data => {
        if (data.token) {
            // Almacenar el token en localStorage
            localStorage.removeItem("token");
            localStorage.setItem('token', data.token);
            location.href = "../pages/home.html"
        } else {
            console.log('Login failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
})