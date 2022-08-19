import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {LessonProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import {imageLesson} from '../interfaces/data';

const Lesson = ({data, onPress}: LessonProps) => {
  const {styles} = useStyles();
  const {lesson} = data;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardLesson}>
        <Image source={{uri: imageLesson}} style={styles.imageCardLesson} />
        <Text style={styles.cardLessonText}>{lesson}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Lesson;
