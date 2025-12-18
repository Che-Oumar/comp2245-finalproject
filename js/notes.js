const id = new URLSearchParams(window.location.search).get("id");
document.getElementById("contact_id").value = id;

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

    // Switch button label
    document.getElementById("switch").innerText =
        `Switch to ${c.type === "Sales Lead" ? "Support" : "Sales Lead"}`;
});
document.querySelector(".addBtn").addEventListener("click", () => {
    fetch("php/assign_contact.php", {
        method: "POST",
        body: new URLSearchParams({ contact_id: id })
    }).then(() => location.reload());
});

document.getElementById("switch").addEventListener("click", () => {
    fetch("php/switch_type.php", {
        method: "POST",
        body: new URLSearchParams({ contact_id: id })
    })
    .then(r => r.json())
    .then(() => location.reload());
});
