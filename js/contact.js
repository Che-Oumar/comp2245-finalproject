document.addEventListener("DOMContentLoaded", () => {


    fetch("php/list_user.php")
        .then(r => r.json())
        .then(users => {
            const sel = document.getElementById("assigned_o");
            sel.innerHTML = `<option value="">Select User</option>`;
            users.forEach(u => {
                sel.innerHTML += `<option value="${u.id}">${u.firstname} ${u.lastname}</option>`;
            });
        });

    document.getElementById("newContactForm").addEventListener("submit", function(e) {
        e.preventDefault();

        fetch("php/insert_contact.php", {
            method: "POST",
            body: new FormData(this)
        })
        .then(r => {
            if (!r.ok) throw new Error("Request failed");
            return r.json();
        })

        .then(r => r.json())
        .then(res => {
            if (res.status === "success") {
                alert("Contact saved");
                this.reset();
            } else {
                alert("Error saving contact");
            }
        });
    });
});
