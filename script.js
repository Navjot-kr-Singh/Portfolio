// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});



// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
    
    // Update scroll progress
    updateScrollProgress();
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    }
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typewriter Effect for Hero Name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    const heroName = document.querySelector('.typewriter');
    if (heroName) {
        const text = heroName.getAttribute('data-text') || heroName.textContent;
        typeWriter(heroName, text, 150);
    }
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add animation classes to elements
function initScrollAnimations() {
    // Animate section titles
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Animate skill categories
    document.querySelectorAll('.skill-category').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Animate project cards
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // Animate timeline items
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('animate-slide-left');
        } else {
            el.classList.add('animate-slide-right');
        }
        el.style.animationDelay = `${index * 0.3}s`;
        observer.observe(el);
    });

    // Animate certification cards
    document.querySelectorAll('.cert-card').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // Animate about stats
    document.querySelectorAll('.stat-card').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Particle Background Animation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#00ffff' : '#00ff88'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Skill Badge Hover Effects
function initSkillBadges() {
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0, 255, 255, 0.3)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#00ffff'};
        color: #0a0a0a;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        box-shadow: 0 5px 20px rgba(0, 255, 255, 0.3);
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    });
}

// Load More Projects Functionality
function initLoadMoreProjects() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    
    if (loadMoreBtn && hiddenProjects.length > 0) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                // Show hidden projects with staggered animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('show');
                        // Add scroll animation observer for the newly shown projects
                        observer.observe(project);
                    }, index * 200); // 200ms delay between each project
                });
                
                // Hide the load more button after showing all projects
                setTimeout(() => {
                    this.style.opacity = '0';
                    this.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        this.style.display = 'none';
                    }, 300);
                }, hiddenProjects.length * 200 + 500);
                
                // Show success notification
                showNotification('All projects loaded successfully!', 'success');
                
            }, 1000);
        });
    }
}

// Function to add new project cards (example implementation)
function addNewProjectCards(projectsData) {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card animate-on-scroll';
        projectCard.style.animationDelay = `${index * 0.2}s`;
        
        projectCard.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <div class="project-description">
                <p>${project.description}</p>
            </div>
            <div class="project-features">
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="project-buttons">
                <a href="${project.githubLink}" class="btn btn-primary" target="_blank">
                    <i class="fab fa-github"></i>
                    GitHub
                </a>
                <a href="${project.demoLink}" class="btn btn-secondary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    ${project.demoText || 'Live Demo'}
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
        observer.observe(projectCard);
    });
}

// Resume Download Function
function downloadResume() {
    try {
        // Create a link element to download the actual resume file
        const link = document.createElement('a');
        link.href = './documents/JAPJOTSINGH_resume.docx';
        link.download = 'JAPJOTSINGH_resume.docx';
        link.style.display = 'none';
        
        // Add to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification('Resume downloaded successfully!', 'success');
    } catch (error) {
        console.error('Error downloading resume:', error);
        showNotification('Error downloading resume. Please try again.', 'error');
    }
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Matrix Digital Rain Effect (Enhanced)
function createMatrixRain() {
    const matrixBg = document.querySelector('.matrix-bg');
    if (!matrixBg) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.opacity = '0.05';
    canvas.style.pointerEvents = 'none';
    
    matrixBg.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Loading Screen

function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-image"></div>
            <div class="loading-logo">NKS</div>
            <div class="loading-text">Initializing Portfolio...</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0a0a0a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const loadingCSS = `
        .loading-content {
            text-align: center;
        }

        /* NEW - Circular Image Above Logo */
        .loading-image {
            width: 120px;
            height: 120px;
            margin: 0 auto 1rem auto;
            border-radius: 50%;
            background-image: url('./assets/images/logo.png'); /* <-- Replace with your image */
            background-size: cover;
            background-position: center;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
            animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.4); }
            50% { box-shadow: 0 0 35px rgba(0, 255, 255, 0.7); }
        }

        .loading-logo {
            font-family: 'Orbitron', monospace;
            font-size: 4rem;
            font-weight: 900;
            color: #00ffff;
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            margin-bottom: 1rem;
            animation: pulse 2s ease-in-out infinite;
        }
        .loading-text {
            color: #00ff88;
            font-size: 1.2rem;
            margin-bottom: 2rem;
            font-family: 'Poppins', sans-serif;
        }
        .loading-bar {
            width: 300px;
            height: 4px;
            background: #333;
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        .loading-progress {
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #00ffff, #00ff88);
            animation: loadingProgress 3s ease-out forwards;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        @keyframes loadingProgress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = loadingCSS;
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
                loadingStyle.parentNode.removeChild(loadingStyle);
            }
        }, 500);
    }, 3000);
}

// Enhanced Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const isDecimal = finalValue.includes('.');
                const numericValue = parseFloat(finalValue);
                
                let currentValue = 0;
                const increment = isDecimal ? numericValue / 50 : Math.ceil(numericValue / 50);
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    if (isDecimal) {
                        target.textContent = currentValue.toFixed(2);
                    } else {
                        target.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                    }
                }, 50);
                
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingScreen();
    
    setTimeout(() => {
        initScrollAnimations();
        initSkillBadges();
        initContactForm();
        initLoadMoreProjects();
        updateActiveNavLink();
        createParticles();
        createMatrixRain();
        animateStats();
    }, 100);
});

// Page Visibility API for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.querySelectorAll('.particles, .matrix-bg').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when page becomes visible
        document.querySelectorAll('.particles, .matrix-bg').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add Easter Egg - Konami Code
let konamiCode = [];
const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konami.length && 
        konamiCode.every((code, index) => code === konami[index])) {
        
        // Easter egg activated!
        showNotification('🎮 Konami Code activated! You found the easter egg!', 'success');
        
        // Add special effect
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

// Add rainbow animation for easter egg
const rainbowCSS = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = rainbowCSS;
document.head.appendChild(rainbowStyle);
