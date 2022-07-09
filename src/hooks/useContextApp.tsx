import { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { AppContext } from '../context/AppContext';
import { getData, saveData } from '../utils/storage';

const useContextApp = () => {
	const {
		themeDark,
		setTheme,
		visible,
		setVisible,
		loadingAuth,
		setLoadingAuth,
		setToken,
		token,
		appState,
		setUser,
		user,
		themeSystem,
		setThemeSystem
	} = useContext(AppContext);
	const theme = useColorScheme();
	const handleGetTheme = async () => {
		const theme = await getData('themeDark');
		if (theme === 'dark') {
			setThemeSystem();
			setTheme();
		}
	};
	const handleSetTheme = async (type: string) => {
		if (type === 'system') {
			setThemeSystem();
			await saveData('themeDark', 'false');
			if (theme === 'dark') {
				if (!themeDark) setTheme();
			} else {
				if (themeDark) setTheme();
			}
		} else {
			setTheme();
			themeDark ? await saveData('themeDark', 'false') : await saveData('themeDark', 'dark');
		}
	};

	return {
		themeDark,
		setTheme,
		visible,
		setVisible,
		loadingAuth,
		setLoadingAuth,
		setToken,
		token,
		setUser,
		user,
		...appState,
		handleSetTheme,
		themeSystem,
		handleGetTheme
	};
};

export default useContextApp;
