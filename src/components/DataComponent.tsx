import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {DataComponentProps} from '../interfaces/components';
import useNotes from '../hooks/useNotes';
import useStyles from '../hooks/useStyles';

const DataComponent = ({
  data,
  handleDelete,
  handleEdit,
}: DataComponentProps) => {
  const {note, task} = data;
  const {handleComplete} = useNotes();
  const {styles} = useStyles();
  return (
    <View style={styles.modalNote}>
      <View style={{flex: 1}}>
        {note && (
          <View>
            <Text style={styles.modalTitleNote}>{note.title}</Text>
            <Text numberOfLines={20}>{note.body}</Text>
          </View>
        )}
        {task && (
          <View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.modalTitleNote}>{task.title}</Text>
              <Text>{task.dayLimit}</Text>
            </View>
            <Text numberOfLines={20}>{task.body}</Text>
          </View>
        )}
        <View style={styles.modalIcons}>
          <Icon name="trash-outline" onPress={handleDelete} size={32} />
          <Icon name="create-outline" onPress={handleEdit} size={32} />
          {task && (
            <Icon
              name={
                task.complete
                  ? 'close-circle-outline'
                  : 'checkmark-circle-outline'
              }
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
