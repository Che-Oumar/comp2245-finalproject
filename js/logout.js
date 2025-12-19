document.getElementById("logout").addEventListener("click", e => {
    e.preventDefault();

    fetch("php/logout.php", { method: "POST" })
        .then(r => r.json())
        .then(() => {
            window.location.replace("login.html");
        });
});
