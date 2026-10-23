# 🚀 Premavasam Web Hosting Guide (100% Free Online Hosting)

This application is built with **Node.js (v22+)** and **built-in SQLite (`node:sqlite`)** with **zero external runtime dependencies**. It is ultra-lightweight (~35MB RAM) and runs on all free-tier cloud platforms.

---

## 🏆 Option 1: Render.com (Recommended — Full Production Cloud)
**Cost:** Free | **Setup time:** 3 minutes | **Features:** Free SSL/HTTPS, Custom Domain, GitHub Auto-deploy.

### Steps to Deploy:
1. **Push to GitHub**:
   - Create a free repository on [github.com](https://github.com) named `premavasam`.
   - Push this directory's files into the GitHub repository.
2. **Create Render Account**:
   - Go to [render.com](https://render.com) and sign in with GitHub.
3. **Deploy Web Service**:
   - Click **New +** &rarr; **Web Service**.
   - Select your `premavasam` repository.
   - Fill in:
     - **Name:** `premavasam`
     - **Runtime:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Instance Type:** `Free`
   - Under **Advanced &rarr; Environment Variables**, add:
     - `NODE_VERSION` = `22.23.4`
4. **Click "Deploy Web Service"**:
   - Render will build and deploy your app.
   - You get a free live URL: `https://premavasam.onrender.com`!

---

## ⚡ Option 2: Instant Live URL in 10 Seconds (Localtunnel / Cloudflare)
If you want to share the live website and admin portal online right now without creating accounts or pushing to GitHub:

### Using Localtunnel (Free, No Signup):
Open PowerShell and run:
```powershell
npx localtunnel --port 8080
```
It will output a live public URL (e.g., `https://friendly-tiger-42.loca.lt`) accessible from any phone or computer anywhere in the world!

### Using Cloudflare Tunnels (Free, Fast, Secure):
```powershell
winget install --id Cloudflare.cloudflared -e
cloudflared tunnel --url http://localhost:8080
```
It immediately generates a live `https://<random>.trycloudflare.com` URL with Cloudflare DDoS protection and SSL.

---

## 🌐 Option 3: Glitch.com (Browser-Based, Free Persistent SQLite)
**Cost:** Free | **Features:** Edit and run directly in your browser.

1. Go to [glitch.com](https://glitch.com).
2. Click **New Project** &rarr; **Import from GitHub** (or upload files).
3. Glitch will automatically run `npm start` and keep SQLite persistent on disk.
4. Your site will be live instantly at `https://<project-name>.glitch.me`.

---

## 🔐 Default Admin Credentials for Live CRM:
- **Admin URL:** `/admin`
- **Username:** `admin`
- **Password:** `premavasam2026`
