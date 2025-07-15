document.getElementById('toggle-login-password').addEventListener('click', () => {
    const passwordField = document.getElementById('login-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    alert('Logged in successfully!');
});

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
