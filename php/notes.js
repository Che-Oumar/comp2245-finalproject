fetch(`php/list_notes.php?contact_id=${contactId}`)
.then(r => r.json())
.then(notes => {
    notes.forEach(n => {
        document.getElementById("notes").innerHTML += `
            <p><b>${n.firstname}</b>: ${n.comment}</p>`;
    });
});
