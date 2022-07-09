import React from 'react';
import { View, KeyboardAvoidingView, TextInput } from 'react-native';
import useStyles from '../../hooks/useStyles';
import InputIcon from '../../components/InputIcon';
import Btn from '../../components/Btn';
import useAuth from '../../hooks/useAuth';
import useContextApp from '../../hooks/useContextApp';
import { AuthProps } from '../../interfaces/components';

const Register = (props: AuthProps) => {
	const { styles } = useStyles();
	const { email, password, handleChangeText, username, repeatPassword, handleRegister, loadingAuth } = useAuth({
		...props,
		type: 'register'
	});
	const { visible, setVisible } = useContextApp();
	return (
		<KeyboardAvoidingView style={{ flex: 1 }}>
			<View style={styles.containerCenter}>
				<TextInput
					placeholder="Nombres"
					style={styles.inputContainer}
					value={username}
					onChangeText={(value) => handleChangeText(value, 'username')}
					placeholderTextColor={styles.textColorTheme.color}
				/>
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
				<TextInput
					placeholder="Repetir contraseña"
					style={styles.inputContainer}
					value={repeatPassword}
					onChangeText={(value) => handleChangeText(value, 'repeatPassword')}
					secureTextEntry={visible}
					placeholderTextColor={styles.textColorTheme.color}
				/>
				<Btn title="Crear cuenta" onPress={handleRegister} loading={loadingAuth} disabled={loadingAuth} />
			</View>
		</KeyboardAvoidingView>
	);
};

export default Register;
