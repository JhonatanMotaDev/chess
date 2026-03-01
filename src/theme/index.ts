import { useSettingsStore } from '@/store/settingsStore';
import { lightColors, darkColors, ColorScheme } from './colors';

export function useTheme(): { colors: ColorScheme; isDark: boolean } {
  const theme = useSettingsStore((state) => state.theme);

  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return { colors, isDark };
}
