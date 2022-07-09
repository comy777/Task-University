import { Lesson, Note, Task } from './response';
import { DayProps } from './components';
import { dataDays } from '../utils/storage';
import { ActiveData } from './data';

export interface StateAppProps {
	loading: boolean;
	setLoading: () => void;
	visibleTabBar: boolean;
	setVisibleTabBar: (visible: boolean) => void;
	modal: boolean;
	setModal: () => void;
	lessons: Lesson[];
	setLessons: (lessons: Lesson[]) => void;
	days: DayProps[];
	setDays: (days: DayProps[]) => void;
	day: string;
	setDay: (day: string) => void;
	children: string | null;
	setChildren: (children: string) => void;
	schedlue: string;
	setSchedlue: (schedlue: string) => void;
	restoreLesson: () => void;
	notes: Note[];
	setNotes: (notes: Note[]) => void;
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	activeData: ActiveData;
	setActiveData: (data: ActiveData) => void;
	visibleFab: boolean;
	setVisibleFab: () => void;
	visibleDatePicker: boolean;
	setVisibleDatePicker: () => void;
	datePicker: string | null;
	setDatePicker: (data: string) => void;
}

export interface StateApp {
	loading: boolean;
	visibleTabBar: boolean;
	modal: boolean;
	lessons: Lesson[];
	days: DayProps[];
	day: string;
	children: string | null;
	schedlue: string;
	notes: Note[];
	tasks: Task[];
	activeData: ActiveData;
	visibleFab: boolean;
	visibleDatePicker: boolean;
	datePicker: string | null;
}

export const appInitialState: StateApp = {
	loading: false,
	visibleTabBar: true,
	modal: false,
	lessons: [],
	days: dataDays,
	day: '',
	children: null,
	schedlue: '',
	notes: [],
	tasks: [],
	activeData: { note: undefined, task: undefined },
	visibleFab: false,
	visibleDatePicker: false,
	datePicker: null
};

export type AppActions =
	| { type: 'set loading' }
	| { type: 'set visible tab bar'; payload: { visible: boolean } }
	| { type: 'set lessons'; payload: { lessons: Lesson[] } }
	| { type: 'set day'; payload: { day: string } }
	| { type: 'set modal' }
	| { type: 'set children'; payload: { children: string } }
	| { type: 'set schedlue'; payload: { schedlue: string } }
	| { type: 'set days'; payload: { days: DayProps[] } }
	| { type: 'resotore lesson' }
	| { type: 'set notes'; payload: { notes: Note[] } }
	| { type: 'set tasks'; payload: { tasks: Task[] } }
	| { type: 'set active data'; payload: { data: ActiveData } }
	| { type: 'set visible fab' }
	| { type: 'set visible date picker' }
	| { type: 'set date picker'; payload: { data: string } };
