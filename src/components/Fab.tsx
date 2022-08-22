import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FabProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import Loading from './Loading';

const Fab = ({
  icon,
  style,
  onPress,
  loading,
  fabGroup,
  fabNote,
  styleBg,
  handleCalendar,
  handleCamera,
  handleGalery,
  handleSave,
  handleColor,
}: FabProps) => {
  const {styles} = useStyles();
  return (
    <View
      style={
        styleBg
          ? styles.fabGroupContainer
          : {...styles.fabContainerBottom, margin: 0}
      }>
      {fabGroup && (
        <View style={styles.fabContainerIcons}>
          <View>
            <View
              style={{
                ...styles.fabContainer,
                height: 50,
                width: 50,
                marginBottom: 5,
              }}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
                <Lottie
                  source={require('../animations/8569-file-save.json')}
                  autoPlay
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.fabContainer,
                height: 50,
                width: 50,
                marginBottom: 5,
              }}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleCamera}>
                <Lottie
                  source={require('../animations/9253-camera.json')}
                  autoPlay
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.fabContainer,
                height: 50,
                width: 50,
                marginBottom: 5,
              }}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleGalery}>
                <Lottie
                  source={require('../animations/86897-gallery-icon-animation.json')}
                  autoPlay
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.fabContainer,
                height: 50,
                width: 50,
                marginBottom: 5,
              }}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleCalendar}>
                <Lottie
                  source={require('../animations/5066-meeting-and-stuff.json')}
                  autoPlay
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {fabNote && (
        <View style={styles.fabContainerIcons}>
          <View>
            <View
              style={{
                ...styles.fabContainer,
                height: 50,
                width: 50,
                marginBottom: 5,
              }}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
                <Lottie
                  source={require('../animations/8569-file-save.json')}
                  autoPlay
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.fabContainer,
                height: 50,
                width: 50,
                marginBottom: 5,
              }}>
              <TouchableOpacity activeOpacity={0.7} onPress={handleColor}>
                <Lottie
                  source={require('../animations/63797-color-palette.json')}
                  autoPlay
                  style={{height: 35, width: 35}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={style ? style : styles.fabContainerAround}>
        <View style={styles.fabContainer}>
          {loading ? (
            <Loading />
          ) : (
            <Icon name={icon} color="white" size={42} onPress={onPress} />
          )}
        </View>
      </View>
    </View>
  );
};

export default Fab;
