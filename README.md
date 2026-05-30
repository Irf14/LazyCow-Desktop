# 🐄 LazyCow

Local desktop productivity utility for automating developer workflows.

---

## First Time Setup

```bash
# 1. Navigate to project folder
cd lazycoww

# 2. Install dependencies
npm install

# 3. Run the app
npm run dev
# For AI Assistants (Claude, ChatGPT, Copilot, etc.)
To understand this project fully, you MUST read the context file first.

Step 1: Read the Context
Open and read /docs/CONTEXT.md completely. This file contains:

Complete project architecture

Technical stack (Electron + React + TypeScript + Tailwind)

File-by-file component registry

Coding standards and theme system

Hotkey recording logic

State management patterns

Step 2: Run the Project
bash
cd lazycoww
npm run dev
Step 3: Start Helping
Once you've read CONTEXT.md, you'll have full knowledge of:

All components and their props

Data persistence keys

Theme and styling conventions

Existing hooks and utilities

Project status and next steps

# Important
Never modify code without reading CONTEXT.md first

The context file is the single source of truth for this project

Always reference it before suggesting changes

📁 Project Location
text
/LazyCow-Desktop/
├── docs/
│   └── CONTEXT.md          # READ THIS FIRST
├── lazycoww/               # Main project folder
│   ├── src/
│   ├── main.js
│   └── package.json
└── README.md
#Author
Irf14

Remember: Start here → /docs/CONTEXT.md → Then help

text

---

## Also Make Sure Your Folder Structure is Correct

Since your project is inside `lazycoww/` folder, update your context file location:

```bash
# In your LazyCow-Fresh folder, create this structure:
LazyCow-Fresh/
├── README.md
├── docs/
│   └── CONTEXT.md          # Your LAZYCOW_CONTEXT.md renamed and moved here
└── lazycoww/               # Your actual project files
    ├── src/
    ├── main.js
    ├── package.json
    └── ...
# Commands to Fix Structure (If Needed)
bash
# Create docs folder
mkdir docs

# Move and rename context file
move LAZYCOW_CONTEXT.md docs\CONTEXT.md

# If your project isn't in lazycoww folder yet, create it and move files
mkdir lazycoww
move * lazycoww\  (except README.md and docs folder)
# Then Commit and Push
bash
git add README.md docs/
git commit -m "Add README with AI instructions and context file in docs folder"
git push
