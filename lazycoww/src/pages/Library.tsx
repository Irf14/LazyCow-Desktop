import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SavedShortcut } from '../types/actions';
import { ShortcutCard } from '../components/ShortcutCard';
import { RenameModal } from '../components/RenameModal';
import { DeleteModal } from '../components/DeleteModal';

interface LibraryProps {
  setActiveTab: (tab: string) => void;
  onEditShortcut: (shortcut: SavedShortcut) => void;
}

export const Library: React.FC<LibraryProps> = ({ setActiveTab, onEditShortcut }) => {
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(2);
  const [searchQuery, setSearchQuery] = useState('');

  // ── Shortcuts from localStorage ──
  const [shortcuts, setShortcuts] = useState<SavedShortcut[]>(() =>
    JSON.parse(localStorage.getItem('lazycow-shortcuts') || '[]')
  );

  const refreshShortcuts = useCallback(() => {
    setShortcuts(JSON.parse(localStorage.getItem('lazycow-shortcuts') || '[]'));
  }, []);

  // Refresh whenever this component becomes visible (activeTab changes to 'library')
useEffect(() => { refreshShortcuts(); }, [refreshShortcuts]);

  // ── Execution simulation ──
  const [executions, setExecutions] = useState<Record<string, { status: 'idle' | 'running' | 'success'; currentStepIndex: number }>>({});
  const resetTimers = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => () => { Object.values(resetTimers.current).forEach(clearTimeout); }, []);

  const runShortcut = async (id: string) => {
    if (resetTimers.current[id]) clearTimeout(resetTimers.current[id]);
    const card = shortcuts.find((s) => s.id === id);
    if (!card) return;
    const total = card.actions.length;

    setExecutions((p) => ({ ...p, [id]: { status: 'running', currentStepIndex: 0 } }));
    for (let i = 0; i < total; i++) {
      setExecutions((p) => ({ ...p, [id]: { status: 'running', currentStepIndex: i } }));
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));
    }
    setExecutions((p) => ({ ...p, [id]: { status: 'success', currentStepIndex: total } }));
    resetTimers.current[id] = setTimeout(() => {
      setExecutions((p) => ({ ...p, [id]: { status: 'idle', currentStepIndex: -1 } }));
    }, 10000);
  };

  // ── Card shades ──
  const [cardShades, setCardShades] = useState<Record<string, 'light' | 'medium' | 'dark'>>({});

  // ── Rename ──
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const handleRename = (id: string) => {
    const s = shortcuts.find((sc) => sc.id === id);
    if (s) { setRenameValue(s.name); setRenameId(id); }
  };

  const handleRenameSave = () => {
    if (renameId && renameValue.trim()) {
      const updated = shortcuts.map((s) => s.id === renameId ? { ...s, name: renameValue.trim() } : s);
      setShortcuts(updated);
      localStorage.setItem('lazycow-shortcuts', JSON.stringify(updated));
    }
    setRenameId(null);
  };

  // ── Delete ──
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deleteId) {
      const updated = shortcuts.filter((s) => s.id !== deleteId);
      setShortcuts(updated);
      localStorage.setItem('lazycow-shortcuts', JSON.stringify(updated));
    }
    setDeleteId(null);
  };

  // ── Filter ──
  const filtered = shortcuts.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 p-margin-page w-full max-w-container-max mx-auto overflow-y-auto pb-32">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2 bg-card-light p-1 rounded-lg border border-border">
          {([2, 3, 4] as const).map((n) => (
            <button key={n} onClick={() => setGridCols(n)}
              className={`p-1.5 rounded transition-colors ${gridCols === n ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
              title={`${n} Columns`}>
              <span className="material-symbols-outlined text-[20px]">{n === 2 ? 'splitscreen' : n === 3 ? 'view_column' : 'grid_view'}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[18px]">search</span>
            <input type="text" placeholder="Search shortcuts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card-light border border-border rounded-full py-2 pl-9 pr-4 text-body-sm focus:outline-none focus:border-primary transition-colors text-foreground" />
          </div>
          <button onClick={() => { setActiveTab('builder'); }}
            className="shrink-0 bg-primary text-primary-foreground px-4 py-2 rounded-full font-label-caps text-label-caps flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-[16px]">add</span> New Shortcut
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-6xl text-muted-foreground/50 mb-4">auto_awesome</span>
          <h2 className="font-title-sm text-foreground text-xl mb-2">No shortcuts yet</h2>
          <p className="text-muted-foreground font-body-md mb-6">Create your first shortcut in the Builder to see it here.</p>
          <button onClick={() => setActiveTab('builder')} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-title-sm hover:opacity-90 transition-opacity">Go to Builder</button>
        </div>
      )}

      {/* Grid */}
      <div className={`grid grid-cols-1 gap-gutter transition-all duration-300 ${
        gridCols === 2 ? 'md:grid-cols-2' : gridCols === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {filtered.map((card) => (
          <ShortcutCard
            key={card.id}
            shortcut={card}
            shade={cardShades[card.id] || 'medium'}
            onShadeChange={(s) => setCardShades((p) => ({ ...p, [card.id]: s }))}
            onEditFlow={onEditShortcut}
            onRename={handleRename}
            onDelete={setDeleteId}
            onRun={runShortcut}
            execution={executions[card.id]}
          />
        ))}
      </div>

      {/* Modals */}
      {renameId && <RenameModal value={renameValue} onChange={setRenameValue} onSave={handleRenameSave} onCancel={() => setRenameId(null)} />}
      {deleteId && <DeleteModal onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}
    </main>
  );
};