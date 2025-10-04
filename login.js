document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from refreshing

        // Get user input
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple validation
        if (username.trim() === "" || password.trim() === "") {
            alert("Please enter your username and password.");
            return;
        }

        // Simulating login success
        alert("Login successful! Redirecting to homepage...");
        
        // Redirect to index.html
        window.location.href = "index.html";
    });
});
