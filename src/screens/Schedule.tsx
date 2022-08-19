import React from 'react';
import {View, Text, SectionList} from 'react-native';
import Loading from '../components/Loading';
import useSchedule from '../hooks/useSchedule';
import useStyles from '../hooks/useStyles';

const Schedule = () => {
  const {loading, dataList} = useSchedule();
  const {styles} = useStyles();
  if (loading) return <Loading />;
  return (
    <View>
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
  );
};

export default Schedule;
