document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    fetch("php/login.php", {
        method: "POST",
        body: new FormData(e.target)
    })
    .then(r => r.json())
    .then(d => {
        if (d.status === "success") location.href = "dashboard.html";
        else alert("Login failed");
    });
});
