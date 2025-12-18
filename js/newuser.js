document.addEventListener('DOMContentLoaded', function() {
    console.log('New User page loaded');
    
    // Handle logout
    document.getElementById('logout').addEventListener('click', function(e) {
        e.preventDefault();
        fetch('php/logout.php')
            .then(() => window.location.href = 'login.html');
    });
    
    // Handle form submission
    const form = document.getElementById('newUserForm');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form button and set loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating...';
        submitBtn.disabled = true;
        
        // Clear previous messages
        messageDiv.textContent = '';
        messageDiv.className = '';
        messageDiv.style.display = 'none';
        
        // Validate password pattern
        const password = document.getElementById('password').value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        
        if (!passwordRegex.test(password)) {
            showMessage(
                'Password must contain: 8+ characters, 1 uppercase, 1 lowercase, 1 number',
                'error'
            );
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Submit via AJAX
        fetch('php/insert_user.php', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage('✅ User created successfully! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'Users.html';
                }, 1500);
            } else {
                showMessage('❌ ' + (data.message || 'Error creating user'), 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        })
        .catch(error => {
            showMessage('❌ Network error. Please try again.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        messageDiv.style.display = 'block';
    }
});