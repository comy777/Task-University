import {useContext, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import {AppContext} from '../context/AppContext';
import {colorsPalette} from '../utils/colors';
import useStyles from './useStyles';

interface Props {
  color?: string;
}

const useUtils = ({color}: Props) => {
  const {styles, colors} = useStyles();
  const {appState} = useContext(AppContext);
  const {setVisibleColor} = appState;
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const getIndexColor = () => {
    let bandera = false;
    const totalFilas = colorsPalette.length;
    colorsPalette.forEach((item, i) => {
      if (bandera) return;
      if (item === color) {
        setIndex(i);
        bandera = true;
      }
    });
    if (!bandera || index === 0) return;
    const fila = index / 5 - 1;
    if (fila > totalFilas) return;
    if (fila <= 0) return;
    if (!ref.current) return;
    ref.current.scrollToIndex({
      animated: true,
      index: fila,
    });
  };
  useEffect(() => {
    getIndexColor();
  }, [index]);
  return {
    styles,
    colors,
    setVisibleColor,
    ref,
  };
};

export default useUtils;
