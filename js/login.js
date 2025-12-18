const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    loginError.textContent = '';

    const formData = new FormData(loginForm);

    fetch('php/login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            window.location.href = 'dashboard.html';
        } else {
            loginError.textContent = 'Invalid email or password';
        }
    })
    .catch(err => {
        console.error(err);
        loginError.textContent = 'An error occurred during login';
    });
});
