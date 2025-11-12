# How to Use Claude Code Web - A Complete Guide for Non-Technical Users

## What is Claude Code Web?

Claude Code Web is an AI-powered coding assistant that lives in your web browser. Think of it as having an expert developer sitting next to you, ready to:
- Write code for you
- Fix bugs
- Add new features
- Explain how things work
- Make changes to your project

The key difference from ChatGPT or regular Claude: **Claude Code Web actually modifies your files, commits changes to Git, and can push code to GitHub for you.**

---

## How This Chat Works

### The Basics

1. **You type requests in plain English** - No need to know technical jargon
   - Example: "Add a dark mode to my app"
   - Example: "Fix the bug where the login button doesn't work"
   - Example: "Explain what the HomePage component does"

2. **Claude reads your code** - It can see all files in your project and understand your codebase

3. **Claude makes changes** - It will:
   - Edit existing files
   - Create new files if needed
   - Run tests and builds
   - Commit changes to Git
   - Push to GitHub

4. **You review the changes** - Claude will tell you what it changed and where

---

## The Complete Workflow: From Chat to GitHub to Your Computer

### Step 1: You Make a Request

```
You: "Add a contact form to the website"
```

### Step 2: Claude Works

Claude will:
1. **Explore your codebase** - Understand your project structure
2. **Plan the work** - Break down the task into steps
3. **Make changes** - Edit files, create new components, etc.
4. **Test** - Run your build/tests if configured
5. **Commit** - Create a Git commit with your changes
6. **Push** - Send the code to GitHub on a special branch

You'll see Claude working through each step in the chat.

### Step 3: Changes Are on GitHub

After Claude pushes, your changes are now on GitHub on a branch like:
```
claude/add-contact-form-abc123xyz
```

**Important:** The changes are NOT on your main branch yet. They're on a separate "feature branch."

### Step 4: Getting Changes to Your Local Computer

You have **two options** to see and use these changes:

#### Option A: Pull the Claude Branch (See what Claude built)

1. Open your terminal/command prompt
2. Navigate to your project folder:
   ```bash
   cd path/to/your/project
   ```

3. Fetch the latest from GitHub:
   ```bash
   git fetch origin
   ```

4. Switch to the Claude branch:
   ```bash
   git checkout claude/add-contact-form-abc123xyz
   ```
   (Replace with the actual branch name Claude tells you)

5. Now your local files match what Claude built! Run your app:
   ```bash
   npm run dev
   ```
   (or whatever command starts your project)

6. Open your browser and test the changes

#### Option B: Merge to Main (Make changes permanent)

If you're happy with Claude's changes and want them in your main codebase:

1. **On GitHub:** Create a Pull Request (PR)
   - Go to your repository on GitHub
   - Click "Compare & pull request"
   - Review the changes
   - Click "Merge pull request"

2. **On your computer:** Pull the updated main branch
   ```bash
   git checkout main
   git pull origin main
   ```

Now your local main branch has Claude's changes!

---

## Multiple Workflows - What Happens?

Let's say you ask Claude to do **multiple different things** in separate conversations:

### Scenario:
1. **Chat 1:** "Add a contact form"
   - Creates branch: `claude/add-contact-form-abc123`

2. **Chat 2:** "Add dark mode"
   - Creates branch: `claude/add-dark-mode-def456`

3. **Chat 3:** "Fix login bug"
   - Creates branch: `claude/fix-login-bug-ghi789`

### What You'll Have on GitHub:
- Your `main` branch (original code)
- `claude/add-contact-form-abc123` branch
- `claude/add-dark-mode-def456` branch
- `claude/fix-login-bug-ghi789` branch

### How to Handle This:

**Each branch is independent.** You can:

1. **Test each feature separately:**
   ```bash
   git checkout claude/add-contact-form-abc123
   npm run dev
   # Test the contact form

   git checkout claude/add-dark-mode-def456
   npm run dev
   # Test dark mode
   ```

