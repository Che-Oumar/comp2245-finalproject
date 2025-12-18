document.getElementById("newContactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("php/insert_contact.php", {
        method: "POST",
        body: new FormData(this)
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === "success") {
            alert("Contact saved");
            this.reset();
        }
    });
});
