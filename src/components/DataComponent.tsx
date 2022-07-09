import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DataComponentProps } from '../interfaces/components';
import useNotes from '../hooks/useNotes';

const DataComponent = ({ data, handleDelete, handleEdit }: DataComponentProps) => {
	const { note, task } = data;
	const { handleComplete } = useNotes();
	return (
		<View style={{ height: 450, width: 250 }}>
			<View style={{ flex: 1 }}>
				{note && (
					<View>
						<Text style={{ textAlign: 'center' }}>{note.title}</Text>
						<Text>{note.body}</Text>
					</View>
				)}
				{task && (
					<View>
						<View style={{ alignItems: 'center' }}>
							<Text>{task.title}</Text>
							<Text>{task.dayLimit}</Text>
						</View>
						<Text>{task.body}</Text>
					</View>
				)}
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						right: 0,
						left: 0
					}}
				>
					<Icon name="trash-outline" onPress={handleDelete} size={32} />
					<Icon name="create-outline" onPress={handleEdit} size={32} />
					{task && (
						<Icon
							name={task.complete ? 'close-circle-outline' : 'checkmark-circle-outline'}
							onPress={() => handleComplete(task._id)}
							size={32}
						/>
					)}
				</View>
			</View>
		</View>
	);
};

export default DataComponent;
