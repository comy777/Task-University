import React from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Btn from './Btn';
import {ActiveDataFile, DataFiles} from '../interfaces/components';
import useStyles from '../hooks/useStyles';
import Loading from './Loading';

interface Props {
  icon: string;
  formName: string;
  handleChangeText: (value: string, name: 'fileNameForm') => void;
  activeData: ActiveDataFile;
  handleSave: () => void;
  handleDelete: () => void;
  handleDownload: () => void;
  loading: boolean;
  handleEdit: () => void;
}

const ModalFileComponent = ({
  icon,
  formName,
  handleChangeText,
  activeData,
  handleSave,
  handleDelete,
  handleDownload,
  loading,
  handleEdit,
}: Props) => {
  const {styles} = useStyles();
  return (
    <View style={styles.modalFile}>
      <View>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: icon}} style={{height: 150, width: 150}} />
        </View>
        <TextInput
          value={formName}
          onChangeText={value => handleChangeText(value, 'fileNameForm')}
          style={{...styles.inputContainer, height: 50}}
          placeholder="Name"
        />
        {(activeData === 'filepicker' || activeData === 'create folder') && (
          <View style={{alignItems: 'center'}}>
            <Btn
              title="Guardar"
              onPress={handleSave}
              loading={loading}
              auth={true}
            />
          </View>
        )}
        {(activeData === 'file' || activeData === 'folder') && (
          <View style={{marginTop: 15}}>
            {loading ? (
              <Loading />
            ) : (
              <View
                style={{
                  ...styles.spaceBetween,
                  justifyContent: 'space-evenly',
                }}>
                <Icon name="trash" size={28} onPress={handleDelete} />
                {activeData === 'file' && (
                  <Icon
                    name="download-outline"
                    size={28}
                    onPress={handleDownload}
                  />
                )}
                <Icon name="pencil-outline" size={28} onPress={handleEdit} />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default ModalFileComponent;
