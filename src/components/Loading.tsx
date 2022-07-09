import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import useStyles from '../hooks/useStyles';

const Loading = () => {
	const { styles, colors } = useStyles();
	return (
		<View style={styles.loadingFull}>
			<ActivityIndicator color={colors.primary} />
		</View>
	);
};

export default Loading;
