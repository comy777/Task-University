import { StackScreenProps } from '@react-navigation/stack';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Lesson, Note } from '../interfaces/response';
import { ActiveData } from './data';
import { Task, User } from './response';

export interface InputIconProps {
	icon: string;
	onPress?: () => void;
	visible?: boolean;
	onChangeText: (value: string) => void;
	value: string;
}

export interface BtnProps {
	style?: StyleProp<ViewStyle>;
	title: string;
	onPress?: () => void;
	disabled?: boolean;
	loading?: boolean;
	styleText?: StyleProp<TextStyle>;
}

export interface FabProps {
	icon: string;
	style?: StyleProp<ViewStyle>;
	onPress?: () => void;
	loading?: boolean;
	fabGroup?: boolean;
	handleSave?: () => void;
	handleCamera?: () => void;
	handleGalery?: () => void;
	handleCalendar?: () => void;
}

export interface DaysProps {
	onPress: (day: string) => void;
	days: DayProps[];
}

export interface DayProps {
	id: string;
	day: string;
	selected: boolean;
	onPress?: (day: string) => void;
	schedlue: string;
}

export interface ModalProps {
	children: any;
}

export interface SchedlueProps {
	title: string;
}

export interface LessonProps {
	data: Lesson;
	onPress: () => void;
}

export interface NotesComponentProps {
	notes: Note[];
}

export interface TasksComponentProps {
	tasks: Task[];
}

export interface NoteComponentProps {
	note: Note;
	onPress: (note: Note) => void;
}

export interface TaskComponentProps {
	task: Task;
	onPress: (task: Task) => void;
}

export interface ImagesComponentProps {
	onPressCamera?: () => void;
	onPressGalery?: () => void;
	images: ImageDataProps[];
	image: ImageDataProps | undefined;
	setImage: (image: ImageDataProps) => void;
	deleteImage: () => void;
	disable: boolean;
	visible?: boolean;
}

export interface ImageComponentProps {
	image: ImageDataProps;
	style?: StyleProp<ImageStyle>;
	onPress?: (image: ImageDataProps) => void;
}

export interface ImageDataProps {
	uri?: string;
	base64?: string;
	fileName?: string;
	type?: string;
}

export interface DataComponentProps {
	data: ActiveData;
	handleEdit?: () => void;
	handleDelete?: () => void;
	handleComplete?: () => void;
}

export interface UserComponentProps {
	user: User;
}

type RootStack = {
	'home stack': undefined;
	'create lesson': { lesson?: Lesson };
	'note stack': { id: string };
	'task stack': { id: string };
	'create note': { note?: Note; lesson: string };
	'create task': { task?: Task; lesson: string };
};

export interface AuthProps extends StackScreenProps<any, any> {}

export interface HomeScreenProps extends StackScreenProps<RootStack, 'home stack'> {}

export interface LessonScreenProps extends StackScreenProps<RootStack, 'create lesson'> {}

export interface NoteScreenProps extends StackScreenProps<RootStack, 'note stack'> {}

export interface TaskScreenProps extends StackScreenProps<RootStack, 'task stack'> {}

export interface CreateNoteScreenProps extends StackScreenProps<RootStack, 'create note'> {}

export interface CreateTaskScreenProps extends StackScreenProps<RootStack, 'create task'> {}

export interface UseAuthProps extends StackScreenProps<any, any> {
	type: string;
}
