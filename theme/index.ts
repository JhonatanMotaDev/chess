import { useSettingsStore } from '@/store/settingsStore';

const lightColors = {
  background: '#fff',
  surface: '#f5f5f5',
  text: '#000',
  textSecondary: '#666',
  primary: '#007aff',
  border: '#ddd',
};

const darkColors = {
  background: '#000',
  surface: '#1a1a1a',
  text: '#fff',
  textSecondary: '#ccc',
  primary: '#0a84ff',
  border: '#333',
};

export const useTheme = () => {
  const { theme } = useSettingsStore();
  const colors = theme === 'dark' ? darkColors : lightColors;
  return { colors };
};
