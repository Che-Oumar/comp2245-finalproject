document.addEventListener("DOMContentLoaded", () => {

    // Populate assigned_to dropdown
    fetch("php/list_user.php")
        .then(r => r.json())
        .then(users => {
            const sel = document.getElementById("assigned_to");
            sel.innerHTML = `<option value="">Select User</option>`;
            users.forEach(u => {
                sel.innerHTML += `<option value="${u.id}">${u.firstname} ${u.lastname}</option>`;
            });
        });

    const form = document.getElementById("newContactForm");
    const submitBtn = form.querySelector("button[type='submit']");
    const alertBox = document.getElementById("contactAlert");

    function showAlert(message, type = "info") {
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.style.display = "block";
    }

    function hideAlert() {
        alertBox.style.display = "none";
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        hideAlert();

        // Show sending state
        submitBtn.disabled = true;
        submitBtn.textContent = "Saving...";
        showAlert("Saving contact...", "info");

        fetch("php/insert_contact.php", {
            method: "POST",
            body: new FormData(this)
        })
        .then(r => {
            if (!r.ok) throw new Error("Request failed");
            return r.json();
        })
        .then(res => {
            if (res.status === "success") {
                showAlert("Contact saved ", "success");
                form.reset();
            } else {
                showAlert("Error saving contact.", "error");
            }
        })
        .catch(err => {
            showAlert("Failed to save contact: " + err.message, "error");
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = "Save";
        });
    });
});
