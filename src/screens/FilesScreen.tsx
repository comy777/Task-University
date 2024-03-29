import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {FilesScreenProps} from '../interfaces/components';
import Loading from '../components/Loading';
import FileComponent from '../components/FileComponent';
import Fab from '../components/Fab';
import useStyles from '../hooks/useStyles';
import ModalComponent from '../components/Modal';
import useFiles from '../hooks/useFiles';
import ModalFileComponent from '../components/ModalFileComponent';

const FileScreen = ({route}: FilesScreenProps) => {
  const {id} = route.params;
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
  } = useFiles({lesson: id});
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
        createFolder={true}
      />
    </View>
  );
};

export default FileScreen;
