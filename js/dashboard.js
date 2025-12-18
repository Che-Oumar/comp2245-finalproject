document.addEventListener("DOMContentLoaded", () => {
    fetch("php/dashboard_data.php")
        .then(res => res.json())
        .then(data => {
            document.getElementById("totalContacts").textContent = data.total;
            document.getElementById("newContacts").textContent = data.new;
        });

    document.getElementById("logout").addEventListener("click", e => {
        e.preventDefault();
        fetch("php/logout.php").then(() => {
            window.location.href = "login.html";
        });
    });
});
