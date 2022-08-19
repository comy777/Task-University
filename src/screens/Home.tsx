import React, {useCallback, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Lesson from '../components/Lesson';
import Loading from '../components/Loading';
import useApp from '../hooks/useApp';
import {HomeScreenProps} from '../interfaces/components';
import ModalComponent from '../components/Modal';
import useContextApp from '../hooks/useContextApp';
import Schedlue from '../components/Schedlue';
import DataComponent from '../components/DataComponent';
import useNotes from '../hooks/useNotes';
import UserComponent from '../components/UserComponent';
import Lottie from 'lottie-react-native';

const Home = ({navigation}: HomeScreenProps) => {
  const {lessons, styles, loading, setVisibleTabBar, handleGetLessons} =
    useApp();
  const {children, day, activeData, getTasks} = useContextApp();
  const {handleNavigateEdit, handleShowDelete} = useNotes();
  useFocusEffect(
    useCallback(() => {
      setVisibleTabBar(true);
      return () => setVisibleTabBar(false);
    }, []),
  );
  useEffect(() => {
    handleGetLessons();
  }, []);
  useEffect(() => {
    getTasks();
  }, []);

  if (loading) return <Loading />;
  const handleNavigate = (lesson: any) => {
    navigation.navigate('create lesson', {lesson});
  };

  return (
    <View style={{...styles.container, marginBottom: 25}}>
      {lessons.length > 0 && (
        <TouchableOpacity onPress={() => navigation.navigate('schedule')}>
          <View style={styles.containerCard}>
            <View style={styles.calendar}>
              <Lottie
                source={require('../animations/92440-schedule-in-blue.json')}
                autoPlay
              />
            </View>
            <Text style={styles.titleUser}>Horario</Text>
          </View>
        </TouchableOpacity>
      )}
      <FlatList
        data={lessons}
        ListEmptyComponent={() => (
          <Text style={styles.textColorTheme}>No hay clases</Text>
        )}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Lesson data={item} onPress={() => handleNavigate(item)} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <ModalComponent>
        {children === 'lesson' ? (
          <Schedlue title={day} />
        ) : children === 'user' ? (
          <UserComponent />
        ) : (
          <DataComponent
            data={activeData}
            handleEdit={handleNavigateEdit}
            handleDelete={handleShowDelete}
          />
        )}
      </ModalComponent>
    </View>
  );
};

export default Home;
