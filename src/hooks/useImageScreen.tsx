import {LegacyRef, useState, useRef, useEffect} from 'react';
import {FlatList} from 'react-native';
import {ImageDataProps} from '../interfaces/components';
import useAnimation from './useAnimation';
import useStyles from './useStyles';

interface Props {
  images: ImageDataProps[];
  image: ImageDataProps;
}

const IMAGE_SIZE = 80;
const SPACING = 10;

const useImageScreen = ({images, image}: Props) => {
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const thumpRef: LegacyRef<FlatList> = useRef(null);
  const topRef: LegacyRef<FlatList> = useRef(null);
  const timmerImages = useRef(false);
  const {fadeAnim, fadeIn, fadeOut} = useAnimation();
  const {width, styles} = useStyles();
  const getIndex = () => {
    images.forEach((item, index) => {
      if (item.uri) {
        if (image.uri) {
          if (item.uri === image.uri) setIndex(index);
        }
      }
    });
  };
  const onPress = () => {
    fadeIn();
    timmerImages.current = true;
    setDisabled(false);
  };
  const timmer = (duration: number) => {
    setTimeout(() => {
      fadeOut();
      setDisabled(true);
      timmerImages.current = false;
    }, duration);
  };
  const setActiveIndex = (index: number) => {
    if (topRef.current) {
      topRef.current.scrollToOffset({
        offset: index * width,
        animated: true,
      });
    }
    if (!thumpRef.current) return;
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumpRef.current.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    }
  };
  useEffect(() => {
    getIndex();
  }, []);
  useEffect(() => {
    console.log(timmerImages.current);
  }, [timmerImages.current]);

  return {
    index,
    disabled,
    thumpRef,
    topRef,
    fadeAnim,
    onPress,
    setActiveIndex,
    styles,
  };
};

export default useImageScreen;
