# LAZYCOW PROJECT BLUEPRINT & AI CONTINUATION CONTEXT

Save this entire document as `LAZYCOW_CONTEXT.md` in your project root. When starting any new AI chat session, copy and paste this entire file as your first message to immediately synchronize the assistant with the project state, coding standards, and operational guidelines.

---

## 1. PROJECT INTRODUCTION & GOALS

**LazyCow** is a local desktop productivity utility designed to automate developer workflows, manage deep-work focus environments, and run sequential trigger commands.

The application is structured to support:
1. **Workspaces (Tabs):** A dashboard/library tab for quick execution, a builder tab for designing custom task chains, and a settings tab for native desktop preferences. Also features placeholder views for future Community and Account modules.
2. **User Experience Focus:** A unified thematic design with high-performance scrolling stabilizers on Windows systems, layout column customizability, collapsible sidebar, and splash screen loading.
3. **Local Execution:** Running as a native desktop application with local data persistence via localStorage.

---

## 2. TECHNICAL STACK & CORE SPECIFICATIONS

* **Runtime Framework:** Electron (Main process mapped via `main.js` using ESM)
* **Frontend Library:** React (Vite) + TypeScript (TSX)
* **Styling Engine:** Tailwind CSS v3
* **Theme Architecture:** Uses CSS HSL variables mapped to body-level classes (`theme-coffee`, `theme-ocean`, `theme-forest`) and system dark mode configurations (`.dark`). Themeable cards use `card-themeable bg-gradient-to-br` with shade classes (light/medium/dark).
* **Typography:** System native font overrides (Windows: `Segoe UI`, macOS: `-apple-system`, BlinkMacSystemFont) with `font-display: swap` for smooth loading. Fonts preloaded in `index.html`.
* **Design System Spacing & Typography Mappings:**
    * `font-title-sm` / `text-title-sm` (18px, Medium/SemiBold) — used for all section titles
    * `font-headline-md` / `text-headline-md` (24px, SemiBold)
    * `font-body-md` / `text-body-md` (15px, Regular)
    * `font-body-sm` / `text-body-sm` (13px, Regular)
    * `font-label-caps` / `text-label-caps` (11px, JetBrains Mono, uppercase, tracked)
    * `font-code-sm` (13px, JetBrains Mono)
* **Windows ClearType Scroll Stabilizer:**
    * Root configured with `text-rendering: optimizeLegibility` and `-webkit-font-smoothing: subpixel-antialiased`.
    * Scroll containers use `transform: translateZ(0)` and `backface-visibility: hidden` for GPU acceleration.
    * Individual text tags stripped of `will-change: transform` to prevent blurry textures.
    * `scroll-behavior: smooth` applied globally.
* **Hotkey Recording:** Shared hook `useHotkeyRecorder` captures key combinations with modifier detection. System-level shortcuts (Win+D, Alt+Z) cannot be intercepted; dropdown-based `ComboBuilder` component provides manual fallback. Modifier-first validation enforced.
* **Data Persistence:** All shortcuts, settings, and blocked triggers stored in localStorage.
    * `lazycow-shortcuts` — saved shortcut objects
    * `lazycow-blocked-triggers` — blocked hotkey strings
    * `lazycow-os-critical-triggers` — user-marked system-critical triggers
    * `lazycow_settings` — app preferences
    * `lazycow-theme` / `lazycow-dark` — theme state

---

## 3. PROJECT DIRECTORY LAYOUT

