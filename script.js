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



        // Login credentials
        const VALID_CREDENTIALS = {
            'cristi123': {
                name: 'Cristian Taietu',
                role: 'Administrator',
                memberSince: 'November 2024',
                coins: 0,
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
                coins: 0,
                status: 'Authenticated',
                profilePicture: 'student.jpg'
            },
            'VACA': {
                name: 'VACA',
                role: 'Student',
                memberSince: 'December 2024',
                coins: 10,
                status: 'Authenticated',
                profilePicture: 'vaca.jpg'
            }
        };

    let currentUser = null;

    document.getElementById('photoai-btn')?.addEventListener('click', () => {
        const existingPhotoAIPage = document.querySelector('.photoai-page');
        if (existingPhotoAIPage) {
            existingPhotoAIPage.classList.add('visible');
        } else {
            const photoAIPage = createPhotoAIPage();
            
            // Add close button handler
            document.querySelector('.close-photoai').addEventListener('click', () => {
                photoAIPage.classList.remove('visible');
            });
        }
    });

    document.getElementById('videoai-btn')?.addEventListener('click', () => {
        const existingVideoAIPage = document.querySelector('.videoai-page');
        if (existingVideoAIPage) {
            existingVideoAIPage.classList.add('visible');
        } else {
            const videoAIPage = createVideoAIPage();
            videoAIPage.classList.add('visible');
        }
    });

    const style = document.createElement('style');
