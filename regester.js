const users = [];

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const messageElement = document.getElementById('reg-message');

    if (password !== confirmPassword) {
        messageElement.innerHTML = `<div class="alert alert-danger">Passwords do not match</div>`;
        return;
    }

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        messageElement.innerHTML = `<div class="alert alert-danger">Username already exists</div>`;
        return;
    }

    users.push({ username, password });
    messageElement.innerHTML = `<div class="alert alert-success">Account created successfully. You will receive a verification code in your email.</div>`;
});
