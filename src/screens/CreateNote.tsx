import React, { useEffect } from 'react';
import { ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Fab from '../components/Fab';
import useStyles from '../hooks/useStyles';
import useNotes from '../hooks/useNotes';
import ImageComponent from '../components/ImageComponent';
import { CreateNoteScreenProps } from '../interfaces/components';

const CreateNote = ({ route }: CreateNoteScreenProps) => {
	const { styles } = useStyles();
	const {
		title,
		body,
		handleChangeText,
		images,
		image,
		getImagesCamera,
		getImagesGalery,
		deleteImage,
		setImage,
		handleSave,
		loading,
		handleActiveNote
	} = useNotes();
	useEffect(
		() => {
			if (route.params.note) {
				handleActiveNote(route.params.note);
			}
		},
		[ route.params.note ]
	);
	return (
		<KeyboardAvoidingView style={{ flex: 1, paddingBottom: 25 }}>
			<ScrollView style={styles.container}>
				<TextInput
					placeholder="Titulo"
					style={styles.inputContainer}
					value={title}
					onChangeText={(value) => handleChangeText(value, 'title')}
					placeholderTextColor={styles.textColorTheme.color}
				/>
				<ImageComponent
					images={images}
					image={image}
					onPressCamera={getImagesCamera}
					onPressGalery={getImagesGalery}
					deleteImage={deleteImage}
					disable={false}
					setImage={setImage}
					visible={true}
				/>
				<TextInput
					placeholder="Nota"
					multiline
					value={body}
					onChangeText={(value) => handleChangeText(value, 'body')}
					placeholderTextColor={styles.textColorTheme.color}
					style={{ ...styles.textColorTheme }}
				/>
			</ScrollView>
			<Fab
				icon="add"
				style={styles.fabContainerBottom}
				onPress={() => handleSave(route.params.lesson, route.params.note)}
				loading={loading}
			/>
		</KeyboardAvoidingView>
	);
};

export default CreateNote;
