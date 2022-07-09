import React from 'react';
import { Modal, View } from 'react-native';
import { ModalProps } from '../interfaces/components';
import useContextApp from '../hooks/useContextApp';
import useStyles from '../hooks/useStyles';

const ModalComponent = ({ children }: ModalProps) => {
	const { modal, setModal } = useContextApp();
	const { styles } = useStyles();
	return (
		<Modal animationType="slide" transparent={true} visible={modal} onRequestClose={setModal}>
			<View style={styles.centeredView}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>{children}</View>
				</View>
			</View>
		</Modal>
	);
};

export default ModalComponent;
