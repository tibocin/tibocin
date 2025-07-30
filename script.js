// script.js
// Interactive JavaScript for tibocin.xyz
// Purpose: Custom cursor, time display, animations, and interactive features
// Related components: HTML structure, CSS styling
// Tags: javascript, interactive, cursor, animations, terminal

// Custom cursor functionality
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.background = 'var(--terminal-green)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'var(--primary-green)';
            });
        });

        // Hide cursor on mobile devices
        if (window.innerWidth <= 768) {
            this.cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
        }
    }
}

// Time display functionality
class TimeDisplay {
    constructor() {
        this.timeElement = document.getElementById('current-time');
        this.init();
    }

    init() {
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
        this.timeElement.textContent = timeString;
    }
}

// Typing animation functionality
class TypingAnimation {
    constructor() {
        this.init();
    }

    init() {
        const typingElements = document.querySelectorAll('.typing-text');
        
        // Add typing effect to elements
        typingElements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            setTimeout(() => {
                this.typeText(element, text, 0);
            }, index * 200);
        });
    }

    typeText(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                this.typeText(element, text, index + 1);
            }, 30);
        }
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item');
        animatedElements.forEach(el => observer.observe(el));
    }
}

// Glitch effect functionality
class GlitchEffect {
    constructor() {
        this.init();
    }

    init() {
        const glitchElements = document.querySelectorAll('.logo');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glitch');
            });

            element.addEventListener('mouseleave', () => {
                element.classList.remove('glitch');
            });
        });
    }
}

// Terminal-style effects
class TerminalEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add terminal startup effect
        this.addTerminalStartup();
        
        // Add matrix-style background effect
        this.addMatrixEffect();
    }

    addTerminalStartup() {
        const body = document.body;
        body.style.opacity = '0';
        
        setTimeout(() => {
            body.style.transition = 'opacity 1s ease-in-out';
            body.style.opacity = '1';
        }, 100);
    }

    addMatrixEffect() {
        // Create matrix rain effect in background
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Particle system for background
class ParticleSystem {
    constructor() {
        this.init();
    }

    init() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.3';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.life = Math.random() * 100 + 50;
            }
            
            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life--;
                
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
                
                if (this.life <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.life = Math.random() * 100 + 50;
                }
            }
            
            draw() {
                ctx.fillStyle = `rgba(0, 255, 0, ${this.life / 150})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Keyboard shortcuts
class KeyboardShortcuts {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search (if implemented)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                // Add search functionality here
            }
            
            // Escape to clear any active states
            if (e.key === 'Escape') {
                document.activeElement.blur();
            }
        });
    }
}

// Smooth scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Chat Widget Functionality
class ChatWidget {
    constructor() {
        this.toggle = document.getElementById('chatToggle');
        this.container = document.getElementById('chatContainer');
        this.close = document.getElementById('chatClose');
        this.fullscreen = document.getElementById('chatFullscreen');
        this.isOpen = false;
        this.isFullscreen = false;
        this.init();
    }

    init() {
        // Toggle chat
        this.toggle.addEventListener('click', () => {
            this.toggleChat();
        });

        // Close chat
        this.close.addEventListener('click', () => {
            this.closeChat();
        });

        // Toggle fullscreen
        this.fullscreen.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                if (this.isFullscreen) {
                    this.exitFullscreen();
                } else {
                    this.closeChat();
                }
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeChat();
            }
        });

        // Add notification effect after 5 seconds
        setTimeout(() => {
            this.toggle.classList.add('has-notification');
        }, 5000);
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.container.classList.add('show');
        this.isOpen = true;
        this.toggle.classList.remove('has-notification');
        
        // Focus the iframe
        setTimeout(() => {
            const iframe = this.container.querySelector('iframe');
            if (iframe) {
                iframe.focus();
            }
        }, 300);
    }

    closeChat() {
        this.container.classList.remove('show');
        this.isOpen = false;
        this.exitFullscreen();
    }

    toggleFullscreen() {
        if (this.isFullscreen) {
            this.exitFullscreen();
        } else {
            this.enterFullscreen();
        }
    }

    enterFullscreen() {
        this.container.classList.add('fullscreen');
        this.isFullscreen = true;
        this.fullscreen.textContent = '⛶';
        this.fullscreen.title = 'Exit fullscreen';
        
        // Focus the iframe
        setTimeout(() => {
            const iframe = this.container.querySelector('iframe');
            if (iframe) {
                iframe.focus();
            }
        }, 100);
    }

    exitFullscreen() {
        this.container.classList.remove('fullscreen');
        this.isFullscreen = false;
        this.fullscreen.textContent = '⛶';
        this.fullscreen.title = 'Toggle fullscreen';
    }

    // Method to show notification
    showNotification() {
        this.toggle.classList.add('has-notification');
    }

    // Method to hide notification
    hideNotification() {
        this.toggle.classList.remove('has-notification');
    }

    // Method to enter fullscreen programmatically
    enterFullscreenMode() {
        if (this.isOpen) {
            this.enterFullscreen();
        } else {
            this.openChat();
            setTimeout(() => this.enterFullscreen(), 300);
        }
    }

    // Method to exit fullscreen programmatically
    exitFullscreenMode() {
        this.exitFullscreen();
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
    new TimeDisplay();
    new TypingAnimation();
    new ScrollAnimations();
    new GlitchEffect();
    new TerminalEffects();
    new ParticleSystem();
    new KeyboardShortcuts();
    new SmoothScrolling();
    new ChatWidget();
    
    console.log('🤖 Tibocin website loaded successfully!');
    console.log('🔗 Built with ❤️ for the Bitcoin community');
});

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .project-card, .skill-category, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .project-card.animate-in, .skill-category.animate-in, .contact-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style); 