style.textContent = `
    .miscai-page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #DED4E8;
        z-index: 3000;
        display: none;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    .miscai-page.visible {
        display: block;
        opacity: 1;
    }

    .miscai-page .photoai-option:nth-child(5), 
    .miscai-page .photoai-option:nth-child(6),
    .miscai-page .photoai-option:nth-child(7) {
        background-color: #F7DC6F;
        font-weight: bold;
        position: relative;
    }   

    .miscai-page .photoai-option:nth-child(5):after,
    .miscai-page .photoai-option:nth-child(6):after,
    .miscai-page .photoai-option:nth-child(7):after {
        font-size: 16px;
        margin-left: 5px;
        color: #FFD700;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
    }
    
`;
document.head.appendChild(style);

    document.getElementById('miscai-btn')?.addEventListener('click', () => {
        const existingMiscAIPage = document.querySelector('.miscai-page');
        if (existingMiscAIPage) {
            existingMiscAIPage.classList.add('visible');
        } else {
            const miscAIPage = createMiscAIPage();
            miscAIPage.classList.add('visible');
            
            // Add close button handler
            document.querySelector('.close-miscai').addEventListener('click', () => {
                miscAIPage.classList.remove('visible');
            });
        }
    });

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


    const updateProfilePage = (userData) => {
        document.querySelector('.profile-name').textContent = userData.name;
        document.querySelector('.profile-image img').src = userData.profilePicture;
        
        const infoValues = document.querySelectorAll('.info-value');
        infoValues[0].textContent = userData.coins;
        infoValues[1].textContent = userData.role;
        infoValues[2].textContent = userData.memberSince;
        infoValues[3].textContent = userData.status;
    };

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        // Log out logic here
        isLoggedIn = false;
        const profilePage = document.querySelector('.profile-page');
        profilePage.classList.remove('visible');
        profilePage.style.display = 'none';
        const dashboard = document.querySelector('.dashboard');
        dashboard.style.display = 'block';
        dashboard.classList.add('visible');
    });
    

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
function createPhotoAIPage() {
    const tools = [
        {
            name: "Photo Enhancer",
            description: "Enhance your photos with AI-powered image processing",
            creditsRequired: 0
        },
        {
            name: "Photo Compressor",
            description: "Compress your images while maintaining quality",
            creditsRequired: 0
        },
        {
            name: "Text From Image",
            description: "Extract text from any image using OCR technology",
            creditsRequired: 0
        },
        {
            name: "Font From Image",
            description: "Identify fonts used in images",
            creditsRequired: 0
        },
        {
            name: "Color From Image",
            description: "Extract color palettes from images",
            creditsRequired: 0
        },
        {
            name: "Remove Background",
            description: "Automatically remove image backgrounds",
            creditsRequired: 0
        },
        {
            name: "Remove Watermark",
            description: "Remove watermarks from images",
            creditsRequired: 1
        },
        {
            name: "Image Generation",
            description: "Generate images using AI",
            creditsRequired: 1
        }
    ];

    const photoAIPage = document.createElement('div');
    photoAIPage.className = 'photoai-page';
    photoAIPage.innerHTML = `
        <div class="photoai-container">
            <button class="close-photoai">Close</button>
            <h2>PhotoAI Tools</h2>
            <div class="photoai-options">
                ${tools.map(tool => `
                    <button class="photoai-option">
                        <span class="tool-name">${tool.name}</span>
                        <span class="tool-credits">${tool.creditsRequired} credit</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Create tool modal template
    const createToolModal = (tool) => {
        const modal = document.createElement('div');
        modal.className = 'tool-modal';
        modal.innerHTML = `
            <div class="tool-modal-content">
                <div class="tool-modal-header">
                    <h3 style="color: #3498db;">${tool.name}</h3>
                    <button class="close-modal">×</button>
                </div>
                <p class="tool-description">${tool.description}</p>
                <div class="upload-area">
                    <label for="image-upload" class="upload-label">
                        <span class="upload-icon">📁</span>
                        <span style="color: #3498db;">Click to upload or drag and drop</span>
                        <span class="upload-hint">PNG, JPG up to 10MB</span>
                    </label>
                    <input type="file" id="image-upload" accept="image/*" style="display: none;">
                </div>
                <div class="tool-footer">
                    <p class="credits-info">This action will cost ${tool.creditsRequired} credit</p>
                    <button class="process-button" disabled>Process Image</button>
                </div>
            </div>
        `;

        // Add event listeners for the modal
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        // File upload handling
        const fileInput = modal.querySelector('#image-upload');
        const processButton = modal.querySelector('.process-button');
        const uploadArea = modal.querySelector('.upload-area');

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleFileUpload(file, tool, processButton);
            }
        });

        // Drag and drop functionality
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) {
                handleFileUpload(file, tool, processButton);
            }
        });

        return modal;
    };

    // Handle file upload
    const handleFileUpload = (file, tool, processButton) => {
        if (file.type.startsWith('image/')) {
            if (file.size <= 10 * 1024 * 1024) { // 10MB limit
                processButton.disabled = false;
                processButton.addEventListener('click', () => {
                    processImage(file, tool);
                });
            } else {
                alert('File size should be less than 10MB');
            }
        } else {
            alert('Please upload an image file');
        }
    };

    // Process image function
    const processImage = (file, tool) => {
        // Check if user has enough credits
        const currentCredits = parseInt(document.querySelector('.info-value').textContent);
        if (currentCredits >= tool.creditsRequired) {
            // Here you would add the actual image processing logic
            console.log(`Processing ${file.name} with ${tool.name}`);

            if (tool.creditsRequired < 1) {
                showPriceAnimation(`This worked!`);
            }
            
            // Update credits
            const userData = VALID_CREDENTIALS[currentUser];
            if (userData) {
                userData.coins -= tool.creditsRequired;
                updateProfilePage(userData);
                if (tool.creditsRequired < 1) {
                    showPriceAnimation(`This worked!`);
                } else {
                    showPriceAnimation(`-${tool.creditsRequired} credit`);
                }                
            }
        } else {
            alert('Not enough credits! Please add more credits to use this tool.');
        }
    };

    // Add click handlers for each tool button
    const toolButtons = photoAIPage.querySelectorAll('.photoai-option');
    toolButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const tool = tools[index];
            const modal = createToolModal(tool);
            document.body.appendChild(modal);
            setTimeout(() => modal.classList.add('visible'), 10);
        });
    });

    // Add close button handler
    const closePhotoAiButton = photoAIPage.querySelector('.close-photoai');
    closePhotoAiButton.addEventListener('click', () => {
        photoAIPage.classList.remove('visible');
    });

    document.querySelector('.phone-container').appendChild(photoAIPage);
    return photoAIPage;
}

    function createVideoAIPage() {
        const tools = [
            {
                name: "Merge Videos Together",
                description: "Submit 2 videos, their order and let the AI do the quick work for you!",
                creditsRequired: 0
            },
            {
                name: "Add Voice Over",
                description: "Add Voice Over to an existing video",
                creditsRequired: 0
            },
            {
                name: "Add Text to Video",
                description: "Add Text and set for how many seconds you want a text to appear.",
                creditsRequired: 0
            },
            {
                name: "Video Compressor",
                description: "Compress videos while maintaining quality",
                creditsRequired: 0
            },
            {
                name: "Audio Enhancer",
                description: "Remove video backgrounds automatically and enhance audio quality",
                creditsRequired: 0
            },
            {
                name: "Video Stabilization",
                description: "Stabilize shaky video footage",
                creditsRequired: 1
            },
            {
                name: "Automatic Video Subtitles",
                description: "Add automatic subtitles to any video. Only works with English.",
                creditsRequired: 1
            }
        ];

        const videoAIPage = document.createElement('div');
        videoAIPage.className = 'videoai-page';
        videoAIPage.innerHTML = `
            <div class="videoai-container">
                <button class="close-videoai">Close</button>
                <h2>VideoAI Tools</h2>
                <div class="videoai-options">
                    ${tools.map(tool => `
                        <button class="videoai-option">
                            <span class="tool-name">${tool.name}</span>
                            <span class="tool-credits">${tool.creditsRequired} credit</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        const createToolModal = (tool) => {
            const modal = document.createElement('div');
            modal.className = 'tool-modal';
            modal.innerHTML = `
                <div class="tool-modal-content">
                    <div class="tool-modal-header">
                        <h3 style="color: #3498db;">${tool.name}</h3>
                        <button class="close-modal">×</button>
                    </div>
                    <p class="tool-description">${tool.description}</p>
                    <div class="upload-area">
                        <label for="video-upload" class="upload-label">
                            <span class="upload-icon">📁</span>
                            <span style="color: #3498db;">Click to upload or drag and drop</span>
                            <span class="upload-hint">MP4, MOV up to 100MB</span>
                        </label>
                        <input type="file" id="video-upload" accept="video/*" style="display: none;">
                    </div>
                    <div class="tool-footer">
                        <p class="credits-info">This action will cost ${tool.creditsRequired} credit</p>
                        <button class="process-button" disabled>Process Video</button>
                    </div>
                </div>
            `;

            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => modal.remove());

            const fileInput = modal.querySelector('#video-upload');
            const processButton = modal.querySelector('.process-button');
            const uploadArea = modal.querySelector('.upload-area');

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) handleFileUpload(file, tool, processButton);
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file, tool, processButton);
            });

            return modal;
        };

        const handleFileUpload = (file, tool, processButton) => {
            if (file.type.startsWith('video/')) {
                if (file.size <= 100 * 1024 * 1024) {
                    processButton.disabled = false;
                    processButton.addEventListener('click', () => {
                        processVideo(file, tool);
                    });
                } else {
                    alert('File size should be less than 100MB');
                }
            } else {
                alert('Please upload a video file');
            }
        };

        const processVideo = (file, tool) => {
            const currentCredits = parseInt(document.querySelector('.info-value').textContent);
            if (currentCredits >= tool.creditsRequired) {
                console.log(`Processing ${file.name} with ${tool.name}`);

                if (tool.creditsRequired < 1) {
                    showPriceAnimation(`This worked!`);
                }
                const userData = VALID_CREDENTIALS[currentUser];
                if (userData) {
                    userData.coins -= tool.creditsRequired;
                    updateProfilePage(userData);
                    if (tool.creditsRequired < 1) {
                        showPriceAnimation(`This worked!`);
                    } else {
                        showPriceAnimation(`-${tool.creditsRequired} credit`);
                    }                
                }
            } else {
                alert('Not enough credits! Please add more credits to use this tool.');
            }
        };

        const toolButtons = videoAIPage.querySelectorAll('.videoai-option');
        toolButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const tool = tools[index];
                const modal = createToolModal(tool);
                document.body.appendChild(modal);
                setTimeout(() => modal.classList.add('visible'), 10);
            });
        });

        const closeVideoAiButton = videoAIPage.querySelector('.close-videoai');
        closeVideoAiButton.addEventListener('click', () => {
            videoAIPage.classList.remove('visible');
        });

        document.querySelector('.phone-container').appendChild(videoAIPage);
        return videoAIPage;
    }

    function createMiscAIPage() {
        const tools = [
            {
                name: "Social Media Downloader",
                description: "Download videos from TikTok, Instagram, X, Facebook or YouTube",
                creditsRequired: 0
            },
            {
                name: "File Converter",
                description: "Convert files between different formats",
                creditsRequired: 0
            },
            {
                name: "File Fixer",
                description: "Repair and fix corrupted files",
                creditsRequired: 0
            },
            {
                name: "PDF Summarizer",
                description: "Get quick summaries of PDF documents",
                creditsRequired: 0
            },
            {
                name: "Audio Transcription",
                description: "Convert audio to text with AI-powered transcription",
                creditsRequired: 1
            },
            {
                name: "Document Translation",
                description: "Translate documents while maintaining formatting",
                creditsRequired: 1
            },
            {
                name: "Video Summarizer",
                description: "Summarize videos with AI-powered summarization",
                creditsRequired: 2
            }
        ];
    
        const miscAIPage = document.createElement('div');
        miscAIPage.className = 'miscai-page';  // Reusing existing styles
        miscAIPage.innerHTML = `
            <div class="photoai-container">
                <button class="close-photoai">Close</button>
                <h2>MiscellaneousAI Tools</h2>
                <div class="photoai-options">
                    ${tools.map(tool => `
                        <button class="photoai-option">
                            <span class="tool-name">${tool.name}</span>
                            <span class="tool-credits">${tool.creditsRequired} credit${tool.creditsRequired !== 1 ? 's' : ''}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    
        // Create specialized modal content based on tool type
        const createSpecializedContent = (tool) => {
            switch (tool.name) {
                case "Social Media Downloader":
                    return `
                        <div class="input-area">
                            <input type="text" class="social-media-url" placeholder="Paste your social media URL here">
                            <div class="supported-platforms">
                                <span>Supported: TikTok, Instagram, X, Facebook, YouTube</span>
                            </div>
                        </div>
                    `;
                case "File Converter":
                    return `
                        <div class="upload-area">
                            <label for="file-upload" class="upload-label">
                                <span class="upload-icon">📁</span>
                                <span style="color: #3498db;">Click to upload or drag and drop</span>
                                <span class="upload-hint">Select any file to convert</span>
                            </label>
                            <input type="file" id="file-upload" style="display: none;">
                        </div>
                        <div class="conversion-options" style="margin: 15px 0;">
                            <label style="color: #3498db;">Convert to:</label>
                            <select class="convert-format" style="margin-left: 10px; padding: 5px;">
                                <option value="">Select format...</option>
                                <option value="pdf">PDF</option>
                                <option value="docx">DOCX</option>
                                <option value="jpg">JPG</option>
                                <option value="png">PNG</option>
                                <option value="mp3">MP3</option>
                                <option value="mp4">MP4</option>
                            </select>
                        </div>
                    `;
                case "PDF Summarizer":
                case "File Fixer":
                    return `
                        <div class="upload-area">
                            <label for="file-upload" class="upload-label">
                                <span class="upload-icon">📁</span>
                                <span style="color: #3498db;">Click to upload or drag and drop</span>
                                <span class="upload-hint">${tool.name === "PDF Summarizer" ? "PDF files only" : "Select file to repair"}</span>
                            </label>
                            <input type="file" id="file-upload" ${tool.name === "PDF Summarizer" ? 'accept=".pdf"' : ''} style="display: none;">
                        </div>
                    `;
                default:
                    return `
                        <div class="upload-area">
                            <label for="file-upload" class="upload-label">
                                <span class="upload-icon">📁</span>
                                <span style="color: #3498db;">Click to upload or drag and drop</span>
                                <span class="upload-hint">Select file to process</span>
                            </label>
                            <input type="file" id="file-upload" style="display: none;">
                        </div>
                    `;
            }
        };
    
        // Create tool modal template
        const createToolModal = (tool) => {
            const modal = document.createElement('div');
            modal.className = 'tool-modal';
            modal.innerHTML = `
                <div class="tool-modal-content">
                    <div class="tool-modal-header">
                        <h3 style="color: #3498db;">${tool.name}</h3>
                        <button class="close-modal">×</button>
                    </div>
                    <p class="tool-description">${tool.description}</p>
                    ${createSpecializedContent(tool)}
                    <div class="tool-footer">
                        <p class="credits-info">This action will cost ${tool.creditsRequired} credit${tool.creditsRequired !== 1 ? 's' : ''}</p>
                        <button class="process-button" disabled>Process</button>
                    </div>
                </div>
            `;
    
            // Add event listeners
            setupModalEventListeners(modal, tool);
    
            return modal;
        };
    
        // Setup modal event listeners
        const setupModalEventListeners = (modal, tool) => {
            const closeBtn = modal.querySelector('.close-modal');
            const processButton = modal.querySelector('.process-button');
            
            closeBtn.addEventListener('click', () => modal.remove());
    
            if (tool.name === "Social Media Downloader") {
                const urlInput = modal.querySelector('.social-media-url');
                urlInput.addEventListener('input', (e) => {
                    const url = e.target.value;
                    processButton.disabled = !isValidSocialMediaUrl(url);
                });
            } else {
                const fileInput = modal.querySelector('#file-upload');
                const uploadArea = modal.querySelector('.upload-area');
                
                setupFileUploadListeners(fileInput, uploadArea, processButton, tool);
            }
    
            processButton.addEventListener('click', () => {
                processContent(tool, modal);
            });
        };
    
        // Validate social media URLs
        const isValidSocialMediaUrl = (url) => {
            const platforms = [
                /^https?:\/\/(www\.)?(tiktok\.com)/,
                /^https?:\/\/(www\.)?(instagram\.com)/,
                /^https?:\/\/(www\.)?(twitter\.com|x\.com)/,
                /^https?:\/\/(www\.)?(facebook\.com)/,
                /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/
            ];
            return platforms.some(platform => platform.test(url));
        };
    
        // Setup file upload listeners
        const setupFileUploadListeners = (fileInput, uploadArea, processButton, tool) => {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) handleFileUpload(file, processButton, tool);
            });
    
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
    
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
    
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file, processButton, tool);
            });
        };
    
        // Handle file upload
        const handleFileUpload = (file, processButton, tool) => {
            if (tool.name === "PDF Summarizer" && !file.type.includes('pdf')) {
                alert('Please upload a PDF file');
                return;
            }
    
            processButton.disabled = false;
        };
    
        // Process content based on tool type
        const processContent = (tool, modal) => {
            const currentCredits = parseInt(document.querySelector('.info-value').textContent);
            if (currentCredits < tool.creditsRequired) {
                alert('Not enough credits! Please add more credits to use this tool.');
                return;
            }
    
            // Here you would add the actual processing logic for each tool
            console.log(`Processing with ${tool.name}`);
    
            // Update credits
            const userData = VALID_CREDENTIALS[currentUser];
            if (userData) {
                userData.coins -= tool.creditsRequired;
                updateProfilePage(userData);
                if (tool.creditsRequired > 0) {
                    showPriceAnimation(`-${tool.creditsRequired} credit${tool.creditsRequired !== 1 ? 's' : ''}`);
                } else {
                    showPriceAnimation('This worked!')
                }
            }
    
            // Close modal after processing
            setTimeout(() => modal.remove(), 1500);
        };
    
        // Add click handlers for each tool button
        const toolButtons = miscAIPage.querySelectorAll('.photoai-option');
        toolButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const tool = tools[index];
                const modal = createToolModal(tool);
                document.body.appendChild(modal);
                setTimeout(() => modal.classList.add('visible'), 10);
            });
        });
    
        // Add close button handler
        const closeMiscAiButton = miscAIPage.querySelector('.close-photoai');
        closeMiscAiButton.addEventListener('click', () => {
            miscAIPage.classList.remove('visible');
        });
    
        document.querySelector('.phone-container').appendChild(miscAIPage);
        return miscAIPage;
    }


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
        const profilePage = document.querySelector('.profile-page');
        if (!profilePage || !profilePage.classList.contains('visible')) {
                loginPage.style.display = 'none';
                dashboard.style.display = 'block';
                dashboard.classList.add('visible');
        }
    };

    document.querySelector('.nav-icon#logo-btn')?.addEventListener('click', showDashboard);
    
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

    document.getElementById('logo-btn')?.addEventListener('click', showDashboard);
});