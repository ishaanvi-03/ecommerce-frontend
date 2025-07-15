firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        // Update UI if needed
    } else {
        console.log("No user is logged in.");
    }
});
document.getElementById('logout-btn').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully");
        window.location.href = 'login.html';
    }).catch((error) => {
        alert("Logout failed: " + error.message);
    });
});
