import React, { useEffect } from 'react';
import { View, TextInput, useColorScheme } from 'react-native';
import InputIcon from '../../components/InputIcon';
import useAuth from '../../hooks/useAuth';
import Btn from '../../components/Btn';
import { AuthProps } from '../../interfaces/components';
import useContextApp from '../../hooks/useContextApp';

const Login = (props: AuthProps) => {
	const {
		email,
		password,
		handleChangeText,
		handleNavigate,
		handleLogin,
		styles,
		visible,
		setVisible,
		loadingAuth
	} = useAuth({ ...props, type: 'login' });
	const { setTheme, themeDark } = useContextApp();
	const theme = useColorScheme();
	useEffect(() => {
		if (theme === 'dark') {
			if (!themeDark) setTheme();
		} else {
			if (themeDark) setTheme();
		}
	}, []);
	return (
		<View style={styles.containerCenter}>
			<TextInput
				placeholder="Correo electronico"
				style={styles.inputContainer}
				value={email}
				onChangeText={(value) => handleChangeText(value, 'email')}
				placeholderTextColor={styles.textColorTheme.color}
			/>
			<InputIcon
				icon={visible ? 'eye-outline' : 'eye-off-outline'}
				onPress={setVisible}
				visible={visible}
				value={password}
				onChangeText={(value) => handleChangeText(value, 'password')}
			/>
			<Btn title="Iniciar sesion" onPress={handleLogin} loading={loadingAuth} disabled={loadingAuth} />
			<Btn
				title="Crear cuenta"
				style={{}}
				styleText={styles.btnTextDefault}
				onPress={handleNavigate}
				disabled={loadingAuth}
			/>
		</View>
	);
};

export default Login;
