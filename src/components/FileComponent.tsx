import React, {useMemo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {File} from '../interfaces/response';
import useStyles from '../hooks/useStyles';

interface Props {
  file: File;
  onPress: (file: File) => void;
}

const FileComponent = ({file, onPress}: Props) => {
  const {filename, image} = file;
  const {styles} = useStyles();
  return useMemo(
    () => (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onPress(file)}>
        <View style={{...styles.cardNote, height: 195}}>
          <Image source={{uri: image}} style={{height: 150, width: 150}} />
          <Text
            style={{textAlign: 'center', marginTop: 5, fontWeight: 'bold'}}
            numberOfLines={1}>
            {filename}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [file],
  );
};

export default FileComponent;
