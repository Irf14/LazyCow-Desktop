import React, { useState, useEffect } from 'react';
import { SettingsGeneral } from '../components/SettingsGeneral';
import { SettingsBlockedTriggers } from '../components/SettingsBlockedTriggers';
import { SettingsDangerZone } from '../components/SettingsDangerZone';
import { SettingsFooter } from '../components/SettingsFooter';

type Shade = 'light' | 'medium' | 'dark';

interface LocalSettings {
  startAtLogin: boolean;
  keepInTray: boolean;
  executionNotifications: boolean;
  generalShade: Shade;
  dataShade: Shade;
}

const DEFAULT_SETTINGS: LocalSettings = {
  startAtLogin: true,
  keepInTray: true,
  executionNotifications: true,
  generalShade: 'light',
  dataShade: 'light',
};

export default function Settings() {
  const [settings, setSettings] = useState<LocalSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const stored = localStorage.getItem('lazycow_settings');
    if (stored) {
      try { setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) }); } catch { /* ignore */ }
    }
  }, []);

  const updateSetting = (key: string, value: any) => {
  const updated = { ...settings, [key]: value };
  setSettings(updated);
  localStorage.setItem('lazycow_settings', JSON.stringify(updated));
};

  return (
    <main className="flex-1 p-margin-page w-full overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-32">
        <SettingsGeneral settings={settings} onUpdate={updateSetting} />
        <SettingsBlockedTriggers />
        <SettingsDangerZone />
        <SettingsFooter />
      </div>
    </main>
  );
}