// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary elements
    const container = document.querySelector('.container');
    const loginPage = document.querySelector('.login-page');
    const teamButton = document.getElementById('team-button');
    const teamPage = document.getElementById('team-page');
    const closeTeam = document.getElementById('close-team');
    const loginForm = document.getElementById('loginForm');
    const skipLogin = document.getElementById('skip-login');

    // Login credentials
    const VALID_CREDENTIALS = {
        username: 'UtilityAI',
        password: 'group27'
    };

    // Initial animation and login page display
    setTimeout(() => {
        // Fade out the container
        container.style.opacity = '0';
        container.style.transition = 'opacity 1s';

        // Show login page
        loginPage.classList.add('visible');

        // Remove container after fade
        setTimeout(() => {
            container.style.display = 'none';
        }, 1000);
    }, 4000);

    // Team button click handler
    teamButton.addEventListener('click', () => {
        teamPage.classList.add('visible');
    });

    // Close team page button click handler
    closeTeam.addEventListener('click', () => {
        teamPage.classList.remove('visible');
    });

    // Function to show error message
    const showError = () => {
        // Remove any existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and show new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff4444';
        errorDiv.style.marginTop = '10px';
        errorDiv.textContent = 'Invalid login credentials. Please try again.';
        loginForm.appendChild(errorDiv);

        // Clear the password field
        document.getElementById('password').value = '';
    };

    // Login form submit handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === VALID_CREDENTIALS.username && 
            password === VALID_CREDENTIALS.password) {
            // Valid credentials - redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // Invalid credentials - show error
            showError();
        }
    });

    // Skip login button click handler
    skipLogin.addEventListener('click', () => {
        window.location.href = 'dashboard.html';
    });
});