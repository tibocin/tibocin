# Deployment Guide - Tibocin Website

## 🚀 **Two Build Options**

### **Option 1: Simple Build (Recommended)**

Preserves your existing site structure and only bundles the verification tool.

```bash
# Install dependencies
npm install

# Build verification tool only
npm run build:simple

# Development server
npm run dev:simple
```

**What this creates:**

- `dist/index.html` - Your main site (copied from root)
- `dist/verify.html` - Bundled verification tool
- `dist/styles.css` - Your existing styles
- `dist/script.js` - Your existing scripts
- `dist/verify.js` - Bundled verification JavaScript

### **Option 2: Full Build**

Bundles everything with Webpack (more complex).

```bash
npm run build
```

## 📁 **File Structure After Build**

```
dist/
├── index.html          # Your main site (preserved)
├── verify.html         # Verification tool (bundled)
├── styles.css          # Your existing styles
├── script.js           # Your existing scripts
├── avatar-mini.js      # Your existing avatar script
├── bitcoin-status.js   # Your existing status script
├── verify.js           # Bundled verification tool
└── vendors.js          # Vendor libraries (if using full build)
```

## 🌐 **GitHub Pages Deployment**

### **Step 1: Build the Project**

```bash
npm run build:simple
```

### **Step 2: Deploy to GitHub Pages**

1. Copy contents of `dist/` to your GitHub Pages branch
2. Or use GitHub Actions (see below)

### **Step 3: Update GitHub Pages Settings**

- Source: Deploy from a branch
- Branch: `gh-pages` (or your chosen branch)
- Folder: `/ (root)`

## 🔧 **GitHub Actions (Automatic Deployment)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build:simple

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🎯 **URL Structure**

After deployment:

- **Main Site:** `https://yourusername.github.io/repository/`
- **Verification Tool:** `https://yourusername.github.io/repository/verify.html`

## 🔍 **Testing Locally**

### **Development Server:**

```bash
npm run dev:simple
```

- Opens `http://localhost:8080`
- Main site: `http://localhost:8080/index.html`
- Verification: `http://localhost:8080/verify.html`

### **Production Build:**

```bash
npm run build:simple
```

- Serve `dist/` folder with any static server
- Test all functionality before deployment

## 🚨 **Troubleshooting**

### **Main site not accessible:**

- Check that `index.html` is copied to `dist/`
- Verify file paths in the copied files

### **Verification tool not working:**

- Check browser console for errors
- Verify all dependencies are installed
- Check that `verify.js` is generated

### **Styles not loading:**

- Ensure `styles.css` is copied to `dist/`
- Check file paths in HTML files

## 📈 **Performance Benefits**

### **Simple Build:**

- ✅ Preserves existing site structure
- ✅ Only bundles verification tool
- ✅ Faster build times
- ✅ Easier debugging

### **Full Build:**

- ✅ Complete optimization
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Better caching

---

**Choose the simple build for quick deployment, full build for maximum optimization! 🎯**
