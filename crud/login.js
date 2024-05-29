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
    }).then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        if (response.status == 200) {
            window.location.href = "../pages/home.html"
        }
        return response.json();
    })
})