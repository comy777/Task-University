import React, {useEffect} from 'react';
import {View} from 'react-native';
import Loading from '../components/Loading';
import {FolderScreenProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import useFiles from '../hooks/useFiles';
import {FlatList} from 'react-native-gesture-handler';
import FileComponent from '../components/FileComponent';
import ModalComponent from '../components/Modal';
import ModalFileComponent from '../components/ModalFileComponent';
import Fab from '../components/Fab';

const FolderScreen = ({route}: FolderScreenProps) => {
  const {lesson, folder} = route.params;
  useEffect(() => {
    getData();
  }, []);
  const {
    loading,
    visible,
    handleVisible,
    handleFile,
    modal,
    handleModal,
    handleChangeText,
    fileNameForm,
    handleSave,
    loadingFile,
    handleClickFile,
    handleDeleteFile,
    handleDownload,
    handleNavigate,
    icon,
    activeDataType,
    handleCreateFolder,
    data,
    getData,
    handleEditData,
  } = useFiles({lesson, folder});
  const {styles} = useStyles();
  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <FileComponent
              data={item}
              onPress={handleClickFile}
              handleNavigate={handleNavigate}
            />
          )}
          numColumns={2}
        />
      </View>
      <ModalComponent visible={modal} setVisible={handleModal}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {modal && (
            <ModalFileComponent
              icon={icon}
              formName={fileNameForm}
              handleChangeText={handleChangeText}
              activeData={activeDataType}
              handleSave={handleSave}
              handleDelete={handleDeleteFile}
              handleDownload={handleDownload}
              loading={loadingFile}
              handleEdit={handleEditData}
            />
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
        handleFolder={handleCreateFolder}
      />
    </View>
  );
};

export default FolderScreen;