2. **Merge them one by one:**
   - Review each Pull Request on GitHub
   - Merge the ones you like
   - Delete/ignore the ones you don't

3. **Or ask Claude to combine them:**
   ```
   You: "Merge the contact form and dark mode branches together"
   ```

---

## Common Questions

### Q: Will Claude overwrite my work?
**A:** No! Claude creates new branches. Your `main` branch stays untouched until YOU decide to merge.

### Q: What if I don't like what Claude built?
**A:** Just don't merge the branch. Switch back to main and you're back to normal. Or ask Claude to fix it!

### Q: Can Claude see my private code?
**A:** Claude only sees what's in your current session. It doesn't store or remember your code after the session ends.

### Q: Do I need to know Git?
**A:** Basic knowledge helps, but Claude can guide you through Git commands if you ask.

### Q: How do I see what files Claude changed?
**A:** Claude will tell you in the chat. Or run:
```bash
git diff main claude/branch-name
```

### Q: What if the build fails?
**A:** Claude will see the error and try to fix it. Or you can ask: "The build failed, can you fix it?"

---

## Quick Reference Commands

### See all branches:
```bash
git branch -a
```

### Switch to a Claude branch:
```bash
git checkout claude/branch-name-here
```

### Go back to main:
```bash
git checkout main
```

### See what changed:
```bash
git log
git diff
```

### Pull latest from GitHub:
```bash
git pull origin main
```

### Run your project (common commands):
```bash
npm run dev          # Next.js, Vite, etc.
npm start            # Create React App
python manage.py runserver  # Django
```

---

## Example: Complete Workflow

**You:** "Add a footer with social media links to my website"

**Claude:**
- ✓ Reads your code
- ✓ Creates Footer component
- ✓ Updates main layout
- ✓ Commits changes
- ✓ Pushes to `claude/add-footer-xyz123`

**You see on GitHub:** New branch `claude/add-footer-xyz123`

**On your computer:**
```bash
# Get the changes
git fetch origin
git checkout claude/add-footer-xyz123

# Test it
npm run dev

# Check localhost:3000 - you see the footer!
```

**If you like it:**
```bash
# Merge to main (option 1: via command line)
git checkout main
git merge claude/add-footer-xyz123
git push origin main

# OR option 2: Create Pull Request on GitHub and merge there
```

**Done!** Your website now has a footer.

---

## Pro Tips

1. **Be specific in requests:**
   - ❌ "Make it better"
   - ✅ "Add error handling to the login form"

2. **Ask Claude to explain:**
   - "Explain what you just did"
   - "Why did you create this file?"

3. **Request tests:**
   - "Also write tests for this feature"

4. **Ask for documentation:**
   - "Add comments explaining this code"

5. **Review before merging:**
   - Always test Claude's changes locally before merging to main

---

## Troubleshooting

### "I can't find the branch Claude created"
```bash
git fetch origin
git branch -a
```
Look for branches starting with `claude/`

### "My local changes conflict with Claude's"
```bash
# Save your changes first
git stash

# Get Claude's branch
git checkout claude/branch-name

# Apply your changes back (if needed)
git stash pop
```

### "How do I undo Claude's changes?"
```bash
# Just switch back to main
git checkout main

# Or delete the Claude branch
git branch -D claude/branch-name
```

---

## Summary

1. **Chat with Claude** - Ask for features, fixes, explanations
2. **Claude codes** - Makes changes, commits, pushes to GitHub
3. **You review** - Pull the branch locally, test it
4. **You decide** - Merge to main or ask for changes
5. **Repeat** - Keep building with Claude!

**Remember:** Claude is your coding partner. Don't hesitate to ask questions, request changes, or ask for explanations. That's what it's here for!

---

## Need Help?

Just ask Claude:
- "How do I check out your branch?"
- "Can you explain what you changed?"
- "Walk me through testing this locally"
- "How do I merge this to my main branch?"

Claude is here to help at every step!
