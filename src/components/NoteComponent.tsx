import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {
  NotesComponentProps,
  NoteComponentProps,
} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import useNotes from '../hooks/useNotes';

export const Notes = ({notes}: NotesComponentProps) => {
  const {handleActiveData} = useNotes();
  const {styles} = useStyles();
  const NoteComponent = ({note, onPress}: NoteComponentProps) => {
    const {title, body} = note;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(note)}>
        <View style={styles.cardNote}>
          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{title}</Text>
          <Text numberOfLines={12}>{body}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={notes}
      keyExtractor={item => item._id}
      ListEmptyComponent={() => (
        <Text style={styles.textColorTheme}>No hay notas</Text>
      )}
      renderItem={({item}) => (
        <NoteComponent
          note={item}
          onPress={() => handleActiveData({note: item})}
        />
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
    />
  );
};
