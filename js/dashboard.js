function loadContacts(filter="all") {
    fetch(`php/list_contact.php?filter=${filter}`)
        .then(r => r.json())
        .then(data => {
            const tbody = document.getElementById("contactsBody");
            tbody.innerHTML = "";
            data.forEach(c => {
                tbody.innerHTML += `
                <tr>
                    <td>${c.title} ${c.firstname} ${c.lastname}</td>
                    <td>${c.email}</td>
                    <td>${c.company}</td>
                    <td>
                        <span class="${c.type === 'Sales Lead' ? 'badge-sales' : 'badge-support'}">
                            ${c.type.toUpperCase()}
                        </span>
                    </td>
                    <td>
                        <a href="ContactDetails.html?id=${c.id}">View</a>
                    </td>
                </tr>`;
            });
        });
}


document.addEventListener("DOMContentLoaded", () => {
    loadContacts();

    document.querySelectorAll(".filters button").forEach(btn => {
        btn.addEventListener("click", () => {
            loadContacts(btn.dataset.filter);
        });
    });
});
document.querySelector(".addBtn").addEventListener("click", () => {
    window.location.href = "NewContact.html";
});
