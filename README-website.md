# 🌐 Tibocin.xyz Website

A cypherpunk-styled personal website for Bitcoin developer and cypherpunk @tibocin.

## 🎨 Design Features

- **Cypherpunk Aesthetic**: Green/black terminal-inspired design
- **Interactive Elements**: Custom cursor, typing animations, glitch effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **ASCII Art**: Bitcoin-themed ASCII art section
- **Matrix Background**: Subtle matrix rain effect
- **Particle System**: Floating green particles for ambiance
- **Chat Integration**: Slide-in chat widget with Bitcoin verification bot

## 📁 File Structure

```
tibocin.xyz/
├── index.html          # Main homepage
├── styles.css          # Cypherpunk styling
├── script.js           # Interactive features
├── robots.txt          # SEO configuration
├── sitemap.xml         # Search engine sitemap
├── deploy.md           # Deployment guide
├── README-website.md   # This file
├── chat.html           # Dedicated chat page
├── chat-widget.html    # Standalone chat widget
└── embed.js            # Embed script for other sites
```

## 🚀 Quick Start

1. **Clone or download** the website files
2. **Open `index.html`** in your browser to preview
3. **Customize** content in `index.html`
4. **Deploy** using the guide in `deploy.md`

## 🎯 Customization

### Update Personal Information

Edit `index.html` to update your details:

```html
<!-- About section -->
<p class="typing-text">
  Hi, I'm @tibocin. I'm a recovering web2 Node/React/JS developer...
</p>

<!-- Contact information -->
<a href="mailto:tibocin@pm.me" class="contact-item">
  <span class="contact-value">tibocin@pm.me</span>
</a>
```

### Update Projects

Modify the projects section:

```html
<div class="project-card">
  <div class="project-icon">🤖</div>
  <h3 class="project-title">Your Project Name</h3>
  <p class="project-description">Project description here</p>
  <div class="project-tags">
    <span class="tag">Technology</span>
  </div>
  <a href="https://github.com/your-repo" class="project-link">View Project →</a>
</div>
```

### Update Skills

Edit the skills section:

```html
<div class="skill-category">
  <h3 class="skill-title">Your Category</h3>
  <div class="skill-items">
    <span class="skill-item">Skill 1</span>
    <span class="skill-item">Skill 2</span>
  </div>
</div>
```

### Customize Colors

Edit CSS variables in `styles.css`:

```css
:root {
  --primary-green: #00ff00; /* Main green color */
  --secondary-green: #00cc00; /* Secondary green */
  --terminal-green: #39ff14; /* Terminal green */
  --background-black: #000000; /* Background color */
}
```

## 🎨 Styling Features

### Typography

- **JetBrains Mono**: Monospace font for terminal feel
- **Orbitron**: Futuristic font for headings and logo

### Animations

- **Typing Effect**: Text appears character by character
- **Scroll Animations**: Elements animate in as you scroll
- **Glitch Effect**: Hover effect on logo and titles
- **Custom Cursor**: Green circular cursor that scales on hover

### Interactive Elements

- **Hover Effects**: Cards lift and glow on hover
- **Matrix Rain**: Background matrix effect
- **Particle System**: Floating green particles
- **Real-time Clock**: Live time display in header

## 📱 Responsive Design

The website is fully responsive with breakpoints at:

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔧 Technical Features

### Performance

- **Lightweight**: No heavy frameworks
- **Fast Loading**: Optimized CSS and JavaScript
- **SEO Friendly**: Proper meta tags and sitemap

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Semantic HTML structure
- **Focus Indicators**: Clear focus states

### Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## 🚀 Deployment

See `deploy.md` for detailed deployment instructions.

### Quick Deployment Options:

1. **Netlify** (Recommended)

   - Drag and drop files to Netlify
   - Add custom domain: `tibocin.xyz`

2. **GitHub Pages**

   - Push to GitHub repository
   - Enable Pages in settings
   - Add custom domain

3. **Vercel**
   - Import from GitHub
   - Automatic deployment

## 🎯 SEO Optimization

The website includes:

- **Meta Tags**: Title, description, viewport
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Crawler instructions
- **Semantic HTML**: Proper heading structure
- **Alt Text**: Ready for images when added

## 🔒 Security

- **HTTPS Ready**: Works with SSL certificates
- **Content Security Policy**: Ready for implementation
- **No External Dependencies**: Self-contained (except fonts)

## 💬 Chat Integration

### Slide-in Widget

The website includes a slide-in chat widget that embeds your Bitcoin verification bot:

- **Location**: Bottom-right corner of the page
- **Trigger**: Click the 🤖 button
- **Features**: Responsive design, keyboard shortcuts, notification effects

### Dedicated Chat Page

A full-screen chat experience at `chat.tibocin.xyz`:

- **File**: `chat.html` (deploy as `index.html`)
- **Features**: Full-screen iframe, matrix background, responsive design
- **Deployment**: See `chat-deploy.md` for detailed instructions

### Embed Script

Use `embed.js` to add the chat widget to any website:

```html
<script src="https://tibocin.xyz/embed.js"></script>
```

**Access widget programmatically:**

```javascript
// Show chat widget
window.tibocinChatWidget.show();

// Hide chat widget
window.tibocinChatWidget.hide();

// Show notification
window.tibocinChatWidget.showNotification();
```

## 🎨 Customization Ideas

### Add More Sections

- Blog posts
- Portfolio gallery
- Timeline/experience
- Testimonials
- Newsletter signup

### Enhance Animations

- Parallax scrolling
- 3D effects
- Sound effects (with user permission)
- More glitch effects

### Add Functionality

- Dark/light mode toggle
- Search functionality
- Contact form
- Blog system
- Project filtering

## 🐛 Troubleshooting

### Common Issues

**Styling not loading:**

- Check file paths in HTML
- Clear browser cache
- Verify CSS file exists

**Animations not working:**

- Check JavaScript console for errors
- Ensure script.js is loaded
- Test in different browser

**Mobile issues:**

- Check viewport meta tag
- Test responsive breakpoints
- Verify touch interactions

## 📞 Support

For issues or questions:

- Check browser console for errors
- Test in different browsers
- Review deployment guide
- Contact: tibocin@pm.me

---

**Built with ❤️ for the Bitcoin community**

_This website embodies the cypherpunk spirit with modern web technologies while maintaining the aesthetic of classic terminal interfaces._
