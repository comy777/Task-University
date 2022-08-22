import {View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {AppContext} from '../context/AppContext';
import SearchComponent from '../components/SearchComponent';
import useStyles from '../hooks/useStyles';
import useDebounce from '../hooks/useDebounce';

const SearchScreen = () => {
  const {setSearchVisible} = useContext(AppContext);
  const {handleGetHistory} = useDebounce();
  useFocusEffect(
    useCallback(() => {
      setSearchVisible(false);
      handleGetHistory();
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
