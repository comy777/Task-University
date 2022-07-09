import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export const Dark = {
	...DarkTheme,
	dark: true,
	colors: {
		...DarkTheme.colors,
		background: 'black',
		primary: '#8BC34A',
		card: '#FF9800',
		border: '#FF5252',
		text: 'white',
		notification: 'black'
	}
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
		notification: 'white'
	}
};
