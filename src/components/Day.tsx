import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { DayProps, DaysProps } from '../interfaces/components';
import useStyles from '../hooks/useStyles';

export const DaysComponent = ({ onPress, days }: DaysProps) => {
	const { styles, colors } = useStyles();
	const Day = ({ day, onPress, selected }: DayProps) => {
		return useMemo(
			() => {
				return (
					<View style={{ ...styles.dayContainer, backgroundColor: selected ? colors.primary : colors.card }}>
						{onPress && (
							<TouchableOpacity activeOpacity={0.7} onPress={() => onPress(day)}>
								<Text>{day}</Text>
							</TouchableOpacity>
						)}
					</View>
				);
			},
			[ day ]
		);
	};
	return (
		<View style={{ alignItems: 'center' }}>
			<FlatList
				data={days}
				renderItem={({ item }) => <Day {...item} onPress={onPress} />}
				keyExtractor={(item) => item.id}
				numColumns={4}
			/>
		</View>
	);
};

export default DaysComponent;
