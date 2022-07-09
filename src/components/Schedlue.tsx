import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import { SchedlueProps } from '../interfaces/components';
import useApp from '../hooks/useApp';
import { dataSchedlue } from '../utils/storage';
import Btn from './Btn';

const Schedlue = ({ title }: SchedlueProps) => {
	const { handleSaveSchedlue, schedlue, colors, setSchedlue } = useApp();
	return (
		<View style={{ alignItems: 'center' }}>
			<Text>{title}</Text>
			<Text>Seleccione un horario</Text>
			<View style={{ marginTop: 15 }}>
				<Picker
					selectedValue={schedlue}
					onValueChange={(itemValue) => setSchedlue(itemValue)}
					style={{ height: 50, width: 220 }}
					mode="dropdown"
				>
					<Picker.Item label={dataSchedlue[0].schedlue} value={dataSchedlue[0].schedlue} />
					<Picker.Item label={dataSchedlue[1].schedlue} value={dataSchedlue[1].schedlue} />
					<Picker.Item label={dataSchedlue[2].schedlue} value={dataSchedlue[2].schedlue} />
					<Picker.Item label={dataSchedlue[3].schedlue} value={dataSchedlue[3].schedlue} />
					<Picker.Item label={dataSchedlue[4].schedlue} value={dataSchedlue[4].schedlue} />
					<Picker.Item label={dataSchedlue[5].schedlue} value={dataSchedlue[5].schedlue} />
					<Picker.Item label={dataSchedlue[6].schedlue} value={dataSchedlue[6].schedlue} />
					<Picker.Item label={dataSchedlue[7].schedlue} value={dataSchedlue[7].schedlue} />
					<Picker.Item label={dataSchedlue[8].schedlue} value={dataSchedlue[8].schedlue} />
				</Picker>
			</View>
			<Btn title="Guardar" style={{}} styleText={{ color: colors.primary }} onPress={handleSaveSchedlue} />
		</View>
	);
};

export default Schedlue;
