import {useRef} from 'react';
import {Animated} from 'react-native';

const useAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  return {
    fadeIn,
    fadeOut,
    fadeAnim,
  };
};

export default useAnimation;
