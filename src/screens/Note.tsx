import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NoteScreenProps} from '../interfaces/components';
import useNotes from '../hooks/useNotes';
import Loading from '../components/Loading';
import {Notes} from '../components/NoteComponent';
import useStyles from '../hooks/useStyles';
import Fab from '../components/Fab';

const Note = ({route, navigation}: NoteScreenProps) => {
  const {loading, handleGetNotes, notes} = useNotes();
  const {styles} = useStyles();
  useEffect(() => {
    handleGetNotes('notes', route.params.id);
  }, []);
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <Notes notes={notes} />
      <Fab
        icon="add"
        style={styles.fabContainerBottom}
        onPress={() =>
          navigation.navigate('create note', {
            note: undefined,
            lesson: route.params.id,
          })
        }
      />
    </View>
  );
};

export default Note;
