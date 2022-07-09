import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useStyles from '../hooks/useStyles';
import { InputIconProps } from '../interfaces/components';

const InputIcon = ({ icon, onPress, visible, onChangeText, value }: InputIconProps) => {
	const { styles, colors } = useStyles();
	return (
		<View style={{ ...styles.inputContainer, ...styles.inputIcon }}>
			<TextInput
				placeholder="Contraseña"
				style={{ width: '90%', color: colors.text }}
				secureTextEntry={visible}
				onChangeText={onChangeText}
				value={value}
				placeholderTextColor={styles.textColorTheme.color}
			/>
			<Icon name={icon} size={28} style={{ width: 30 }} onPress={onPress} color={colors.text} />
		</View>
	);
};

export default InputIcon;
