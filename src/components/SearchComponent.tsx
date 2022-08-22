import React, {useMemo} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import useDebounce from '../hooks/useDebounce';
import {SearchResponse} from '../interfaces/response';
import useStyles from '../hooks/useStyles';

interface Props {
  item: string;
}

const SearchComponent = () => {
  const {
    input,
    handleChangeText,
    data,
    handleClick,
    history,
    handleSearchHistory,
    handleDeleteHistoryItem,
  } = useDebounce();
  const {styles, colors} = useStyles();
  const CardSearch = (item: SearchResponse) => {
    const {type, title} = item;
    return useMemo(
      () => (
        <TouchableOpacity onPress={() => handleClick(item)}>
          <View style={styles.inputSearch}>
            <View>
              <Text>{title ? title : 'No tiene texto'}</Text>
              <Text style={{fontWeight: 'bold'}}>{type.toUpperCase()}</Text>
            </View>
            <Icon name="search" size={24} />
          </View>
        </TouchableOpacity>
      ),
      [item],
    );
  };
  const CardHistory = ({item}: Props) => {
    return useMemo(
      () => (
        <TouchableOpacity onPress={() => handleSearchHistory(item)}>
          <View style={styles.inputSearch}>
            <View>
              <Text style={{fontWeight: 'bold'}}>{item}</Text>
            </View>
            <Icon
              name="close"
              size={24}
              onPress={() => handleDeleteHistoryItem(item)}
            />
          </View>
        </TouchableOpacity>
      ),
      [item],
    );
  };
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={{...styles.inputIcon, paddingHorizontal: 15}}>
          <TextInput
            placeholder="Search"
            value={input}
            onChangeText={value => handleChangeText(value, 'input')}
            style={{width: '90%'}}
          />
          <Icon name="search" color={colors.primary} size={28} />
        </View>
      </View>
      <View></View>
      {!input && (
        <FlatList
          data={history}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({item}) => <CardHistory item={item} />}
        />
      )}
      <FlatList
        data={data}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({item}) => <CardSearch {...item} />}
      />
    </View>
  );
};

export default SearchComponent;
