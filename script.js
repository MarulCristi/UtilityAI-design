


// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements
    const container = document.querySelector('.container');
    const loginPage = document.querySelector('.login-page');
    const dashboard = document.querySelector('.dashboard');
    const teamButton = document.getElementById('team-button');
    const teamPage = document.getElementById('team-page');
    const closeTeam = document.getElementById('close-team');
    const loginForm = document.getElementById('loginForm');
    const skipLogin = document.getElementById('skip-login');
    const accountBtn = document.getElementById('account-btn');
    let isLoggedIn = false;
    const coinsBtn = document.getElementById('coins-btn');
    const coinsOverlay = document.createElement('div');
    const coinsMenu = document.createElement('div');
    coinsMenu.className = 'coins-menu';
    coinsMenu.innerHTML = `
        <div class="coins-menu-content">
            <div class="current-credits">
                <h3>Current Balance</h3>
                <span class="credits-count">0</span>
                <span class="credits-label">credits</span>
            </div>
            <h2>Add Credits</h2>
            <div class="credit-options">
                <button data-credits="20">20 Credits</button>
                <button data-credits="50">50 Credits</button>
                <button data-credits="100">100 Credits</button>
            </div>
            <button class="close-coins-menu">Close</button>
        </div>
    `;
    document.querySelector('.phone-container').appendChild(coinsMenu);


    let currentUser = null;
    document.getElementById('coins-btn').addEventListener('click', () => {
        if (isLoggedIn) {
            const currentCoins = document.querySelector('.info-value').textContent;
            coinsMenu.querySelector('.credits-count').textContent = currentCoins;
            coinsMenu.classList.add('visible');
            currentUser = Object.keys(VALID_CREDENTIALS).find(
                username => VALID_CREDENTIALS[username].name === document.querySelector('.profile-name').textContent
            );
        }
    });

    coinsMenu.querySelector('.close-coins-menu').addEventListener('click', () => {
        coinsMenu.classList.remove('visible');
    });
    
    coinsMenu.querySelector('.credit-options').addEventListener('click', (e) => {
        if (e.target.matches('[data-credits]')) {
            const credits = parseInt(e.target.dataset.credits);
            
            if (currentUser) {
                const userData = VALID_CREDENTIALS[currentUser];
                const userRole = userData.role;
                
                let price;
                if (userRole === 'Student') {
                    price = credits === 20 ? '-2.99€' : 
                            credits === 50 ? '-7.99€' : 
                            credits === 100 ? '-12.99€' : '';
                } else {
                    price = credits === 20 ? '-3.99€' : 
                            credits === 50 ? '-9.99€' : 
                            credits === 100 ? '-17.99€' : '';
                }
    
                userData.coins += credits;
                updateProfilePage(userData);
                coinsMenu.querySelector('.credits-count').textContent = userData.coins; // Update the counter
                showPriceAnimation(price);
                coinsMenu.classList.remove('visible');
            }
        }
    });

    // Login credentials
    const VALID_CREDENTIALS = {
        'cristi123': {
            name: 'Cristian Taietu',
            role: 'Administrator',
            memberSince: 'November 2024',
            coins: 30,
            status: 'Active',
            profilePicture: 'selfie.jpg'
        },
        'jike37': {
            name: 'Jike Li',
            role: 'Developer',
            memberSince: 'December 2024',
            coins: 0,
            status: 'Active',
            profilePicture: 'jike.jpg'
        },
        'LUTStudent': {
            name: 'Random LUT Student',
            role: 'Student',
            memberSince: 'December 2024',
            coins: 350,
            status: 'Authenticated',
            profilePicture: 'student.jpg'
        }
    };

    const updateProfilePage = (userData) => {
        document.querySelector('.profile-name').textContent = userData.name;
        document.querySelector('.profile-image img').src = userData.profilePicture;
        
        const infoValues = document.querySelectorAll('.info-value');
        infoValues[0].textContent = userData.coins;
        infoValues[1].textContent = userData.role;
        infoValues[2].textContent = userData.memberSince;
        infoValues[3].textContent = userData.status;
    };
    

    // Clock update function
    function updateClock() {
        const clock = document.getElementById('clock');
        if (clock) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            clock.textContent = `${hours}:${minutes}`;
        }
    }

    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);

    // Initial animation sequence
    setTimeout(() => {
        if (container) {
            container.style.opacity = '0';
            container.style.transition = 'opacity 1s';
            
            setTimeout(() => {
                container.style.display = 'none';
                if (dashboard) {
                    dashboard.style.display = 'block';
                    void dashboard.offsetWidth; // Trigger reflow
                    dashboard.classList.add('visible');
                }
            }, 1000);
        }
    }, 4000);

    // Event Handlers
    accountBtn?.addEventListener('click', () => {
        if (isLoggedIn) {
            showProfilePage();
        } else {
            if (dashboard && loginPage) {
                dashboard.style.display = 'none';
                dashboard.classList.remove('visible');
                loginPage.style.display = 'block';
                loginPage.style.visibility = 'visible';
                loginPage.style.opacity = '1';
            }
        }
    });

    
    function showPriceAnimation(price) {
        const priceAnimation = document.createElement('div');
        priceAnimation.className = 'price-animation';
        priceAnimation.textContent = price;
        document.body.appendChild(priceAnimation);

        setTimeout(() => {
            priceAnimation.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(priceAnimation);
            }, 1000);
        }, 1500);
    }

    function createFeedbackPage() {
        const feedbackPage = document.createElement('div');
        feedbackPage.className = 'feedback-page';
        feedbackPage.innerHTML = `
            <div class="feedback-container">
                <button id="close-feedback" class="close-feedback">Close</button>
                <h2>We Value Your Feedback</h2>
                <form id="feedback-form">
                    <textarea id="feedback-message" placeholder="What's wrong? Please describe your issue..." required></textarea>
                    <button type="submit">Submit Feedback</button>
                </form>
            </div>
        `;
        document.querySelector('.phone-container').appendChild(feedbackPage);
        return feedbackPage;
    }

    document.querySelector('.feedback-icon')?.addEventListener('click', () => {
    const existingFeedbackPage = document.querySelector('.feedback-page');
    if (existingFeedbackPage) {
        existingFeedbackPage.classList.add('visible');
    } else {
        const feedbackPage = createFeedbackPage();
        
        // Close feedback page
        document.getElementById('close-feedback').addEventListener('click', () => {
            feedbackPage.classList.remove('visible');
        });

        // Handle feedback submission
        document.getElementById('feedback-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const message = document.getElementById('feedback-message').value.trim();
            
            if (message) {
                const currentUser = document.querySelector('.profile-name').textContent;
                const currentTime = new Date().toLocaleString();
                const feedbackEntry = `${currentUser}: ${currentTime}: ${message}`;

                console.log(feedbackEntry);
                
                // Clear the message and hide the page
                document.getElementById('feedback-message').value = '';
                feedbackPage.classList.remove('visible');
            }
        });
    }
});



    teamButton?.addEventListener('click', () => {
        teamPage?.classList.add('visible');
    });

    closeTeam?.addEventListener('click', () => {
        teamPage?.classList.remove('visible');
    });
    
    const showProfilePage = () => {
        const profilePage = document.querySelector('.profile-page');
        if (profilePage) {
            profilePage.style.display = 'block';
            void profilePage.offsetWidth;
            profilePage.classList.add('visible');
        }
    };

    const showError = () => {
        const existingError = document.querySelector('.error-message');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Invalid login credentials. Please try again.';
        loginForm.appendChild(errorDiv);

        const passwordInput = document.getElementById('password');
        if (passwordInput) passwordInput.value = '';
    };

    const showDashboard = () => {
        if (loginPage && dashboard) {
            loginPage.style.opacity = '0';
            loginPage.style.visibility = 'hidden';
            
            setTimeout(() => {
                loginPage.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.classList.add('visible');
            }, 500);
        }
    };


    // Form handlers
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        
        const username = usernameInput ? usernameInput.value : '';
        const password = passwordInput ? passwordInput.value : '';
    
        if (VALID_CREDENTIALS[username] && password === 'group27') {
            const userData = VALID_CREDENTIALS[username];
            isLoggedIn = true;
            updateProfilePage(userData);
            showDashboard();
        } else {
            showError();
        }
    });
    

    document.getElementById('close-profile')?.addEventListener('click', () => {
        const profilePage = document.querySelector('.profile-page');
        if (profilePage) {
            profilePage.classList.remove('visible');
            setTimeout(() => {
                profilePage.style.display = 'none';
            }, 500);
        }
    });

    skipLogin.addEventListener('click', () => {
        const defaultUser = VALID_CREDENTIALS['cristi123'];
        updateProfilePage(defaultUser);
        showDashboard();
    });

    // Menu handlers
    document.getElementById('photoai-btn')?.addEventListener('click', () => {
        console.log('PhotoAI clicked');
    });

    document.getElementById('videoai-btn')?.addEventListener('click', () => {
        console.log('VideoAI clicked');
    });

    document.getElementById('miscai-btn')?.addEventListener('click', () => {
        console.log('MiscellaneousAI clicked');
    });

    document.getElementById('logo-btn')?.addEventListener('click', showDashboard);
});

