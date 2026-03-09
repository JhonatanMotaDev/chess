export const lightColors = {
  background: 'rgb(242, 242, 236)',
  surface: 'rgb(255, 255, 255)',
  text: 'rgb(0, 128, 28)',
  textSecondary: 'rgb(0, 0, 0)',
  textTertiary: 'rgb(0, 144, 31)',

  primary: 'rgb(129, 182, 76)',
  primaryDark: 'rgb(106, 154, 61)',

  border: 'rgb(208, 208, 208)',
  boardLight: 'rgb(245, 240, 240)',
  boardDark: 'rgb(48, 99, 70)',

  boardHighlight: 'rgb(255, 231, 77)',
  boardLastMove: 'rgb(209, 255, 91)',

  capturedLight: 'rgb(214, 214, 214)',
  capturedDark: 'rgb(61, 61, 61)',

  check: 'rgb(231, 76, 60)',
  promotion: 'rgba(0, 0, 0, 0.6)',
};

export const darkColors = {
  background: 'rgb(13, 13, 13)',
  surface: 'rgb(28, 28, 30)',

  text: 'rgb(255, 255, 255)',
  textSecondary: 'rgb(142, 142, 147)',
  textTertiary: 'rgb(99, 99, 102)',

  primary: 'rgb(0, 146, 63)',
  primaryDark: 'rgb(106, 154, 61)',

  border: 'rgb(44, 44, 46)',

  boardLight: 'rgb(238, 238, 210)',
  boardDark: 'rgb(48, 99, 70)',

  boardHighlight: 'rgb(255, 231, 77)',
  boardLastMove: 'rgb(209, 255, 91)',

  capturedLight: 'rgb(58, 58, 58)',
  capturedDark: 'rgb(232, 232, 232)',

  check: 'rgb(255, 107, 107)',
  promotion: 'rgba(0, 0, 0, 0.8)',
};

export type ColorScheme = typeof lightColors;