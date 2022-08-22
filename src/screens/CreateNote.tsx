import React, {useEffect} from 'react';
import {ScrollView, TextInput, KeyboardAvoidingView, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../components/Fab';
import useStyles from '../hooks/useStyles';
import useNotes from '../hooks/useNotes';
import ImageComponent from '../components/ImageComponent';
import {CreateNoteScreenProps} from '../interfaces/components';
import ColorComponent from '../components/ColorComponent';

const CreateNote = ({route}: CreateNoteScreenProps) => {
  const {styles} = useStyles();
  const {
    title,
    body,
    handleChangeText,
    images,
    image,
    getImagesCamera,
    getImagesGalery,
    deleteImage,
    setImage,
    handleSave,
    loading,
    handleActiveNote,
    setVisibleFab,
    visibleFab,
    visibleColor,
    handleSetColor,
    setColor,
    color,
  } = useNotes();
  useEffect(() => {
    if (route.params.note) {
      handleActiveNote(route.params.note);
    }
  }, [route.params.note]);
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView style={{...styles.container, backgroundColor: color}}>
        <TextInput
          placeholder="Titulo"
          style={styles.inputContainer}
          value={title}
          onChangeText={value => handleChangeText(value, 'title')}
          placeholderTextColor={styles.textColorTheme.color}
        />
        <ImageComponent
          images={images}
          image={image}
          onPressCamera={getImagesCamera}
          onPressGalery={getImagesGalery}
          deleteImage={deleteImage}
          disable={false}
          setImage={setImage}
          visible={true}
        />
        <TextInput
          placeholder="Nota"
          multiline
          value={body}
          onChangeText={value => handleChangeText(value, 'body')}
          placeholderTextColor={styles.textColorTheme.color}
          style={{...styles.textColorTheme, marginBottom: 100}}
        />
      </ScrollView>
      {visibleColor && <ColorComponent setColor={setColor} color={color} />}
      <Fab
        icon={visibleFab ? 'close-outline' : 'add'}
        style={styles.fabContainerBottom}
        onPress={setVisibleFab}
        loading={loading}
        fabNote={visibleFab}
        handleSave={() => handleSave(route.params.lesson, route.params.note)}
        handleColor={handleSetColor}
        styleBg={visibleFab}
      />
    </KeyboardAvoidingView>
  );
};

export default CreateNote;
