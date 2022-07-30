import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {LessonProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import {imageLesson} from '../interfaces/data';

const Lesson = ({data, onPress}: LessonProps) => {
  const {styles} = useStyles();
  const {lesson, teacher, schedlue, classroom} = data;
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardLesson}>
        <Image source={{uri: imageLesson}} style={styles.imageCardLesson} />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>{lesson}</Text>
          <Text>{teacher}</Text>
          <Text>{classroom}</Text>
          <FlatList
            data={schedlue}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => (
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginHorizontal: 5}}>{item.day}</Text>
                <Text>{item.hours}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Lesson;
