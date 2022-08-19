import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const Dark = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    background: '#272727',
    primary: '#8BC34A',
    card: '#FF9800',
    border: '#FF5252',
    text: 'white',
    notification: 'black',
    listItem: '#272727',
  },
};

export const Default = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#f0f0f0',
    primary: '#8BC34A',
    card: '#FF9800',
    border: '#FF5252',
    text: 'black',
    notification: 'white',
    listItem: 'rgba(247,247,247,1.0)',
  },
};
