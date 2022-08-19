import {Directions, Gesture} from 'react-native-gesture-handler';
import useStyles from './useStyles';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useZoom = () => {
  const {width, styles} = useStyles();
  const escalaImagen = useSharedValue(1);
  const focoX = useSharedValue(0);
  const focoY = useSharedValue(0);
  const pinchazo = Gesture.Pinch()
    .onStart(e => {
      focoX.value = e.focalX;
      focoY.value = e.focalY;
    })
    .onUpdate(e => {
      escalaImagen.value = e.scale;
    })
    .onEnd(() => {
      escalaImagen.value = withTiming(1, {duration: 500});
    });

  const deslizar = Gesture.Fling()
    .direction(Directions.LEFT)
    .onStart(e => {
      console.log(e);
    });

  const centroImagen = {
    x: width / 2,
    y: width / 2,
  };
  const estiloImagen = useAnimatedStyle(() => ({
    transform: [
      {translateX: focoX.value},
      {translateY: focoY.value},
      {translateX: -centroImagen.x},
      {translateY: -centroImagen.y},
      {scale: escalaImagen.value},
      {translateX: -focoX.value},
      {translateY: -focoY.value},
      {translateX: centroImagen.x},
      {translateY: centroImagen.y},
    ],
  }));
  return {
    pinchazo,
    styles,
    estiloImagen,
    deslizar,
  };
};

export default useZoom;
