import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useStyles from '../hooks/useStyles';
import useUser from '../hooks/useUser';

const Header = () => {
	const { styles } = useStyles();
	const { user, handleUser } = useUser();
	return (
		<View style={styles.header}>
			<Text style={styles.headerText}>Task App</Text>
			{user && (
				<TouchableOpacity activeOpacity={0.7} onPress={handleUser}>
					<View style={styles.iconProfile}>
						{user.image !== '' ? (
							<Image source={{ uri: user.image }} style={{ height: 50, width: 50, borderRadius: 25 }} />
						) : (
							<Icon name="person-circle-outline" size={50} />
						)}
					</View>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Header;
