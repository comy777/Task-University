import { StateApp } from '../interfaces/app';
import { AppActions } from '../interfaces/app';
import { dataDays } from '../utils/storage';

export const appReducer = (state: StateApp, action: AppActions): StateApp => {
	switch (action.type) {
		case 'set loading':
			return {
				...state,
				loading: !state.loading
			};
		case 'set visible tab bar':
			return {
				...state,
				visibleTabBar: action.payload.visible
			};
		case 'set modal':
			return {
				...state,
				modal: !state.modal
			};
		case 'set lessons':
			return {
				...state,
				lessons: action.payload.lessons
			};
		case 'set day':
			return {
				...state,
				day: action.payload.day
			};
		case 'set children':
			return {
				...state,
				children: action.payload.children
			};
		case 'set schedlue':
			return {
				...state,
				schedlue: action.payload.schedlue
			};
		case 'set days':
			return {
				...state,
				days: action.payload.days
			};
		case 'resotore lesson':
			return {
				...state,
				days: dataDays,
				day: '',
				schedlue: ''
			};
		case 'set notes':
			return {
				...state,
				notes: action.payload.notes
			};
		case 'set tasks':
			return {
				...state,
				tasks: action.payload.tasks
			};
		case 'set active data':
			return {
				...state,
				activeData: action.payload.data
			};
		case 'set visible fab':
			return {
				...state,
				visibleFab: !state.visibleFab
			};
		case 'set visible date picker':
			return {
				...state,
				visibleDatePicker: !state.visibleDatePicker
			};
		case 'set date picker':
			return {
				...state,
				datePicker: action.payload.data
			};
		default:
			return state;
	}
};
