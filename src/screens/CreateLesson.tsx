import {View, TextInput} from 'react-native';
import React, {useEffect} from 'react';
import useApp from '../hooks/useApp';
import {DaysComponent} from '../components/Day';
import Fab from '../components/Fab';
import {LessonScreenProps} from '../interfaces/components';
import Btn from '../components/Btn';

const CreateLesson = ({route}: LessonScreenProps) => {
  const {
    styles,
    teacher,
    lesson,
    nrc,
    classroom,
    handleChangeText,
    handleChangeDay,
    handleSaveLesson,
    loading,
    handleActive,
    showHandleDelete,
    handleNavigate,
    days,
  } = useApp(
    route.params
      ? route.params.lesson
        ? route.params.lesson
        : undefined
      : undefined,
  );
  useEffect(() => {
    if (route.params) {
      if (!route.params.lesson) return;
      handleActive(route.params.lesson);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Clase"
        style={styles.inputContainer}
        value={lesson}
        onChangeText={value => handleChangeText(value, 'lesson')}
        placeholderTextColor={styles.textColorTheme.color}
      />
      <TextInput
        placeholder="Profesor"
        style={styles.inputContainer}
        value={teacher}
        onChangeText={value => handleChangeText(value, 'teacher')}
        placeholderTextColor={styles.textColorTheme.color}
      />
      <TextInput
        placeholder="Salón"
        style={styles.inputContainer}
        value={classroom}
        onChangeText={value => handleChangeText(value, 'classroom')}
        placeholderTextColor={styles.textColorTheme.color}
      />
      <TextInput
        placeholder="Nrc"
        style={styles.inputContainer}
        value={nrc}
        onChangeText={value => handleChangeText(value, 'nrc')}
        keyboardType="numeric"
        placeholderTextColor={styles.textColorTheme.color}
      />
      <DaysComponent onPress={handleChangeDay} days={days} />
      {route.params && (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Btn title="Tareas" onPress={() => handleNavigate('task stack')} />
            <Btn title="Notas" onPress={() => handleNavigate('note stack')} />
          </View>
          <View style={{alignItems: 'center'}}>
            <Btn
              title="Eliminar"
              style={{...styles.btnContainer, backgroundColor: 'red'}}
              onPress={showHandleDelete}
              disabled={loading}
            />
          </View>
        </View>
      )}
      <Fab
        icon="add"
        style={styles.fabContainerBottom}
        onPress={handleSaveLesson}
        loading={loading}
      />
    </View>
  );
};

export default CreateLesson;
