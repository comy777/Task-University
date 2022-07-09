import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Lesson from '../components/Lesson';
import Loading from '../components/Loading';
import useApp from '../hooks/useApp';
import { HomeScreenProps } from '../interfaces/components';
import ModalComponent from '../components/Modal';
import useContextApp from '../hooks/useContextApp';
import Schedlue from '../components/Schedlue';
import DataComponent from '../components/DataComponent';
import useNotes from '../hooks/useNotes';
import UserComponent from '../components/UserComponent';

const Home = ({ navigation }: HomeScreenProps) => {
	const { lessons, styles, loading, setVisibleTabBar, handleGetLessons } = useApp();
	const { children, day, activeData } = useContextApp();
	const { handleNavigateEdit, handleShowDelete } = useNotes();
	useFocusEffect(
		useCallback(() => {
			setVisibleTabBar(true);
			return () => setVisibleTabBar(false);
		}, [])
	);
	useEffect(() => {
		handleGetLessons();
	}, []);
	if (loading) return <Loading />;
	const handleNavigate = (lesson: any) => {
		navigation.navigate('create lesson', { lesson });
	};
	return (
		<View style={styles.container}>
			<FlatList
				data={lessons}
				ListEmptyComponent={() => <Text>No hay clases</Text>}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => <Lesson data={item} onPress={() => handleNavigate(item)} />}
			/>
			<ModalComponent>
				{children === 'lesson' ? (
					<Schedlue title={day} />
				) : children === 'user' ? (
					<UserComponent />
				) : (
					<DataComponent data={activeData} handleEdit={handleNavigateEdit} handleDelete={handleShowDelete} />
				)}
			</ModalComponent>
		</View>
	);
};

export default Home;
