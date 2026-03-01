export const lightColors = {
  background: '#f5f5f0',
  surface: '#ffffff',
  text: '#1a1a1a',
  textSecondary: '#4a4a4a',
  textTertiary: '#6b6b6b',
  primary: '#2e7d32',
  primaryDark: '#1b5e20',
  border: '#e0e0e0',
  boardLight: '#f0d9b5',
  boardDark: '#b58863',
  boardHighlight: '#7fc97f',
  boardLastMove: '#cdd26a',
  capturedLight: '#e8e8e8',
  capturedDark: '#2d2d2d',
  check: '#f44336',
  promotion: 'rgba(0,0,0,0.5)',
};

export const darkColors = {
  background: '#121212',
  surface: '#1e1e1e',
  text: '#f5f5f5',
  textSecondary: '#b0b0b0',
  textTertiary: '#808080',
  primary: '#4caf50',
  primaryDark: '#388e3c',
  border: '#333333',
  boardLight: '#eeeed2',
  boardDark: '#769656',
  boardHighlight: '#7fc97f', // fixed
  boardLastMove: '#baca44',
  capturedLight: '#3d3d3d',
  capturedDark: '#e0e0e0',
  check: '#e57373',
  promotion: 'rgba(255,255,255,0.3)',
};

export type ColorScheme = typeof lightColors;