import React from 'react';
import {View, TouchableOpacity, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImagesComponentProps,
  ImageComponentProps,
} from '../interfaces/components';
import Btn from './Btn';
import useStyles from '../hooks/useStyles';
import {useNavigation} from '@react-navigation/native';

const ImagesComponent = ({
  onPressCamera,
  onPressGalery,
  images,
  image,
  setImage,
  deleteImage,
  visible,
}: ImagesComponentProps) => {
  const {colors} = useStyles();
  const navigation = useNavigation();
  const ImageComponent = ({image, style, onPress}: ImageComponentProps) => {
    const {uri} = image;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <View style={{marginTop: 15}}>
          <Image
            source={{uri}}
            style={style ? style : {height: 70, width: 70, marginLeft: 5}}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{marginVertical: 15}}>
      <View style={{alignItems: 'center'}}>
        {image && (
          <ImageComponent
            style={{height: 150, width: 320, resizeMode: 'center'}}
            image={image}
            onPress={() => navigation.navigate('image screen', {images, image})}
          />
        )}
        <FlatList
          data={images}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => (
            <ImageComponent image={item} onPress={() => setImage(item)} />
          )}
          horizontal
        />
      </View>
      {visible && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: 15,
          }}>
          <Icon
            name="camera-outline"
            size={28}
            onPress={onPressCamera}
            color={colors.text}
          />
          <Icon
            name="image-outline"
            size={28}
            onPress={onPressGalery}
            color={colors.text}
          />
        </View>
      )}
      {image && (
        <View style={{alignItems: 'center'}}>
          <Btn title="Quitar imagen" loading={false} onPress={deleteImage} />
        </View>
      )}
    </View>
  );
};

export default ImagesComponent;
