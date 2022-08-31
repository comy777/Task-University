import React from 'react';
import {Modal, View} from 'react-native';
import {ModalProps} from '../interfaces/components';
import useStyles from '../hooks/useStyles';

const ModalComponent = ({children, visible, setVisible}: ModalProps) => {
  const {styles} = useStyles();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={setVisible}>
      <View style={styles.centeredView}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
