// Chess.com-inspired color palette
export const lightColors = {
  background: '#1a1a1a',
  surface: '#262421',
  text: '#f0ead8',
  textSecondary: '#b8a890',
  textTertiary: '#7a7264',
  primary: '#81b64c',
  primaryDark: '#5f8f30',
  border: '#3d3530',
  boardLight: '#eeeed2',
  boardDark: '#769656',
  boardHighlight: '#f6f669',
  boardLastMove: '#cdd26a',
  capturedLight: '#3d3530',
  capturedDark: '#e0d8c8',
  check: '#e74c3c',
  promotion: 'rgba(0,0,0,0.8)',
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
  boardHighlight: '#fc97f',
  boardLastMove: '#baca44',
  capturedLight: '#3d3d3d',
  capturedDark: '#e0e0e0',
  check: '#e57373',
  promotion: 'rgba(255,255,255,0.3)',
};

export type ColorScheme = typeof lightColors;