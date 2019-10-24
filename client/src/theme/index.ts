import * as styledComponents from 'styled-components';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export interface IThemeInterface {
  menuBackActive: string;
  menuColorNormal: string;
  lightGray: string;
  text: string;
  blue: string;
  orange: string;
  green: string;
  breakLine: string;
  grayBack: string;
  extraLightGray: String;
  lightBlue: String;
  extraLightBlue: String;
}

export const theme = {
  menuBackActive: '#4F4F4F',
  menuColorNormal: '#1C3B09',
  lightGray: '#888888',
  text: '#4D4D4D',
  blue: '#0080A7',
  orange: '#FFA700',
  green: '#569600',
  breakLine: '#DDDDDD',
  grayBack: '#FAFAFA',
  extraLightGray: '#D0D0D0',
  lightBlue: '#726b9c',
  extraLightBlue: '#928ab0',
};

export default styled;
export { css, createGlobalStyle, keyframes, ThemeProvider };
