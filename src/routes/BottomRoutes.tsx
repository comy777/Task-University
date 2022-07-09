import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskRoutes from './TaskRoutes';
import useStyles from '../hooks/useStyles';
import useContextApp from '../hooks/useContextApp';
import { dataDays } from '../utils/storage';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomRoutes = () => {
	const { colors, styles } = useStyles();
	const { visibleTabBar, setDays } = useContextApp();
	return (
		<Tab.Navigator
			screenOptions={({ navigation }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarIcon: () => (
					<View style={styles.fabContainerAround}>
						<View style={styles.fabContainer}>
							<Icon
								name="add"
								color="white"
								size={42}
								onPress={() => {
									setDays(dataDays);
									navigation.navigate('create lesson');
								}}
							/>
						</View>
					</View>
				),
				tabBarStyle: { backgroundColor: colors.primary, display: visibleTabBar ? 'flex' : 'none' }
			})}
		>
			<Tab.Screen name="home" component={TaskRoutes} />
		</Tab.Navigator>
	);
};

export default BottomRoutes;
