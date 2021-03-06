import { useTheme } from '@react-navigation/native';
import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const useStyles = () => {
	const { colors } = useTheme();
	const styles = StyleSheet.create({
		header: {
			height: 70,
			width,
			backgroundColor: colors.primary,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 25
		},
		iconProfile: {
			height: 55,
			width: 55,
			borderRadius: 27.5
		},
		headerText: {
			fontSize: 20,
			fontWeight: 'bold',
			color: '#f0f0f0'
		},
		container: {
			flex: 1,
			padding: 15
		},
		containerCenter: {
			flex: 1,
			padding: 15,
			justifyContent: 'center',
			alignItems: 'center'
		},
		inputContainer: {
			height: 70,
			width: '100%',
			borderRadius: 15,
			borderWidth: 1,
			borderColor: colors.primary,
			justifyContent: 'center',
			padding: 15,
			color: colors.text,
			marginVertical: 5
		},
		inputIcon: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center'
		},
		btnContainer: {
			height: 70,
			width: 150,
			backgroundColor: colors.primary,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 15,
			marginVertical: 15
		},
		btnText: {
			color: '#f0f0f0',
			fontSize: 18,
			fontWeight: 'bold'
		},
		btnTextDefault: {
			color: colors.text,
			fontSize: 16
		},
		loadingFull: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		fabContainerAround: {
			height: 80,
			width: 80,
			borderRadius: 45,
			backgroundColor: '#f0f0f0',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			bottom: 15
		},
		fabContainer: {
			height: 70,
			width: 70,
			borderRadius: 45,
			backgroundColor: colors.card,
			justifyContent: 'center',
			alignItems: 'center'
		},
		fabContainerBottom: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			margin: 15
		},
		fabGroupContainer: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			left: 0,
			top: 0,
			backgroundColor: 'rgba(0, 0, 0, .4)',
			flex: 1
		},
		fabContainerIcons: {
			position: 'absolute',
			bottom: 90,
			right: 15
		},
		lottieIcon: { height: 35, width: 35 },
		dayContainer: {
			height: 50,
			width: 80,
			backgroundColor: 'orange',
			margin: 5,
			alignItems: 'center',
			justifyContent: 'center'
		},
		cardLesson: { height: 120, width: '100%', marginVertical: 5, justifyContent: 'center', alignItems: 'center' },
		imageCardLesson: { height: 120, width: '100%', position: 'absolute', bottom: 0, right: 0, left: 0 },
		cardNote: {
			height: 280,
			width: width / 2 - 25,
			backgroundColor: colors.primary,
			margin: 5,
			padding: 15
		},
		cardTaskComplete: { height: 90, width: '100%', backgroundColor: colors.primary, padding: 5, borderRadius: 15 },
		cardTaskIncomplete: { height: 90, width: '100%', backgroundColor: colors.border, padding: 5, borderRadius: 15 },
		colorTextWhite: { color: 'white' },
		centeredView: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 22
		},
		modalView: {
			margin: 20,
			backgroundColor: colors.card,
			borderRadius: 20,
			padding: 35,
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},
		cardUser: { height: 395, width: 250 },
		titleUser: { textAlign: 'center', fontSize: 20, fontWeight: 'bold' },
		line: { borderWidth: 0.3, borderBottomColor: colors.primary },
		containerTheme: { marginVertical: 15, flex: 1 },
		spaceBetween: { flexDirection: 'row', justifyContent: 'space-between' },
		bottomFull: { position: 'absolute', bottom: 0, right: 0, left: 0 },
		textColorTheme: { color: colors.text }
	});
	return {
		styles,
		colors
	};
};

export default useStyles;
