import React, {useEffect} from 'react';
import {View} from 'react-native';
import useNotes from '../hooks/useNotes';
import {TaskScreenProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import Loading from '../components/Loading';
import Fab from '../components/Fab';
import TasksComponent from '../components/TasksComponent';

const TasksScreen = ({route, navigation}: TaskScreenProps) => {
  const {handleGetNotes, tasks, loading} = useNotes();
  const {styles} = useStyles();
  useEffect(() => {
    handleGetNotes('tasks', route.params.id);
  }, []);
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <TasksComponent tasks={tasks} />
      <Fab
        icon="add"
        style={styles.fabContainerBottom}
        onPress={() =>
          navigation.navigate('create task', {
            task: undefined,
            lesson: route.params.id,
          })
        }
      />
    </View>
  );
};

export default TasksScreen;
