import { Alert, ToastAndroid } from 'react-native';
import { AlertProps } from '../interfaces/data';

export const showToast = (message: string) => {
	ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showAlert = ({ title, message, onPress }: AlertProps) => {
	Alert.alert(title, message, [
		{
			text: 'Cancelar',
			style: 'cancel'
		},
		{
			text: title,
			style: 'destructive',
			onPress
		}
	]);
};
