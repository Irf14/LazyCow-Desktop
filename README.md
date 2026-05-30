# LazyCow

Local desktop productivity utility for automating developer workflows and managing deep-work focus environments.

---

## Table of Contents

- [First Time Setup](#first-time-setup)
- [For AI Assistants](#for-ai-assistants)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Author](#author)

---

## First Time Setup

```bash
# Navigate to project folder
cd lazycoww

# Install dependencies
npm install

# Run the application
npm run dev
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

Note
The context file (docs/CONTEXT.md) is the single source of truth for this project. Always reference it before making changes.
