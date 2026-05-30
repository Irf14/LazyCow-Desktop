# LazyCow

Local desktop productivity utility for automating developer workflows and managing deep-work focus environments.

---

## Table of Contents

- [**First Time Setup**](#first-time-setup)
- [**Project Features**](#project-features)
- [**For AI Assistants**](#for-ai-assistants)
- [**Project Structure**](#project-structure)
- [**Tech Stack**](#tech-stack)
- [**Author**](#author)

---

## First Time Setup

```bash
# Navigate to project folder
cd lazycoww

# Install dependencies
npm install

# Run the application
npm run dev
Note: The project runs inside the lazycoww folder. Do not run commands from the root directory.

Project Features
Feature	Description
Workspaces	Library, Builder, Settings, Community, Account tabs
Hotkey Recording	Capture keyboard shortcuts with modifier validation
Action Sequences	Build multi-step automation chains with drag-reorder
Theme System	Coffee, Ocean, Forest themes with light/dark modes
Blocked Triggers	Prevent system shortcuts from interfering
Data Persistence	Local storage for shortcuts, settings, and blocked triggers
Export/Import	Backup and restore your workspace
OS-Critical Warnings	Prevent deletion of essential system shortcuts
For AI Assistants
Requirement: Read docs/CONTEXT.md before assisting with this project.

The context file contains:

Section	Description
Project Architecture	Complete system design and goals
Technical Stack	Electron, React, TypeScript, Tailwind specifications
File Registry	Every component with current logic and props
Coding Standards	TypeScript rules, Tailwind conventions, theme classes
State Management	localStorage keys, persistence patterns
Hotkey System	useHotkeyRecorder hook, modifier validation
Blocked Triggers	OS-critical trigger management
To run the project:

bash
cd lazycoww
npm run dev
To understand the codebase: Read docs/CONTEXT.md first. Do not suggest changes without reviewing the context file.

Project Structure
text
LazyCow-Desktop/
├── docs/
│   └── CONTEXT.md          # Read this first
├── lazycoww/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Library, Builder, Settings
│   │   ├── hooks/          # Custom hooks (useHotkeyRecorder)
│   │   ├── types/          # TypeScript definitions
│   │   └── index.css       # Tailwind + HSL themes
│   ├── main.js             # Electron main process
│   ├── index.html          # Entry point with splash screen
│   └── package.json
└── README.md
Tech Stack
Technology	Purpose
Electron	Desktop runtime
React	UI framework
TypeScript	Type safety
Tailwind CSS	Styling
Vite	Build tool
localStorage	Data persistence
Author
Irf14

Important Note
The context file (docs/CONTEXT.md) is the single source of truth for this project. Always reference it before making changes.
