// script.js
// Interactive JavaScript for tibocin.xyz
// Purpose: Custom cursor, time display, animations, and interactive features
// Related components: HTML structure, CSS styling
// Tags: javascript, interactive, cursor, animations, terminal

// Custom cursor functionality
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.isMoving = false;
        this.rafId = null;
        this.init();
    }

    init() {
        // Throttled mouse movement for better performance
        let ticking = false;
        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    this.updateCursorPosition(e.clientX, e.clientY);
                    ticking = false;
                });
            }
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.3) translateZ(0)';
                this.cursor.style.background = 'var(--terminal-green)';
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1) translateZ(0)';
                this.cursor.style.background = 'var(--primary-green)';
            });
        });

        // Optimize cursor on mobile devices
        if (window.innerWidth <= 768) {
            this.cursor.style.width = '15px';
            this.cursor.style.height = '15px';
        }
    }

    updateCursorPosition(x, y) {
        // Use transform3d for hardware acceleration
        this.cursor.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
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
    new KeyboardShortcuts();
    new SmoothScrolling();
    new ChatWidget();
    
    console.log('🤖 Tibocin website loaded successfully!');
    console.log('🔗 Built with ❤️ for the Bitcoin community');
});

 