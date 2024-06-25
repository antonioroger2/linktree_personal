document.addEventListener('DOMContentLoaded', () => {
    const correctPassword = '2428';  
    const timeoutDuration = 5 * 60 * 1000; 
    let logoutTimer;
    const loginCard = document.getElementById('login'); 
    const linksCard = document.getElementById('links');  
    const errorMessage = document.getElementById('error-message');
    const loginForm = document.querySelector('#login form');
    const logoutBtn = document.getElementById('logout-btn');
    const links = document.querySelectorAll('#links a');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const passwordInput = document.getElementById('password');
        const password = passwordInput.value.trim();  
        
        if (password === '') {
            errorMessage.innerText = 'Please enter a password';
            return;
        }

        if (password === correctPassword) {
            localStorage.setItem('user', 'success');
            loginCard.style.display = 'none';
            linksCard.style.display = 'block';
            errorMessage.innerText = '';  
            startLogoutTimer();
        } else {
            errorMessage.innerText = 'Incorrect password. Please retry.';
            passwordInput.value = ''; 
            passwordInput.focus(); 
        }
    });

    logoutBtn.addEventListener('click', function(event) {
        event.preventDefault();
        logout();
    });

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const password = prompt("Please re-enter your password to redirect to the link:");
            if (password === correctPassword) {
                window.open(link.href, '_blank');  // Open link in a new tab/window
                logout();  // Call logout after opening the link
            } else {
                logout();  // Call logout if the password is incorrect
            }
        });
    });

    // Check if the user is logged in on page load
    if (localStorage.getItem('user') === 'success') {
        loginCard.style.display = 'none';
        linksCard.style.display = 'block';
        startLogoutTimer();
    } else {
        loginCard.style.display = 'block';
        linksCard.style.display = 'none';
    }
    function logout() {
        document.getElementById("login").style.display = "block";
        document.getElementById("links").style.display = "none";
        document.getElementById("password").value = "";
        document.getElementById("error-message").innerText = "";
    }

    function handleSubmit() {
        logout();
    }

    
});
