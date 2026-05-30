# LazyCow

A local desktop productivity utility for automating developer workflows, managing deep-work focus environments, and running sequential trigger commands. Built with Electron, React, TypeScript, and Tailwind CSS.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Build](#running-the-development-build)
- [Project Structure](#project-structure)
- [AI Continuation Protocol](#ai-continuation-protocol)
- [Development Notes](#development-notes)
- [License](#license)

---

## Overview

LazyCow is a desktop application that lets you create, manage, and execute custom automation shortcuts.  
It provides a **Library** for quick access to saved shortcuts, a **Builder** for visually constructing action sequences with hotkey triggers, and a **Settings** panel for configuring application behavior and managing blocked system triggers.

All data is stored locally using the browser's `localStorage` API. The user interface is themed with three colour schemes (Coffee, Ocean, Forest) and supports both light and dark modes.

---

## Features

- **Shortcut Library**  
  View, search, run, edit, rename, and delete saved shortcuts.  
  Cards display action icons, assigned hotkeys, and a live execution log simulator.

- **Visual Shortcut Builder**  
  Drag-and-drop action sequencing with a collapsible action sidebar.  
  Supports 10 action types across three categories (Apps & Web, System Control, Developer Tools).  
  Real-time hotkey validation: modifier-first enforcement, duplicate detection, and blocked-trigger checks.  
  Manual combo builder for OS-level shortcuts that cannot be captured by the recorder.

- **Hotkey Management**  
  Record custom key combinations or build them with dropdown selectors.  
  Blocked triggers list prevents reserved system shortcuts from being assigned.  
  User-markable "system-critical" triggers with a danger-themed confirmation modal on deletion.

- **Settings & Preferences**  
  General options: launch at startup, keep in system tray, execution notifications.  
  Data & Backup: export/import workspace as JSON.  
  Danger Zone: factory reset with three-step confirmation (requires typing "DELETE").

- **Theme System**  
  Three themes (Coffee, Ocean, Forest), each with light and dark variants.  
  Per-section shade customization (Light, Medium, Dark).

- **Performance Optimisations**  
  Splash screen with font preloading.  
  CSS-based page transitions (no unmounting) to prevent UI stutter.  
  Custom thin scrollbars that adapt to the active theme.  
  ClearType-friendly rendering for Windows.

---

## Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Runtime        | Electron (ESM)                      |
| Frontend       | React 18 + TypeScript               |
| Build Tool     | Vite                                |
| Styling        | Tailwind CSS v3                     |
| State / Data   | React hooks + localStorage          |
| Fonts          | Hanken Grotesk, Inter, JetBrains Mono (Google Fonts) |
| Icons          | Material Symbols (Outlined)         |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lazycow.git
cd lazycow

# The application source code is inside the lazycoww/ directory
cd lazycoww

# Install dependencies
npm install
Running the Development Build
bash
# Start the Vite dev server and Electron window
npm run dev
The application window will open automatically.
All data is stored locally in the Electron renderer's localStorage -- no backend required.

Project Structure
text
lazycow/
└── lazycoww/                      # Application root
    ├── package.json
    ├── index.html                 # Splash screen + font preloading
    ├── main.js                    # Electron main process
    ├── LAZYCOW_CONTEXT.md         # AI Continuation Blueprint (see below)
    └── src/
        ├── index.css              # Tailwind, themes, scroll fixes, transitions
        ├── App.tsx                # Root component, routing, global state
        ├── types/
        │   └── actions.ts         # Shared TypeScript types, constants, helpers
        ├── hooks/
        │   └── useHotkeyRecorder.ts
        ├── components/
        │   ├── Sidebar.tsx
        │   ├── ActionSidebar.tsx
        │   ├── ActionSequence.tsx
        │   ├── ShortcutCard.tsx
        │   ├── ComboBuilder.tsx
        │   ├── BlockedTriggerList.tsx
        │   ├── OSCriticalWarningModal.tsx
        │   ├── RenameModal.tsx
        │   ├── DeleteModal.tsx
        │   ├── SettingsGeneral.tsx
        │   ├── SettingsData.tsx
        │   ├── SettingsBlockedTriggers.tsx
        │   ├── SettingsDangerZone.tsx
        │   └── SettingsFooter.tsx
        └── pages/
            ├── Library.tsx
            ├── Builder.tsx
            └── Settings.tsx
AI Continuation Protocol
The file LAZYCOW_CONTEXT.md located in the project root (lazycoww/) is the authoritative blueprint for this application.
It contains:

Project goals and architecture

Complete directory layout

Detailed descriptions of every file's current logic

Strict coding guidelines for AI assistants

A mandatory context-update protocol

If you are using an AI coding assistant (ChatGPT, Claude, Copilot, etc.):

Copy the entire contents of LAZYCOW_CONTEXT.md.

Paste it as your first message in a new chat session.

The assistant will immediately understand the full project state, conventions, and restrictions.

After making changes to the codebase:

Update LAZYCOW_CONTEXT.md manually, or

Ask your AI assistant to provide an updated Markdown block for the modified sections (following the built-in protocol).

This workflow guarantees that every collaborator -- human or AI -- always works from the same, up-to-date specification.

Development Notes
Code Style: All components use named exports (export const ComponentName: React.FC = ...).

Styling: Inline styles are forbidden. Use Tailwind utility classes or semantic CSS variables (text-foreground, bg-card, border-border, etc.).

Performance: Do not apply will-change: transform to text elements; this degrades ClearType rendering on Windows.

State Management: Pages are kept mounted and toggled with CSS to avoid unmount flicker. Use React key props to force remounts when fresh data is required.

Hotkey Recording: Always use the shared useHotkeyRecorder hook. For OS shortcuts that cannot be intercepted, direct users to the ComboBuilder component.

