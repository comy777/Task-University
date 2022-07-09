import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BtnProps } from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import Loading from './Loading';

const Btn = ({ title, onPress, disabled, style, loading, styleText }: BtnProps) => {
	const { styles } = useStyles();
	return (
		<View style={style ? style : styles.btnContainer}>
			{loading ? (
				<Loading />
			) : (
				<TouchableOpacity activeOpacity={0.7} onPress={onPress} disabled={disabled}>
					<Text style={styleText ? styleText : styles.btnText}>{title}</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Btn;
