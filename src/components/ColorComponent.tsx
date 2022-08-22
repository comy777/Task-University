import React, {useContext, useEffect, useMemo, useRef} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colorsPalette} from '../utils/colors';
import {ColorComponentProps, ColorProps} from '../interfaces/components';
import Btn from './Btn';
import useStyles from '../hooks/useStyles';
import {AppContext} from '../context/AppContext';

const ColorComponent = ({setColor, color}: ColorComponentProps) => {
  const {styles, colors} = useStyles();
  const {appState} = useContext(AppContext);
  const {setVisibleColor} = appState;
  const ref = useRef<FlatList>(null);
  const getIndexColor = () => {
    const totalFilas = colorsPalette.length;
    let index = 0;
    colorsPalette.forEach((item, i) => {
      if (item === color) index = i;
    });
    const fila = index / 5 - 1;
    if (fila > totalFilas) return;
    if (!ref.current) return;
    ref.current.scrollToIndex({animated: true, index: fila});
  };
  useEffect(() => {
    getIndexColor();
  }, []);
  const Color = ({colorItem}: ColorProps) => {
    return useMemo(
      () => (
        <TouchableOpacity onPress={() => setColor(colorItem)}>
          <View style={{height: 70, width: 70, backgroundColor: colorItem}}>
            {color === colorItem && (
              <View style={{alignItems: 'flex-end'}}>
                <Icon
                  name="checkmark-circle-outline"
                  size={24}
                  color={colors.primary}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
      [color],
    );
  };
  return (
    <View style={styles.fabGroupContainer}>
      <View style={{flex: 1, ...styles.centerView}}>
        <View style={[styles.colorContainer, styles.centerView]}>
          <FlatList
            ref={ref}
            data={colorsPalette}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => <Color colorItem={item} />}
            contentContainerStyle={{flexDirection: 'column'}}
            numColumns={5}
            showsVerticalScrollIndicator={false}
          />
          <Btn title="Cerrar" onPress={setVisibleColor} />
        </View>
      </View>
    </View>
  );
};

export default ColorComponent;
