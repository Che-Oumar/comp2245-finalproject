const id = new URLSearchParams(window.location.search).get("id");
document.getElementById("contact_id").value = id;

/* ---------- CONTACT DETAILS ---------- */
fetch(`php/get_contact.php?id=${id}`)
.then(r => r.json())
.then(c => {

    document.getElementById("contactName").innerText =
        `${c.title} ${c.firstname} ${c.lastname}`;

    document.getElementById("createdAt").innerText =
        `${c.created_at} by ${c.created_firstname} ${c.created_lastname}`;

    document.getElementById("updatedAt").innerText = c.updated_at;

    document.getElementById("contactInfo").innerHTML = `
        <p>Email: ${c.email}</p>
        <p>Telephone: ${c.telephone}</p>
        <p>Company: ${c.company}</p>
        <p>Type: ${c.type}</p>
    `;

    document.getElementById("switch").innerText =
        `Switch to ${c.type === "Sales Lead" ? "Support" : "Sales Lead"}`;
});

/* ---------- LOAD NOTES ---------- */
function loadNotes() {
    fetch(`php/list_notes.php?contact_id=${id}`)
        .then(r => r.json())
        .then(data => {
            const notesDiv = document.getElementById("notes");
            notesDiv.innerHTML = "";

            if (data.notes.length === 0) {
                notesDiv.innerHTML = "<p>No notes yet.</p>";
                return;
            }

            data.notes.forEach(n => {
                notesDiv.innerHTML += `
                    <div class="note-card">
                        <p>${n.comment}</p>
                        <small>
                            by ${n.user_firstname} ${n.user_lastname}
                            on ${n.created_at}
                        </small>
                    </div>
                `;
            });
        });
}

loadNotes();


document.getElementById("noteForm").addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("php/add_note.php", {
        method: "POST",
        body: new FormData(this)
    })
    .then(r => r.json())
    .then(res => {
        if (res.status === "success") {
            this.reset();
            loadNotes();
        } else {
            alert("Error adding note");
        }
    });
});

document.getElementById("assignBtn").addEventListener("click", () => {
    fetch("php/assign_contact.php", {
        method: "POST",
        body: new URLSearchParams({ contact_id: id })
    }).then(() => location.reload());
});

document.getElementById("switch").addEventListener("click", () => {
    fetch("php/switch_type.php", {
        method: "POST",
        body: new URLSearchParams({ contact_id: id })
    }).then(() => location.reload());
});