```text
lazycoww/
├── package.json
├── index.html                   # HTML Entry with splash screen + font preloading
├── main.js                      # Electron Main process entry
├── src/
│   ├── index.css                # Tailwind + HSL themes + scroll stabilizers + page transitions
│   ├── App.css                  # Kept empty
│   ├── App.tsx                  # Root: tabs, theme, splash, collapsible sidebar, unsaved changes modal
│   ├── types/
│   │   └── actions.ts           # Shared types, constants, helpers, default blocked triggers
│   ├── hooks/
│   │   └── useHotkeyRecorder.ts # Reusable hotkey recording hook
│   ├── components/
│   │   ├── Sidebar.tsx          # Collapsible nav sidebar (64px/260px)
│   │   ├── ActionSidebar.tsx    # Collapsible action library panel (Builder left panel)
│   │   ├── ActionSequence.tsx   # Sequence cards with drag-reorder, flow preview, drop zone
│   │   ├── ShortcutCard.tsx     # Library shortcut card with shade, menu, execution log
│   │   ├── ComboBuilder.tsx     # Dropdown-based hotkey builder (modifier + key picker)
│   │   ├── BlockedTriggerList.tsx # Searchable blocked trigger list with OS-critical badges
│   │   ├── OSCriticalWarningModal.tsx # Danger modal for deleting system-critical triggers
│   │   ├── RenameModal.tsx      # Reusable rename modal
│   │   ├── DeleteModal.tsx      # Reusable delete confirmation modal
│   │   ├── SettingsGeneral.tsx  # General settings (startup, tray, notifications)
│   │   ├── SettingsData.tsx     # Data & Backup (export/import)
│   │   ├── SettingsBlockedTriggers.tsx # Blocked triggers management with OS-critical support
│   │   ├── SettingsDangerZone.tsx     # Factory reset with 3-step confirmation
│   │   └── SettingsFooter.tsx   # Version info footer
│   └── pages/
│       ├── Library.tsx          # Saved shortcuts grid, search, edit/rename/delete, execution
│       ├── Builder.tsx          # Shortcut builder with hotkey recording, combo builder, action sequence
│       └── Settings.tsx         # Orchestrates all Settings sub-components
4. ACTIVE CODEBASE REGISTRY (FILE-BY-FILE DETAILS)
A. Core Entry & Main Process
1. main.js

File Path: /main.js

Current Logic: Launches Electron runtime. Window dimensions: 1200x800. Background color: #F5F2ED. Forces subpixel LCD antialiasing.

2. index.html

File Path: /index.html

Current Logic: Vite root shell. Preconnects to Google Fonts. Preloads Hanken Grotesk, Inter, JetBrains Mono, and Material Symbols. Contains splash screen (#splash-screen) with animated loader that hides after fonts load.

3. src/index.css

File Path: /src/index.css

Current Logic: Tailwind directives + HSL theme variables for Coffee/Ocean/Forest in light/dark. Scroll stabilizer with translateZ(0) GPU layers. font-display: swap for smooth font loading. Custom themed scrollbar (6px). Page transition system (.page-container with display:none/display:flex + fade-in animation).

B. Layout Shells
4. src/App.tsx

File Path: /src/App.tsx

Current Logic: Root orchestrator. States: activeTab, theme, darkMode, appReady, sidebarCollapsed, hasUnsavedChanges, editShortcut, libraryRefreshKey, builderKey. Waits for fonts via document.fonts.ready before hiding splash. Pages kept mounted with CSS show/hide (.page-container.active) to prevent unmount distortions. libraryRefreshKey and builderKey force remounts for data refresh/reset. Confirmation modal blocks navigation when Builder has unsaved changes. Collapsible sidebar via sidebarCollapsed state with dynamic marginLeft on content area.

5. src/components/Sidebar.tsx

File Path: /src/components/Sidebar.tsx

Props: activeTab, onTabClick, collapsed, onToggleCollapse

Current Logic: Collapsible nav (64px collapsed, 260px expanded). Shows only icons when collapsed with tooltip titles. "New Project" button (full text or icon-only based on state). Collapse toggle button at bottom with chevron icon. 5 tabs: Library, Builder, Community, Settings, Account.

C. Shared Types & Hooks
6. src/types/actions.ts

File Path: /src/types/actions.ts

Current Logic: Exports ActionItem, CatalogItem, SavedShortcut interfaces. Full actionCatalog (10 actions across 3 groups: Apps & Web, System Control, Developer Tools). "Open File" is in Apps & Web group. categoryOrder, getFieldLabel helper. STORAGE_KEY_SHORTCUTS, STORAGE_KEY_BLOCKED_TRIGGERS constants. DEFAULT_BLOCKED_TRIGGERS (17 system shortcuts). normalizeHotkey helper function.

7. src/hooks/useHotkeyRecorder.ts

File Path: /src/hooks/useHotkeyRecorder.ts

Current Logic: Reusable hook for recording key combinations. Returns { recording, recordedCombo, startRecording, stopRecording, clearCombo, setRecordedCombo }. Listens on window with capture phase. Blocks all default behavior during recording via preventDefault() + stopPropagation(). Press Escape to clear, click to toggle. Used by both Builder and SettingsBlockedTriggers.

D. Components
8. src/components/ActionSidebar.tsx

File Path: /src/components/ActionSidebar.tsx

Current Logic: Collapsible action catalog panel (64px collapsed icon strip, full width expanded). Inline search when collapsed — click search icon to expand text input, filters by action name and group. Hover tooltips on collapsed icons with arrow. Drag-to-add support via onDragStart. Groups: Apps & Web (Launch App, Open URL, Open Folder, Open File), System Control (Set Volume, Toggle DND, Night Light, Set Brightness-greyed), Developer Tools (Run Script, Open in VS Code).

9. src/components/ActionSequence.tsx

File Path: /src/components/ActionSequence.tsx

Current Logic: Sequence cards with drag-reorder (HTML5 DnD using application/drag-type dataTransfer), arrow button reordering (↑↓), flow preview bar with icons and arrows, drop zone for sidebar drags. Handles both internal reorder and sidebar-to-sequence drops via separate state tracking. Each card shows drag handle, icon, title, action-specific input (text/range/select), delete button.

10. src/components/ShortcutCard.tsx

File Path: /src/components/ShortcutCard.tsx

Props: shortcut, shade, onShadeChange, onEditFlow, onRename, onDelete, onRun, execution

Current Logic: Individual shortcut card for Library grid. Displays shade selector (3 color dots: light/medium/dark), action icons (max 4 + overflow count), hotkey badge, execution log animation (step-by-step with status), and dropdown menu (Edit Flow / Rename / Delete). Run/Re-run button.

11. src/components/ComboBuilder.tsx

File Path: /src/components/ComboBuilder.tsx

Props: onApply, onError

Current Logic: Dropdown-based hotkey builder. Starts with 1 modifier + 1 key. Add/remove modifier and key slots with +/- buttons. Validates at least 1 modifier + 1 key before applying. Outputs formatted string like "Ctrl + Shift + P". Modifiers always come first in output. Used by both Builder and SettingsBlockedTriggers.

12. src/components/BlockedTriggerList.tsx

File Path: /src/components/BlockedTriggerList.tsx

Props: triggers, osCritical, onRemove

Current Logic: Searchable list of blocked triggers. Search input intercepts modifier combos (Ctrl+V types "Ctrl + V" into search). Each trigger row shows code-styled text + delete button. OS-critical triggers show yellow OS badge. No pending state — warning is handled by modal.

13. src/components/OSCriticalWarningModal.tsx

File Path: /src/components/OSCriticalWarningModal.tsx

Props: trigger, onConfirm, onCancel

Current Logic: Danger-themed modal for deleting system-critical triggers. Centered red exclamation icon (error) in red-tinted circle. Warning message explains the trigger may interfere with system behavior. Shows trigger name in code block. Two buttons: Cancel (border) and Delete Anyway (red). Uses theme colors (text-foreground, text-muted-foreground).

14. src/components/RenameModal.tsx

File Path: /src/components/RenameModal.tsx

Current Logic: Reusable rename modal with auto-focused input, Enter/Escape key support, Save/Cancel buttons.

15. src/components/DeleteModal.tsx

File Path: /src/components/DeleteModal.tsx

Current Logic: Reusable delete confirmation modal with warning icon, Cancel/Delete buttons.

16. src/components/SettingsGeneral.tsx

File Path: /src/components/SettingsGeneral.tsx

Current Logic: General settings section. Title: "General" (font-title-sm). Themed card with 3 toggle rows: "Start LazyCow at startup", "Keep in System Tray", "Execution Notifications". Shade picker below card (Light/Medium/Dark).

17. src/components/SettingsData.tsx

File Path: /src/components/SettingsData.tsx

Current Logic: Data & Backup section. Title: "Data & Backup" (font-title-sm). Themed card with 3 buttons: Export Workspace (downloads JSON with shortcuts + blocked triggers + settings), Import Workspace (file picker, reloads on success), Open AppData Folder (placeholder for Electron shell).

18. src/components/SettingsBlockedTriggers.tsx

File Path: /src/components/SettingsBlockedTriggers.tsx

Current Logic: Blocked Triggers section. Title: "Blocked Triggers (N)" (font-title-sm) with expand/collapse chevron. Themed card wraps search, trigger list with OS-critical badges, record button, ComboBuilder, and "Mark as system-critical" checkbox. Handles add (with duplicate + conflict checks), remove (with OSCriticalWarningModal for critical triggers). OS-critical list persisted to lazycow-os-critical-triggers. 17 default OS-critical triggers. Shade picker for card color.

19. src/components/SettingsDangerZone.tsx

File Path: /src/components/SettingsDangerZone.tsx

Current Logic: Danger Zone section. Title: "Danger Zone" (font-title-sm, red). Factory Reset with 3-step confirmation: "Wipe All Data" → "Yes, I'm sure" → Type "DELETE" to confirm (case-insensitive). Calls localStorage.clear() + window.location.reload().

20. src/components/SettingsFooter.tsx

File Path: /src/components/SettingsFooter.tsx

Current Logic: Footer with app version (v1.0.0), project info, team names, supervisor.

E. Workspace Pages
21. src/pages/Library.tsx

File Path: /src/pages/Library.tsx

Props: setActiveTab, onEditShortcut

Current Logic: Loads shortcuts from localStorage on mount (via key prop remount from App). Grid layout with 2/3/4 column toggle. Search filters by name/description. Empty state with CTA to Builder. Card shade management per card. Rename modal with localStorage update. Delete confirmation modal. Execution simulator with step-by-step logging and 10-second auto-reset. "Edit Flow" sends shortcut data to Builder via onEditShortcut. "New Shortcut" button navigates to Builder.

22. src/pages/Builder.tsx

File Path: /src/pages/Builder.tsx

Props: editData, onUnsavedChanges, onSaveSuccess

Current Logic: Shortcut builder with empty initial state. Loads editData for editing existing shortcuts. Real-time hotkey validation via useEffect: checks modifier-first rule (Ctrl/Alt/Shift/Win must be first), blocked triggers, duplicate triggers against existing shortcuts (excluding current if editing). Shows inline errors below trigger button. Save validates: name required, description required, at least 1 action, hotkey valid (no errors). Writes to localStorage (new or update), resets form, calls onSaveSuccess. Discard button clears all fields. ComboBuilder for OS-level shortcuts. Collapsible action sidebar (ActionSidebar). Trigger section with record button + info tooltip + ComboBuilder. Remounted via builderKey on save/discard.

23. src/pages/Settings.tsx

File Path: /src/pages/Settings.tsx

Current Logic: Orchestrates Settings sub-components. Manages LocalSettings state (startAtLogin, keepInTray, executionNotifications, generalShade, dataShade) with localStorage persistence via lazycow_settings. Renders: SettingsGeneral, SettingsData, SettingsBlockedTriggers, SettingsDangerZone, SettingsFooter. All section titles use uniform font-title-sm text-title-sm (18px).

5. OPERATIONAL GUIDELINES FOR THE AI ASSISTANT
Whenever the user prompts you to modify, write, or debug features, you must follow these instructions:

TypeScript & Tailwind Integration: Always output strongly-typed React TypeScript (.tsx) code. Never write inline styling; use semantic Tailwind CSS variables (text-foreground, bg-background, border-border, bg-card-light, etc.) to keep dynamic themes functional.

Translate Raw Mockups Correctly: When given a raw HTML layout mockup, convert all static selectors into React-managed hook models. Replace direct DOM manipulations (getElementById, inline script handlers) with dynamic JSX state trackers.

Preserve Antialiasing Settings: Do not introduce global will-change properties on text containers, as this degrades font rendering on Windows displays.

Confirm Named Exports: Match the named export standard of files (e.g., export const Library: React.FC = () => ...).

State Clearances: Ensure any timers, execution loops, or listeners utilize useEffect or useRef cleanup routines to prevent memory leaks inside the Electron application.

Page Mounting: Pages are kept mounted and shown/hidden via CSS (.page-container.active). Use key props to force remounts when data needs refreshing, not conditional rendering.

Hotkey Recording: Use the shared useHotkeyRecorder hook for any hotkey recording features. Do not duplicate recording logic.

Dropdown Builder: Use the shared ComboBuilder component for manual hotkey construction. Modifiers always come first in the output string.

Data Flow: Builder saves to localStorage → onSaveSuccess → App increments libraryRefreshKey → Library remounts → reads fresh data. App increments builderKey → Builder remounts fresh.

Theme Shade Classes: Use the standard shade map: light: 'from-card-light to-card-medium text-card-light-fg', medium: 'from-card-medium to-card-dark text-card-medium-fg', dark: 'from-card-dark to-primary text-card-dark-fg'.

OS-Critical Triggers: Use OSCriticalWarningModal for delete confirmations. Store user-marked critical triggers in lazycow-os-critical-triggers.

Section Titles: All settings section titles use font-title-sm text-title-sm (18px) for consistency.

6. ⚠️ MANDATORY CONTEXT UPDATE PROTOCOL (CRITICAL)
Whenever you provide code that creates a new file or modifies the structure of an existing file, you must append a Context Update Alert at the very end of your response.

This alert must contain:

An explicit instruction asking the user to update their local LAZYCOW_CONTEXT.md file.

The exact Markdown block showing how the directory layout or codebase registries in this context file should be updated to reflect the new change.

7. PROJECT STATUS & NEXT STEPS
Completed:

✅ Electron container with ClearType optimizations

✅ Splash screen with font preloading

✅ Collapsible main sidebar (64px/260px)

✅ Three themes (Coffee, Ocean, Forest) with light/dark modes

✅ Themeable card shade system (light/medium/dark)

✅ Custom thin themed scrollbar

✅ Page transition system (CSS show/hide with fade-in)

✅ Library: localStorage persistence, shortcut cards, grid layout, search, edit/rename/delete, execution simulator

✅ Builder: full action catalog (10 actions, 3 groups), collapsible action sidebar, drag-to-add, drag-reorder, arrow reorder, hotkey recording (shared hook), ComboBuilder dropdown, real-time validation, modifier-first enforcement, blocked/duplicate trigger detection, required field validation, edit existing shortcuts

✅ Settings: General (startup/tray/notifications), Data & Backup (export/import), Blocked Triggers (record/build/search/delete with OS-critical warnings), Danger Zone (3-step factory reset with DELETE confirmation)

✅ Unsaved changes modal when leaving Builder

✅ OS-critical trigger system: user-marked critical triggers, danger modal on delete, yellow OS badges

✅ "Open File" action in Apps & Web group

Next Development Goals:

Implement "Test Flow" button in Builder

Electron main process: global shortcut registration, actual shortcut execution engine

Community and Account pages (currently placeholder)

Voice module integration

Splash screen design refresh via Stitch

text

---

Save this over your existing `LAZYCOW_CONTEXT.md`. It includes all new files (`OSCriticalWarningModal.tsx`), updated component descriptions (OS-critical system, modal flow), corrected action catalog grouping, and the `lazycow-os-critical-triggers` storage key. 😊