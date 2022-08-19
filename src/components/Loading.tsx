import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import useStyles from '../hooks/useStyles';
import {LoadingComponentProps} from '../interfaces/components';

const Loading = ({size, color}: LoadingComponentProps) => {
  const {styles, colors} = useStyles();
  return (
    <View style={styles.loadingFull}>
      <ActivityIndicator color={color ? color : colors.primary} />
    </View>
  );
};

export default Loading;
