import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Library } from './pages/Library';
import { Builder } from './pages/Builder';
import Settings from './pages/Settings';
import { SavedShortcut } from './types/actions';

type ThemeName = 'coffee' | 'ocean' | 'forest';

function App() {
  const [activeTab, setActiveTab] = useState<string>('library');
  const [theme, setThemeState] = useState<ThemeName>('coffee');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [appReady, setAppReady] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [libraryRefreshKey, setLibraryRefreshKey] = useState(0);
  const [builderKey, setBuilderKey] = useState(0);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editShortcut, setEditShortcut] = useState<SavedShortcut | null>(null);

  useEffect(() => {
    const init = async () => {
      try { await document.fonts.ready; } catch {}
      await new Promise((r) => setTimeout(r, 400));
      const splash = document.getElementById('splash-screen');
      if (splash) splash.classList.add('hidden');
      setTimeout(() => { if (splash) splash.remove(); }, 500);
      setAppReady(true);
    };
    init();
  }, []);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('lazycow-theme') as ThemeName) || 'coffee';
    const savedDark = localStorage.getItem('lazycow-dark') === 'true';
    setThemeState(savedTheme);
    setDarkModeState(savedDark);
    document.body.classList.add(`theme-${savedTheme}`);
    if (savedDark) document.documentElement.classList.add('dark');
  }, []);

  const setTheme = (themeName: ThemeName) => {
    setThemeState(themeName);
    localStorage.setItem('lazycow-theme', themeName);
    document.body.classList.remove('theme-coffee', 'theme-ocean', 'theme-forest');
    document.body.classList.add(`theme-${themeName}`);
  };

  const setDarkModeState = (isDark: boolean) => {
    setDarkMode(isDark);
    localStorage.setItem('lazycow-dark', String(isDark));
    isDark ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark');
  };

  const toggleDarkMode = () => setDarkModeState(!darkMode);

  const handleTabClick = useCallback((tab: string) => {
    if (activeTab === 'builder' && hasUnsavedChanges && tab !== 'builder') {
      setPendingTab(tab);
      setShowConfirmModal(true);
      return;
    }
    setActiveTab(tab);
    if (activeTab === 'builder') setEditShortcut(null);
    if (tab === 'library') setLibraryRefreshKey((k) => k + 1);
  }, [activeTab, hasUnsavedChanges]);

  const handleConfirmLeave = () => {
    setShowConfirmModal(false);
    setHasUnsavedChanges(false);
    setEditShortcut(null);
    setBuilderKey((k) => k + 1);
    if (pendingTab) { setActiveTab(pendingTab); setPendingTab(null); }
    setLibraryRefreshKey((k) => k + 1);
  };

  const handleCancelLeave = () => { setShowConfirmModal(false); setPendingTab(null); };
  const handleEditShortcut = (shortcut: SavedShortcut) => { setEditShortcut(shortcut); setActiveTab('builder'); };

  const handleSaveSuccess = () => {
    setHasUnsavedChanges(false);
    setEditShortcut(null);
    setLibraryRefreshKey((k) => k + 1);
    setBuilderKey((k) => k + 1);
  };

  const sidebarWidth = sidebarCollapsed ? '64px' : '260px';

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar activeTab={activeTab} onTabClick={handleTabClick} collapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed((p) => !p)} />

      <div className="flex-1 flex flex-col relative z-10 min-h-screen" style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s ease' }}>
        <header className="bg-background/95 w-full h-16 flex items-center justify-between px-margin-page z-10 sticky top-0 border-b border-border/30">
          <div className="flex items-center">
            <h1 className="font-title-sm text-title-sm text-foreground tracking-tight transition-colors duration-300 capitalize">
              {activeTab === 'builder' && editShortcut ? `Editing: ${editShortcut.name}` : `${activeTab} Overview`}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Coffee Theme" className={`p-2 hover:text-primary hover:bg-muted rounded-full flex items-center justify-center scale-95 duration-150 transition-colors ${theme === 'coffee' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setTheme('coffee')}><span className="material-symbols-outlined">coffee</span></button>
            <button aria-label="Ocean Theme" className={`p-2 hover:text-primary hover:bg-muted rounded-full flex items-center justify-center scale-95 duration-150 transition-colors ${theme === 'ocean' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setTheme('ocean')}><span className="material-symbols-outlined">water_drop</span></button>
            <button aria-label="Forest Theme" className={`p-2 hover:text-primary hover:bg-muted rounded-full flex items-center justify-center scale-95 duration-150 transition-colors ${theme === 'forest' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setTheme('forest')}><span className="material-symbols-outlined">forest</span></button>
            <div className="w-px h-6 bg-border mx-2 transition-colors duration-300" />
            <button aria-label="Toggle Dark Mode" className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-muted rounded-full flex items-center justify-center scale-95 duration-150"
              onClick={toggleDarkMode}><span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span></button>
          </div>
        </header>

        <div className={`page-container ${activeTab === 'library' ? 'active' : ''}`}>
          {appReady && <Library key={libraryRefreshKey} setActiveTab={handleTabClick} onEditShortcut={handleEditShortcut} />}
        </div>

        <div className={`page-container ${activeTab === 'builder' ? 'active' : ''}`}>
          {appReady && <Builder key={builderKey} editData={editShortcut} onUnsavedChanges={setHasUnsavedChanges} onSaveSuccess={handleSaveSuccess} />}
        </div>

        <div className={`page-container ${activeTab === 'settings' ? 'active' : ''}`}>
          {appReady && <Settings />}
        </div>

        <div className={`${activeTab === 'community' ? 'flex-1 flex items-center justify-center' : 'hidden'}`}>
          <div className="text-center max-w-md p-margin-page">
            <span className="material-symbols-outlined text-muted-foreground text-5xl mb-4">groups</span>
            <h2 className="text-xl font-bold font-headline-md text-foreground">Community Hub</h2>
            <p className="text-muted-foreground mt-2 font-body-md">Coming Soon! Connect, share workflows, and discover custom productivity recipes.</p>
          </div>
        </div>

        <div className={`${activeTab === 'account' ? 'flex-1 flex items-center justify-center' : 'hidden'}`}>
          <div className="text-center max-w-md p-margin-page">
            <span className="material-symbols-outlined text-muted-foreground text-5xl mb-4">account_circle</span>
            <h2 className="text-xl font-bold font-headline-md text-foreground">My Profile</h2>
            <p className="text-muted-foreground mt-2 font-body-md">Coming Soon! Synchronize preferences across devices and secure your local configurations.</p>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={handleCancelLeave} />
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center gap-4">
              <span className="material-symbols-outlined text-5xl text-yellow-500">warning</span>
              <h2 className="font-title-sm text-foreground text-xl">Unsaved Changes</h2>
              <p className="text-muted-foreground font-body-md">You have unsaved changes in the Builder. If you leave now, your progress will be lost.</p>
              <div className="flex gap-3 w-full mt-2">
                <button onClick={handleCancelLeave} className="flex-1 px-6 py-2.5 border border-border rounded-full font-title-sm hover:bg-muted transition-colors text-foreground">Stay</button>
                <button onClick={handleConfirmLeave} className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-full font-title-sm hover:bg-red-600 transition-colors shadow-md">Leave Anyway</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;