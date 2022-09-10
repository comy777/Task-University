import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateLesson from '../screens/CreateLesson';
import Note from '../screens/Note';
import CreateNote from '../screens/CreateNote';
import TasksScreen from '../screens/TasksScreen';
import CreateTask from '../screens/CreateTask';
import Schedule from '../screens/Schedule';
import ImageScreen from '../screens/ImageScreen';
import BottomRoutes from './BottomRoutes';
import SearchScreen from '../screens/SearchScreen';
import MeetScreen from '../screens/MeetScreen';
import {getNotifications} from '../utils/notifications';
import FilesScreen from '../screens/FilesScreen';
import FolderScreen from '../screens/FolderScreen';

const Stack = createStackNavigator();

const TaskRoutes = () => {
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="home stack">
      <Stack.Screen name="home stack" component={BottomRoutes} />
      <Stack.Screen name="create lesson" component={CreateLesson} />
      <Stack.Screen name="note stack" component={Note} />
      <Stack.Screen name="task stack" component={TasksScreen} />
      <Stack.Screen name="create note" component={CreateNote} />
      <Stack.Screen name="create task" component={CreateTask} />
      <Stack.Screen name="schedule" component={Schedule} />
      <Stack.Screen name="image screen" component={ImageScreen} />
      <Stack.Screen name="search screen" component={SearchScreen} />
      <Stack.Screen name="meet screen" component={MeetScreen} />
      <Stack.Screen name="files stack" component={FilesScreen} />
      <Stack.Screen name="folder stack" component={FolderScreen} />
    </Stack.Navigator>
  );
};

export default TaskRoutes;
