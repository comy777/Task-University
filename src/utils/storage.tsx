import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayProps } from '../interfaces/components';

export const getData = async (item: string) => {
	try {
		const data = await AsyncStorage.getItem(item);
		return data ? data : null;
	} catch (error) {
		console.log(error);
	}
};

export const saveData = async (item: string, data: string) => {
	try {
		await AsyncStorage.setItem(item, data);
	} catch (error) {
		console.log(error);
	}
};

export const deleteData = async (item: string) => {
	try {
		await AsyncStorage.removeItem(item);
	} catch (error) {
		console.log(error);
	}
};

export const dataDays: DayProps[] = [
	{ id: '0', day: 'Lunes', selected: false, schedlue: '' },
	{ id: '1', day: 'Martes', selected: false, schedlue: '' },
	{ id: '2', day: 'Miercoles', selected: false, schedlue: '' },
	{ id: '3', day: 'Jueves', selected: false, schedlue: '' },
	{ id: '4', day: 'Viernes', selected: false, schedlue: '' },
	{ id: '5', day: 'Sabado', selected: false, schedlue: '' }
];

export const dataSchedlue = [
	{ id: '0', schedlue: '7:00 - 8:30 AM' },
	{ id: '1', schedlue: '8:30 - 10:00 AM' },
	{ id: '2', schedlue: '10:00 - 11:30 AM' },
	{ id: '3', schedlue: '11:30 - 1:00 PM' },
	{ id: '4', schedlue: '1:00 - 2:30 PM' },
	{ id: '5', schedlue: '2:30 - 3:45 PM' },
	{ id: '6', schedlue: '3:45 - 5:15 PM' },
	{ id: '7', schedlue: '6:00 - 7:15 PM' },
	{ id: '8', schedlue: '7:30 - 9:45 PM' }
];
