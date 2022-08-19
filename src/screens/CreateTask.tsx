import React, {useEffect} from 'react';
import {TextInput, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import {CreateTaskScreenProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import DatePicker from 'react-native-modal-datetime-picker';
import useNotes from '../hooks/useNotes';
import ImagesComponent from '../components/ImageComponent';
import Fab from '../components/Fab';

const CreateTask = ({route}: CreateTaskScreenProps) => {
  const id = route.params.lesson;
  const {styles} = useStyles();
  const {
    image,
    images,
    setImage,
    deleteImage,
    visibleFab,
    setVisibleFab,
    handleFabButtons,
    visibleDatePicker,
    handleDatePicker,
    setVisibleDatePicker,
    title,
    body,
    handleChangeText,
    handleActiveNote,
    loading,
    datePicker,
  } = useNotes();
  useEffect(() => {
    if (route.params.task) {
      handleActiveNote(undefined, route.params.task);
    }
  }, [route.params.task]);
  return (
    <KeyboardAvoidingView style={{flex: 1, paddingBottom: 25}}>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Titulo"
          style={styles.inputContainer}
          value={title}
          onChangeText={value => handleChangeText(value, 'title')}
          placeholderTextColor={styles.textColorTheme.color}
        />
        <Text>{datePicker}</Text>
        <ImagesComponent
          deleteImage={deleteImage}
          image={image}
          setImage={setImage}
          images={images}
          disable={false}
        />
        <TextInput
          placeholder="Body"
          multiline
          value={body}
          onChangeText={value => handleChangeText(value, 'body')}
          placeholderTextColor={styles.textColorTheme.color}
          style={{...styles.textColorTheme}}
        />
        <DatePicker
          isVisible={visibleDatePicker}
          onConfirm={handleDatePicker}
          onCancel={setVisibleDatePicker}
          mode="date"
        />
      </ScrollView>
      <Fab
        icon={visibleFab ? 'close-outline' : 'add'}
        style={styles.fabContainerBottom}
        fabGroup={visibleFab}
        onPress={setVisibleFab}
        handleCamera={() => handleFabButtons('camera', id)}
        handleGalery={() => handleFabButtons('galery', id)}
        handleCalendar={() => handleFabButtons('calendar', id)}
        handleSave={() => handleFabButtons('save', id, route.params.task)}
        loading={loading}
      />
    </KeyboardAvoidingView>
  );
};

export default CreateTask;
