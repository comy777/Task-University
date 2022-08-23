import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useStyles from '../hooks/useStyles';
import useUser from '../hooks/useUser';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const {styles} = useStyles();
  const {user, handleUser, searchVisible} = useUser();
  const navigation = useNavigation();
  const handleNavigate = () => navigation.navigate('search screen');
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Task University</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {searchVisible && (
          <View style={styles.iconSearch}>
            <Icon name="search" size={24} onPress={handleNavigate} />
          </View>
        )}
        {user && (
          <TouchableOpacity activeOpacity={0.7} onPress={handleUser}>
            <View style={styles.iconProfile}>
              {user.image !== '' ? (
                <Image
                  source={{uri: user.image}}
                  style={{height: 50, width: 50, borderRadius: 25}}
                />
              ) : (
                <Icon name="person-circle-outline" size={50} />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
