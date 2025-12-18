fetch("php/list_users.php")
.then(r => r.json())
.then(users => {
    const tbody = document.getElementById("users");
    users.forEach(u => {
        tbody.innerHTML += `
            <tr>
                <td>${u.firstname} ${u.lastname}</td>
                <td>${u.email}</td>
                <td>${u.role}</td>
                <td>${u.created_at}</td>
            </tr>`;
    });
});
