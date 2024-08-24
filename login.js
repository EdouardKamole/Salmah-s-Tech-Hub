const users = [
    { username: 'burume.kamole@gmail.com', password: 'cs-ai master' },
    { username: 'Eddy.programmer@gmail.com', password: 'Kamole07' },
    { username: 'peterpaira43@gmail.com', password: 'password33' },
    { username: 'musiimentamark484@gmail.com', password: 'Musiimenta' },
    { username: 'user5@example.com', password: 'password5' },
    { username: 'user6@example.com', password: 'password6' },
    { username: 'user7@example.com', password: 'password7' },
    { username: 'user8@example.com', password: 'password8' },
    { username: 'user9@example.com', password: 'password9' },
    { username: 'user10@example.com', password: 'password10' }
];

function login(username, password) {
    return users.find(user => user.username === username && user.password === password);
}

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = login(username, password);

    const messageElement = document.getElementById('message');

    if (user) {
        messageElement.innerHTML = `<div class="alert alert-success">Login successful. Welcome, ${user.username}!</div>`;
        // You can redirect to another page or perform other actions here
        // window.location.href = 'products.html';
    } else {
        messageElement.innerHTML = `<div class="alert alert-danger">Invalid username or password</div>`;
    }
});
