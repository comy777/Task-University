import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BtnProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import Loading from './Loading';

const Btn = ({
  title,
  onPress,
  disabled,
  style,
  loading,
  styleText,
  auth,
}: BtnProps) => {
  const {styles, colors} = useStyles();
  return (
    <View style={style ? style : styles.btnContainer}>
      {loading ? (
        <Loading color={auth ? 'white' : colors.primary} />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          disabled={disabled}>
          <Text style={styleText ? styleText : styles.btnText}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Btn;
