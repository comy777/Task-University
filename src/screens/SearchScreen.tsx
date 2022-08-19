import {View, Text} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AppContext} from '../context/AppContext';
import SearchComponent from '../components/SearchComponent';
import useStyles from '../hooks/useStyles';

const SearchScreen = () => {
  const {setSearchVisible} = useContext(AppContext);
  useFocusEffect(
    useCallback(() => {
      setSearchVisible(false);
      return () => setSearchVisible(true);
    }, []),
  );
  const {styles} = useStyles();
  return (
    <View style={styles.container}>
      <SearchComponent />
    </View>
  );
};

export default SearchScreen;
