document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("php/login.php", {
        method: "POST",
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.href = "dashboard.html";
        } else {
            alert("Login failed: Invalid email or password");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
});
