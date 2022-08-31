import React, {useMemo} from 'react';
import {
  View,
  Text,
  SectionList,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Fab from '../components/Fab';
import Loading from '../components/Loading';
import ModalComponent from '../components/Modal';
import useSchedule from '../hooks/useSchedule';
import useStyles from '../hooks/useStyles';
import DatePicker from 'react-native-modal-datetime-picker';
import {Meet} from '../interfaces/response';

interface Props {
  itemMeet: Meet;
}

const Schedule = () => {
  const {
    loading,
    dataList,
    visible,
    handleVisible,
    handleDateVisible,
    dateVisible,
    handleChangeText,
    handleConfirm,
    meet,
    link,
    handleSave,
    dataMeets,
    handleActiveMeet,
    start_time,
    date_meet,
    active,
    loadingMeet,
  } = useSchedule();
  const {styles} = useStyles();
  if (loading) return <Loading />;
  const Meet = ({itemMeet}: Props) => {
    return useMemo(
      () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleActiveMeet(itemMeet)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{itemMeet.meet}</Text>
          </View>
          <View style={styles.spaceBetween}>
            <Text style={styles.itemList}>{itemMeet.date_meet}</Text>
            <Text style={styles.itemList}>{itemMeet.start_time}</Text>
          </View>
          {itemMeet.link && (
            <Text style={styles.itemList}>{itemMeet.link}</Text>
          )}
        </TouchableOpacity>
      ),
      [itemMeet],
    );
  };
  return (
    <View style={{flex: 1}}>
      <View>
        {dataMeets.length > 0 && (
          <Text
            style={{
              ...styles.sectionTitle,
              textAlign: 'center',
              marginVertical: 15,
            }}>
            Reuniones
          </Text>
        )}
        <FlatList
          data={dataMeets}
          keyExtractor={item => item._id}
          renderItem={({item}) => <Meet itemMeet={item} />}
        />
        <Text
          style={{
            ...styles.sectionTitle,
            textAlign: 'center',
            marginVertical: 15,
          }}>
          Horario
        </Text>
        <SectionList
          sections={dataList}
          renderItem={({item}) => <Text style={styles.itemList}>{item}</Text>}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={{flex: 1}}>
        <ModalComponent visible={visible} setVisible={handleVisible}>
          <View style={{height: 350, width: 250}}>
            <Text style={{textAlign: 'center'}}>Nueva reunion</Text>
            <View style={{flex: 1}}>
              <TextInput
                placeholder="Reunion"
                autoFocus
                numberOfLines={1}
                value={meet}
                onChangeText={value => handleChangeText(value, 'meet')}
              />
              <TextInput
                placeholder="Link"
                multiline
                value={link}
                onChangeText={value => handleChangeText(value, 'link')}
              />
              {date_meet && (
                <View>
                  <Text>Fecha: {date_meet}</Text>
                  <Text>Hora: {start_time}</Text>
                </View>
              )}
              {loadingMeet && <Loading />}
              <View style={styles.modalIcons}>
                <Icon
                  name="calendar-outline"
                  size={24}
                  onPress={handleDateVisible}
                />
                <Icon
                  name={active ? 'create-outline' : 'save-outline'}
                  size={24}
                  onPress={handleSave}
                />
              </View>
              <DatePicker
                isVisible={dateVisible}
                onConfirm={handleConfirm}
                onCancel={handleDateVisible}
                mode="datetime"
              />
            </View>
          </View>
        </ModalComponent>
        <Fab
          icon="add"
          style={styles.fabContainerBottom}
          onPress={handleVisible}
        />
      </View>
    </View>
  );
};

export default Schedule;
