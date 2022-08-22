import React from 'react';
import {View, FlatList, Image, TouchableOpacity, Animated} from 'react-native';
import ImageZoom from '../components/ImageZoom';
import {ImageScreenProps} from '../interfaces/components';
import useImageScreen from '../hooks/useImageScreen';

const ImageScreen = ({route}: ImageScreenProps) => {
  const {images, image} = route.params;
  const {
    topRef,
    thumpRef,
    index,
    onPress,
    fadeAnim,
    disabled,
    setActiveIndex,
    styles,
  } = useImageScreen({images, image});
  return (
    <View style={styles.imageScreenBg}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={(item, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={index}
        onTouchStart={onPress}
        renderItem={({item}) => (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ImageZoom uri={item.uri} />
          </View>
        )}
      />
      <View style={{flex: 1}}>
        <Animated.FlatList
          ref={thumpRef}
          data={images}
          keyExtractor={(item, i) => i.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          style={{position: 'absolute', bottom: 80, opacity: fadeAnim}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={disabled}
              onPress={() => setActiveIndex(index)}>
              <Image
                source={{uri: item.uri}}
                style={styles.imageBottomScreen}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default ImageScreen;
