import React from 'react';
import { View, Text, Switch, TextInput, Image } from 'react-native';
import useContextApp from '../hooks/useContextApp';
import Btn from './Btn';
import useStyles from '../hooks/useStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import useUser from '../hooks/useUser';

const UserComponent = () => {
	const { user, themeDark, handleSetTheme, themeSystem } = useContextApp();
	const {
		editable,
		handleEditable,
		image,
		handleChangeImage,
		deleteImage,
		username,
		handleChangeText,
		handleLogout
	} = useUser();
	const { styles, colors } = useStyles();
	if (!user) return null;
	return (
		<View style={styles.cardUser}>
			<View style={{ flex: 1 }}>
				<View style={{ ...styles.spaceBetween, alignItems: 'center' }}>
					<TextInput
						placeholder={username}
						editable={editable}
						onChangeText={(value) => handleChangeText(value, 'username')}
						value={username}
					/>
					<Icon name={editable ? 'save-outline' : 'create-outline'} size={28} onPress={handleEditable} />
				</View>
				<View style={styles.line} />
				{editable && (
					<View>
						<View style={{ alignItems: 'center' }}>
							<View style={{ marginTop: 15 }}>
								{image && (
									<View>
										{image.uri !== '' && (
											<View style={{ alignItems: 'center' }}>
												<Image
													source={{ uri: image.uri }}
													style={{
														height: 50,
														width: 50,
														resizeMode: 'center',
														marginVertical: 15
													}}
												/>
												<Btn title="Quitar imagen" style={{}} onPress={deleteImage} />
											</View>
										)}
									</View>
								)}
							</View>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15 }}>
							<Icon name="camera-outline" size={28} onPress={() => handleChangeImage('camera')} />
							<Icon name="image-outline" size={28} onPress={() => handleChangeImage('galery')} />
						</View>
					</View>
				)}
				<View style={styles.containerTheme}>
					<View style={styles.spaceBetween}>
						<Text>Tema del sistema</Text>
						<Switch
							value={themeSystem}
							onValueChange={() => handleSetTheme('system')}
							thumbColor={colors.primary}
						/>
					</View>
					<View style={styles.spaceBetween}>
						<Text>Tema oscuro</Text>
						<Switch
							value={themeSystem ? false : themeDark}
							onValueChange={() => handleSetTheme('dark')}
							disabled={themeSystem}
							thumbColor={colors.primary}
						/>
					</View>
				</View>
				<View style={styles.bottomFull}>
					<View style={{ alignItems: 'center' }}>
						<Btn title="Cerrar sesion" onPress={handleLogout} />
					</View>
				</View>
			</View>
		</View>
	);
};

export default UserComponent;
