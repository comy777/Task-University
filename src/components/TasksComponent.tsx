import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import useNotes from '../hooks/useNotes';
import { TaskComponentProps, TasksComponentProps } from '../interfaces/components';
import useStyles from '../hooks/useStyles';

const TasksComponent = ({ tasks }: TasksComponentProps) => {
	const { handleActiveData } = useNotes();
	const { styles } = useStyles();
	const Task = ({ task, onPress }: TaskComponentProps) => {
		const { title, body, dayLimit, complete } = task;
		const spliteDate = dayLimit.split('T');
		return (
			<TouchableOpacity activeOpacity={0.7} onPress={() => onPress(task)}>
				<View style={complete ? styles.cardTaskComplete : styles.cardTaskIncomplete}>
					<View style={{ alignItems: 'center' }}>
						<Text style={styles.colorTextWhite}>{title}</Text>
						<Text style={styles.colorTextWhite}>{spliteDate[0]}</Text>
					</View>
					<Text numberOfLines={2} style={styles.colorTextWhite}>
						{body}
					</Text>
				</View>
			</TouchableOpacity>
		);
	};
	return (
		<FlatList
			data={tasks}
			keyExtractor={(item) => item._id}
			renderItem={({ item }) => <Task task={item} onPress={() => handleActiveData({ task: item })} />}
		/>
	);
};

export default TasksComponent;
