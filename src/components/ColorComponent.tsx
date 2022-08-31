import React, {useMemo} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colorsPalette} from '../utils/colors';
import {ColorComponentProps, ColorProps} from '../interfaces/components';
import Btn from './Btn';
import useUtils from '../hooks/useUtils';

const ColorComponent = ({setColor, color}: ColorComponentProps) => {
  const {colors, styles, ref, setVisibleColor} = useUtils({color});
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
            getItemLayout={(data, index) => {
              return {length: 70, offset: 70 * index, index};
            }}
          />
          <Btn title="Cerrar" onPress={setVisibleColor} />
        </View>
      </View>
    </View>
  );
};

export default ColorComponent;
