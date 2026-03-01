import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Theme = 'light' | 'dark';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'master';

export interface SettingsState {
  theme: Theme;
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  undoEnabled: boolean;
  playerElo: number;
  engineElo: Record<Difficulty, number>;
  setTheme: (theme: Theme) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setHapticsEnabled: (enabled: boolean) => void;
  setUndoEnabled: (enabled: boolean) => void;
  setPlayerElo: (elo: number) => void;
}

const defaultEngineElo: Record<Difficulty, number> = {
  beginner: 800,
  intermediate: 1200,
  advanced: 1600,
  master: 2200,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'light',
      soundEnabled: true,
      hapticsEnabled: true,
      undoEnabled: true,
      playerElo: 1200,
      engineElo: defaultEngineElo,
      setTheme: (theme) => set({ theme }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
      setUndoEnabled: (undoEnabled) => set({ undoEnabled }),
      setPlayerElo: (playerElo) => set({ playerElo }),
    }),
    {
      name: 'chess-settings',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        hapticsEnabled: state.hapticsEnabled,
        undoEnabled: state.undoEnabled,
        playerElo: state.playerElo,
      }),
    }
  )
);
