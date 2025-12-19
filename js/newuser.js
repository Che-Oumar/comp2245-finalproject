// js/newuser.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newUserForm');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    form.parentNode.insertBefore(messageDiv, form);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating...';
        submitBtn.disabled = true;
        
        messageDiv.style.display = 'none';
        messageDiv.textContent = '';
        messageDiv.className = 'message';
        
        const password = document.getElementById('password').value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        
        if (!passwordRegex.test(password)) {
            showMessage('Password must have: 8+ characters, 1 uppercase, 1 lowercase, 1 number', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        const formData = new FormData(form);
        
        fetch('php/insert_user.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('User created successfully! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'Users.html';
                }, 1500);
            } else {
                showMessage(data.message || 'Error creating user', 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            showMessage('Network error. Please try again.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});