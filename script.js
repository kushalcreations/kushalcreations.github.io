const scrollProgress = document.getElementById('scroll-progress');
// Only set style if element exists and scrollPercent is defined
if (scrollProgress && typeof scrollPercent !== 'undefined') {
    scrollProgress.style.width = scrollPercent + '%';
}

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Keyboard shortcut: Ctrl/Cmd + Shift + T
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    setTheme(theme) {
        // Add transition class to prevent flashing
        document.body.classList.add('theme-switching');
        
        // Set theme
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update icon
        this.updateIcon(theme);
        
        // Save to localStorage
        localStorage.setItem('theme', theme);
        
        // Remove transition class after a brief delay
        setTimeout(() => {
            document.body.classList.remove('theme-switching');
        }, 100);
        
        // Add transition animation
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Show notification
        this.showThemeNotification(newTheme);
    }

    updateIcon(theme) {
        this.themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    showThemeNotification(theme) {
        const message = `Switched to ${theme} mode`;
        showNotification(message, 'info');
    }
}

// Enhanced Scroll Animation Controller
class ScrollAnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
        this.createScrollProgressBar();
    }

    init() {
        this.setupScrollObserver();
        this.setupStaggeredAnimations();
        this.setupScrollProgress();
        this.addTypingEffect();
    }

    setupScrollObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                        this.triggerSpecificAnimations(entry.target);
                    }, index * 100);
                }
            });
        }, this.observerOptions);

        // Observe all animatable elements
        const elements = document.querySelectorAll(`
            .section-title,
            .section-subtitle,
            .skill-category,
            .project-card,
            .stat-item,
            .about-text,
            .contact-item,
            .hero-content
        `);

        elements.forEach((el, index) => {
            el.classList.add('scroll-reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    setupStaggeredAnimations() {
        // Add staggered animations to skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            item.classList.add(`stagger-${(index % 6) + 1}`);
        });

        // Add staggered animations to tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.3}s`;
        });
    }

    triggerSpecificAnimations(element) {
        if (element.classList.contains('section-title')) {
            element.classList.add('animate');
        }
        
        if (element.classList.contains('project-card')) {
            element.classList.add('scale-in');
        }
        
        if (element.classList.contains('stat-item')) {
            this.animateCounter(element);
        }
    }

    animateCounter(element) {
        const counter = element.querySelector('h4');
        const target = counter.textContent;
        const isNumber = !isNaN(parseFloat(target));
        
        if (isNumber) {
            const targetNum = parseFloat(target);
            let current = 0;
            const increment = targetNum / 60; // 1 second animation at 60fps
            
            const updateCounter = () => {
                current += increment;
                if (current < targetNum) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            requestAnimationFrame(updateCounter);
        }
    }

    createScrollProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.classList.add('scroll-progress');
        document.body.appendChild(progressBar);
    }

    setupScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return; // Prevent error if progressBar is not found
        
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    addTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.add('typing-animation');
        }
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Initialize scroll animations
const scrollController = new ScrollAnimationController();

// Add page load animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Enhanced page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.opacity = '1';
        }, 500);
    }, 1000);
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            
            // Custom smooth scroll with easing
            const scrollToTarget = (start, end, duration) => {
                const startTime = performance.now();
                
                const scroll = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out-cubic)
                    const ease = 1 - Math.pow(1 - progress, 3);
                    
                    window.scrollTo(0, start + (end - start) * ease);
                    
                    if (progress < 1) {
                        requestAnimationFrame(scroll);
                    }
                };
                
                requestAnimationFrame(scroll);
            };
            
            scrollToTarget(window.pageYOffset, offsetTop, 800);
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:kushal.kumawat987@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    this.reset();
    
    // Show success message
    showNotification('Message sent! Your email client should open now.', 'success');
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content
    const icon = getNotificationIcon(type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styling
    const bgColor = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    }[type] || '#3b82f6';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 500;
        max-width: 300px;
    `;
    
    // Add styles for notification content
    const style = document.createElement('style');
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-content i {
            font-size: 1.1rem;
        }
    `;
    if (!document.querySelector('.notification-styles')) {
        style.className = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1500); // Start after loading
}

// Initialize typing animation
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeWriter(heroSubtitle, originalText, 150);
}

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Copy email to clipboard with enhanced feedback
function copyEmail() {
    const email = 'kushal.kumawat987@gmail.com';
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showNotification('Email copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(email);
        });
    } else {
        fallbackCopyTextToClipboard(email);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Email copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy email', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }
    
    switch(e.key.toLowerCase()) {
        case 'h':
            if (!e.ctrlKey && !e.metaKey) {
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 'a':
            if (!e.ctrlKey && !e.metaKey) {
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 's':
            if (!e.ctrlKey && !e.metaKey) {
                document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 'p':
            if (!e.ctrlKey && !e.metaKey) {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 'c':
            if (!e.ctrlKey && !e.metaKey) {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
            break;
        case 'escape':
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            break;
    }
});

// Performance optimization - lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add smooth reveal animations
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Auto-detect system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            themeManager.setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Initialize with system theme if no preference is saved
if (!localStorage.getItem('theme')) {
    themeManager.setTheme(detectSystemTheme());
}

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        // Add ripple styles
        const style = document.createElement('style');
        style.textContent = `
            .btn { position: relative; overflow: hidden; }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        if (!document.querySelector('.ripple-styles')) {
            style.className = 'ripple-styles';
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Console message for developers
console.log(`
🚀 Welcome to Kushal's Portfolio!
👨‍💻 Built with vanilla HTML, CSS, and JavaScript

🎨 Theme Features:
- Click the moon/sun icon to toggle themes
- Keyboard shortcut: Ctrl/Cmd + Shift + T
- Auto-detects your system preference
- Smooth transitions between themes

⌨️ Keyboard shortcuts:
- Press 'h' to go to Home
- Press 'a' to go to About
- Press 's' to go to Skills
- Press 'p' to go to Projects  
- Press 'c' to go to Contact
- Press 'Esc' to close mobile menu

📧 Contact: kushal.kumawat987@gmail.com
🔗 GitHub: https://github.com/kushalcreations
`);

// Add Easter egg for theme switching
let themeToggleCount = 0;
const originalToggleTheme = themeManager.toggleTheme.bind(themeManager);

// Enhanced theme transition with animation
themeManager.toggleTheme = function() {
    themeToggleCount++;
    
    // Add transition class
    document.body.classList.add('theme-switching');
    
    // Trigger theme change
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Add visual feedback
    const icon = document.getElementById('theme-icon');
    icon.style.transform = 'rotate(360deg) scale(1.2)';
    
    setTimeout(() => {
        document.body.classList.remove('theme-switching');
        icon.style.transform = '';
    }, 600);
    
    // Show notification
    this.showThemeNotification(newTheme);
    
    // Easter eggs
    if (themeToggleCount === 10) {
        showNotification('🎉 Theme Toggle Master! You\'ve switched themes 10 times!', 'success');
    } else if (themeToggleCount === 25) {
        showNotification('🌟 Theme Switching Legend! 25 switches!', 'success');
    }
};

