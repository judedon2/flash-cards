# Deployment Instructions

## ⚠️ IMPORTANT LIMITATION

**GitHub Pages cannot run the audio proxy server!**

GitHub Pages only serves static files (HTML, CSS, JavaScript). The Google Translate TTS feature requires a Node.js proxy server running on `localhost:3001`, which **will NOT work** on GitHub Pages.

### Your Options:

#### Option 1: GitHub Pages (Frontend Only - NO AUDIO)
- ✅ Free and easy
- ❌ Audio will NOT work
- Best for: Testing the UI/UX without audio

#### Option 2: Vercel/Netlify (Recommended for Full Functionality)
- ✅ Free tier available
- ✅ Audio WILL work
- ✅ Supports both frontend and backend
- Best for: Production use with audio

---

## Option 1: Deploy to GitHub Pages (No Audio)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it whatever you want (e.g., `flash-cards`, `portuguese-flashcards`)
3. **Important**: Make the repository **public** (required for GitHub Pages on free tier)
4. Do NOT initialize with README, .gitignore, or license

### Step 2: Update Vite Config

Edit `vite.config.ts` and change the `base` to match your repo name:

```typescript
base: '/your-repo-name/', // Replace with YOUR actual repo name
```

For example, if your repo is `https://github.com/yourusername/portuguese-app`, use:
```typescript
base: '/portuguese-app/',
```

### Step 3: Initialize Git and Push

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add your GitHub remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This will:
1. Build your app (`npm run build`)
2. Create a `gh-pages` branch
3. Push the built files to that branch

### Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select branch: **gh-pages** and folder: **/ (root)**
4. Click **Save**
5. Wait 1-2 minutes for deployment

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

### Updating the Site

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

---

## Option 2: Deploy to Vercel (Recommended - WITH AUDIO)

Vercel can run both your frontend AND the proxy server, so **audio will work**!

**Good news**: The Vercel configuration is already set up for you! The `vercel.json` and `api/tts.js` files are already in place.

### Step 1: Push to GitHub (if not already done)

If you haven't already pushed your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Portuguese flashcards with audio"

# Add your GitHub remote (replace with your actual repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite app
5. Vercel will automatically use these settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **"Deploy"**

That's it! Wait 1-2 minutes for deployment to complete.

Your site will be live at: `https://your-project.vercel.app` (with working audio!)

### Step 3: Test Your Deployed Site

1. Open your Vercel URL
2. Paste some vocabulary (3 columns: English, Portuguese, Breakdown)
3. Click "Let's Go!"
4. Test the audio - it should work perfectly with Google Translate TTS

### Updating Your Deployed Site

Whenever you make changes:

```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy your site within 1-2 minutes!

---

## Option 3: Deploy to Netlify (Alternative - WITH AUDIO)

Similar to Vercel, Netlify supports serverless functions.

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub repo
5. Netlify will auto-configure the build

For audio to work, you'll need to create Netlify Functions similar to Vercel's approach.

---

## Troubleshooting

### Audio doesn't work on GitHub Pages
**This is expected.** GitHub Pages cannot run servers. Use Vercel or Netlify instead.

### Build fails
Make sure all dependencies are installed:
```bash
npm install
npm run build
```

### Page shows 404
Check that:
1. The `base` path in `vite.config.ts` matches your repo name
2. GitHub Pages is enabled and set to the `gh-pages` branch

### Changes don't appear
- Clear your browser cache
- Wait a few minutes for deployment to complete
- Run `npm run deploy` again

---

## Recommended: Use Vercel for Production

For the best experience with full audio functionality, I recommend **Vercel**. It's:
- Free for personal projects
- Easy to set up (5 minutes)
- Automatically deploys on every git push
- Supports the proxy server needed for audio

Let me know if you need help setting up Vercel!
