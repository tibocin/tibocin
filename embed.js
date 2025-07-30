// embed.js
// Tibocin Chat Widget Embed Script
// Purpose: Standalone script to embed the Tibocin Bitcoin Bot on any website
// Usage: Add this script to any website to include the chat widget
// Tags: embed, chat, widget, bitcoin, bot

(function() {
    'use strict';

    // Check if widget is already loaded
    if (window.tibocinChatWidget) {
        return;
    }

    // Create widget HTML
    const widgetHTML = `
        <div class="tibocin-chat-widget">
            <div class="tibocin-chat-toggle" id="tibocinChatToggle">
                🤖
            </div>
            
            <div class="tibocin-chat-container" id="tibocinChatContainer">
                <div class="tibocin-chat-header">
                    <div class="tibocin-chat-title">Tibocin Bitcoin Bot</div>
                    <div class="tibocin-chat-controls">
                        <button class="tibocin-chat-fullscreen" id="tibocinChatFullscreen" title="Toggle fullscreen">⛶</button>
                        <button class="tibocin-chat-close" id="tibocinChatClose" title="Close chat">×</button>
                    </div>
                </div>
                <iframe 
                    src="https://tibocin-beep-boop.hf.space"
                    class="tibocin-chat-iframe"
                    frameborder="0"
                    width="100%"
                    height="100%"
                ></iframe>
            </div>
        </div>
    `;

    // Create widget styles
    const widgetStyles = `
        .tibocin-chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: 'Courier New', monospace;
        }

        .tibocin-chat-toggle {
            width: 60px;
            height: 60px;
            background: #00ff00;
            border: 2px solid #00ff00;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            transition: all 0.3s ease;
            color: #000;
            font-size: 24px;
        }

        .tibocin-chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
        }

        .tibocin-chat-container {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 400px;
            height: 500px;
            background: #1a1a1a;
            border: 2px solid #00ff00;
            border-radius: 10px;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.3);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        .tibocin-chat-header {
            background: #333;
            padding: 15px;
            border-bottom: 1px solid #00ff00;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tibocin-chat-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .tibocin-chat-title {
            color: #00ff00;
            font-weight: bold;
            font-size: 14px;
        }

        .tibocin-chat-close {
            background: none;
            border: none;
            color: #00ff00;
            cursor: pointer;
            font-size: 18px;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tibocin-chat-fullscreen {
            background: none;
            border: none;
            color: #00ff00;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .tibocin-chat-fullscreen:hover {
            color: #39ff14;
            transform: scale(1.1);
        }

        .tibocin-chat-close:hover {
            color: #39ff14;
        }

        .tibocin-chat-iframe {
            flex: 1;
            border: none;
            background: #000;
        }

        .tibocin-chat-container.show {
            display: flex;
            animation: tibocinSlideIn 0.3s ease-out;
        }

        @keyframes tibocinSlideIn {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        .tibocin-chat-toggle.has-notification {
            animation: tibocinPulse 2s infinite;
        }

        @keyframes tibocinPulse {
            0% {
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            }
            50% {
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.6);
            }
            100% {
                box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
            }
        }

        /* Full-screen mode */
        .tibocin-chat-container.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100vw;
            height: 100vh;
            border-radius: 0;
            z-index: 10001;
        }

        .tibocin-chat-container.fullscreen .tibocin-chat-iframe {
            height: calc(100vh - 60px);
        }

        @media (max-width: 768px) {
            .tibocin-chat-container {
                width: calc(100vw - 40px);
                height: calc(100vh - 120px);
                right: 20px;
                left: 20px;
                bottom: 100px;
            }
            
            .tibocin-chat-container.fullscreen {
                width: 100vw;
                height: 100vh;
                right: 0;
                left: 0;
                bottom: 0;
            }
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = widgetStyles;
    document.head.appendChild(styleSheet);

    // Inject widget HTML
    const widgetContainer = document.createElement('div');
    widgetContainer.innerHTML = widgetHTML;
    document.body.appendChild(widgetContainer);

    // Chat Widget Class
    class TibocinChatWidget {
        constructor() {
            this.toggle = document.getElementById('tibocinChatToggle');
            this.container = document.getElementById('tibocinChatContainer');
            this.close = document.getElementById('tibocinChatClose');
            this.fullscreen = document.getElementById('tibocinChatFullscreen');
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

        // Public methods for external control
        show() {
            this.openChat();
        }

        hide() {
            this.closeChat();
        }

        showNotification() {
            this.toggle.classList.add('has-notification');
        }

        hideNotification() {
            this.toggle.classList.remove('has-notification');
        }

        // Fullscreen methods
        enterFullscreenMode() {
            if (this.isOpen) {
                this.enterFullscreen();
            } else {
                this.openChat();
                setTimeout(() => this.enterFullscreen(), 300);
            }
        }

        exitFullscreenMode() {
            this.exitFullscreen();
        }
    }

    // Initialize widget
    const chatWidget = new TibocinChatWidget();

    // Expose to global scope
    window.tibocinChatWidget = chatWidget;

    // Console message
    console.log('🤖 Tibocin Chat Widget loaded successfully!');
    console.log('💬 Access widget via: window.tibocinChatWidget');

})(); 