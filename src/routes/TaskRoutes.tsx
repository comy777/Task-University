import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import CreateLesson from '../screens/CreateLesson';
import Note from '../screens/Note';
import CreateNote from '../screens/CreateNote';
import TasksScreen from '../screens/TasksScreen';
import CreateTask from '../screens/CreateTask';

const Stack = createStackNavigator();

const TaskRoutes = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="home stack" component={Home} />
			<Stack.Screen name="create lesson" component={CreateLesson} />
			<Stack.Screen name="note stack" component={Note} />
			<Stack.Screen name="task stack" component={TasksScreen} />
			<Stack.Screen name="create note" component={CreateNote} />
			<Stack.Screen name="create task" component={CreateTask} />
		</Stack.Navigator>
	);
};

export default TaskRoutes;
