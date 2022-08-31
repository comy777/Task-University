import React from 'react';
import {View, Text, FlatList, Image, TextInput} from 'react-native';
import {FilesScreenProps} from '../interfaces/components';
import useFiles from '../hooks/useFiles';
import Loading from '../components/Loading';
import FileComponent from '../components/FileComponent';
import Fab from '../components/Fab';
import useStyles from '../hooks/useStyles';
import ModalComponent from '../components/Modal';
import Btn from '../components/Btn';
import Icon from 'react-native-vector-icons/Ionicons';

const FilesScreen = ({route}: FilesScreenProps) => {
  const {id} = route.params;
  const {
    loading,
    files,
    visible,
    handleVisible,
    handleFile,
    modal,
    filePicker,
    handleModal,
    handleChangeText,
    fileNameForm,
    handleSave,
    loadingFile,
    handleEditFile,
    activeFile,
    handleDeleteFile,
    handleDownload,
  } = useFiles(id);
  const {styles} = useStyles();
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <FlatList
        data={files}
        keyExtractor={item => item._id}
        ListEmptyComponent={() => <Text>No hay archivos</Text>}
        renderItem={({item}) => (
          <FileComponent file={item} onPress={handleEditFile} />
        )}
        numColumns={2}
      />
      <ModalComponent visible={modal} setVisible={handleModal}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {(filePicker || activeFile) && (
            <View>
              <View style={{marginVertical: 15}}>
                {filePicker && (
                  <Image
                    source={{uri: filePicker.icon}}
                    style={{height: 125, width: 125}}
                  />
                )}
                {activeFile && (
                  <Image
                    source={{uri: activeFile.image}}
                    style={{height: 125, width: 125}}
                  />
                )}
              </View>
            </View>
          )}
          <TextInput
            value={fileNameForm}
            onChangeText={value => handleChangeText(value, 'fileNameForm')}
            numberOfLines={1}
            editable={activeFile ? false : true}
          />
          {filePicker && (
            <Btn
              title={filePicker ? 'Guardar' : 'Descargar'}
              onPress={handleSave}
              loading={loadingFile}
              auth
            />
          )}
          {activeFile && (
            <View>
              {loadingFile ? (
                <View style={{height: 50}}>
                  <Loading />
                </View>
              ) : (
                <View style={{...styles.spaceBetween, width: 75}}>
                  <Icon name="trash" size={28} onPress={handleDeleteFile} />
                  <Icon
                    name="download-outline"
                    size={28}
                    onPress={handleDownload}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </ModalComponent>
      <Fab
        icon="add"
        style={styles.fabContainerBottom}
        styleBg={visible}
        fabFile={visible}
        onPress={handleVisible}
        handleFile={handleFile}
      />
    </View>
  );
};

export default FilesScreen;
