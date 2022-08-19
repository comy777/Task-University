import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useZoom from '../hooks/useZoom';

interface Props {
  uri?: string;
}

const ImageZoom = ({uri}: Props) => {
  const {styles, pinchazo, estiloImagen} = useZoom();
  return (
    <SafeAreaView>
      <GestureHandlerRootView>
        <GestureDetector gesture={pinchazo}>
          <Animated.Image
            style={[styles.img, estiloImagen]}
            source={{
              uri: uri
                ? uri
                : 'https://dam.smashmexico.com.mx/wp-content/uploads/2020/04/ayuda-a-tu-pequeno-a-hacer-el-cinturon-de-batman-cover.jpg',
            }}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default ImageZoom;
