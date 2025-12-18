fetch(`php/list_notes.php?contact_id=${contactId}`)
.then(r => r.json())
.then(data => {
    if (data.error) {
        document.getElementById("contactInfo").innerText = data.error;
        return;
    }

    //contact info
    const contact = data.contact;
    document.getElementById("contactName").innerText = `${contact.title} ${contact.firstname} ${contact.lastname}`;
    document.getElementById("contactInfo").innerHTML = `
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.telephone}</p>
        <p>Company: ${contact.company}</p>
        <p>Type: ${contact.type}</p>
    `;

    //notes (if exists)
    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = '';
    if (data.notes.length === 0) {
        notesDiv.innerHTML = '<p>No notes yet.</p>';
    } else {
        data.notes.forEach(n => {
            notesDiv.innerHTML += `<p><b>${n.user_firstname}</b>: ${n.comment}</p>`;
        });
    }
});
