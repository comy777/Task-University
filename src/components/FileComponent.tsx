import React, {useMemo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useStyles from '../hooks/useStyles';
import {FileComponentProps} from '../interfaces/components';

const FileComponent = ({data, onPress, handleNavigate}: FileComponentProps) => {
  const {name, icon, type, id} = data;
  const {styles} = useStyles();
  const handleClick = () => {
    if (type === 'file') onPress(data);
    if (type === 'folder') handleNavigate(id);
  };
  return useMemo(
    () => (
      <View style={{...styles.cardNote, height: 215}}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleClick}>
          <Image source={{uri: icon}} style={{height: 150, width: 150}} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 35,
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold'}} numberOfLines={1}>
            {name}
          </Text>
          {type === 'folder' && (
            <View style={{marginTop: 2}}>
              <Icon
                name="menu-outline"
                size={24}
                onPress={() => onPress(data)}
              />
            </View>
          )}
        </View>
      </View>
    ),
    [data],
  );
};

export default FileComponent;
