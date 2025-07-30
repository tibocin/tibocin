# 🚀 Deployment Guide for tibocin.xyz

This guide will help you deploy your cypherpunk-styled website to tibocin.xyz.

## 📋 Prerequisites

- Domain name: `tibocin.xyz` (already owned)
- Web hosting service (Netlify, Vercel, GitHub Pages, or traditional hosting)
- Basic knowledge of web deployment

## 🎯 Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

1. **Create Netlify Account**

   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy from GitHub**

   - Connect your GitHub repository
   - Set build settings:
     - Build command: `none` (static site)
     - Publish directory: `.` (root directory)

3. **Custom Domain Setup**
   - Go to Site Settings > Domain Management
   - Add custom domain: `tibocin.xyz`
   - Update DNS records as instructed by Netlify

### Option 2: Vercel (Alternative - Free & Fast)

1. **Create Vercel Account**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy**

   - Import your GitHub repository
   - Vercel will auto-detect it's a static site
   - Deploy automatically

3. **Custom Domain**
   - Add `tibocin.xyz` in project settings
   - Update DNS records

### Option 3: GitHub Pages

1. **Enable GitHub Pages**

   - Go to repository Settings > Pages
   - Source: Deploy from branch
   - Branch: `main`
   - Folder: `/ (root)`

2. **Custom Domain**
   - Add `tibocin.xyz` in repository settings
   - Create `CNAME` file with domain name

### Option 4: Traditional Hosting

1. **Upload Files**

   - Upload all files to your web server
   - Ensure `index.html` is in the root directory

2. **DNS Configuration**
   - Point `tibocin.xyz` to your server's IP
   - Add `www` subdomain if needed

## 🔧 DNS Configuration

### Required DNS Records

```
Type    Name    Value
A       @       [Your Server IP]
CNAME   www     tibocin.xyz
```

### For Netlify/Vercel

```
Type    Name    Value
CNAME   @       [Your Netlify/Vercel URL]
CNAME   www     tibocin.xyz
```

## 📁 File Structure

Ensure your deployment includes these files:

```
tibocin.xyz/
├── index.html          # Main homepage
├── styles.css          # Cypherpunk styling
├── script.js           # Interactive features
└── deploy.md           # This guide
```

## 🔒 Security Considerations

### HTTPS Setup

- Enable HTTPS/SSL certificate
- Redirect HTTP to HTTPS
- Set security headers

### Recommended Headers

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;
```

## 🎨 Customization

### Update Project Links

Edit `index.html` to point to your actual projects:

```html
<!-- Update these links -->
<a
  href="https://github.com/tibocin/bitcoin-verification-bot"
  class="project-link"
  >View Project →</a
>
<a href="https://github.com/tibocin" class="contact-item">GitHub</a>
```

### Add Analytics (Optional)

Add Google Analytics or Plausible Analytics:

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

## 🧪 Testing

### Pre-Deployment Checklist

- [ ] All links work correctly
- [ ] Responsive design on mobile
- [ ] Custom cursor works
- [ ] Animations function properly
- [ ] Contact information is correct
- [ ] ASCII art displays correctly

### Post-Deployment Testing

- [ ] Website loads at `tibocin.xyz`
- [ ] HTTPS redirects work
- [ ] Mobile responsiveness
- [ ] Performance is good (use PageSpeed Insights)
- [ ] Cross-browser compatibility

## 📊 Performance Optimization

### Image Optimization

- Use WebP format for images
- Compress images appropriately
- Lazy load images if added

### Code Optimization

- Minify CSS and JavaScript for production
- Enable gzip compression
- Use CDN for fonts

### Caching

```http
Cache-Control: public, max-age=31536000
```

## 🔄 Updates & Maintenance

### Regular Updates

- Keep contact information current
- Update project links as needed
- Refresh content periodically

### Monitoring

- Set up uptime monitoring
- Monitor performance metrics
- Check for broken links

## 🆘 Troubleshooting

### Common Issues

**Website not loading:**

- Check DNS propagation (can take 24-48 hours)
- Verify hosting service is active
- Check for typos in domain name

**Styling issues:**

- Clear browser cache
- Check CSS file paths
- Verify all files uploaded

**Animations not working:**

- Check JavaScript console for errors
- Ensure script.js is loaded
- Verify browser compatibility

## 📞 Support

If you encounter issues:

1. Check hosting provider documentation
2. Review browser console for errors
3. Test on different browsers/devices
4. Contact hosting provider support

---

**Remember**: This is a static website, so deployment should be straightforward. The cypherpunk styling and interactive features are all client-side, making it easy to host anywhere.

**Good luck with your deployment! 🚀**
