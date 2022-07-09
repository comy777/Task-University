import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './AuthRoutes';
import Header from '../components/Header';
import { Dark, Default } from '../theme/theme';
import useContextApp from '../hooks/useContextApp';
import BottomRoutes from './BottomRoutes';
import { useColorScheme } from 'react-native';
import useUser from '../hooks/useUser';

const AppRoutes = () => {
	const { themeDark, token, setTheme, handleGetTheme, themeSystem } = useContextApp();
	const theme = useColorScheme();
	const { handleGetToken } = useUser();
	useEffect(
		() => {
			handleGetTheme();
			if (themeSystem) {
				if (theme === 'dark') {
					if (!themeDark) setTheme();
				}
				if (theme === 'light') {
					if (themeDark) setTheme();
				}
			}
		},
		[ theme ]
	);
	useEffect(
		() => {
			handleGetToken();
		},
		[ token ]
	);
	return (
		<NavigationContainer theme={themeDark ? Dark : Default}>
			<Header />
			{token ? <BottomRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
};

export default AppRoutes;
