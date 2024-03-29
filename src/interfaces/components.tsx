import {StackScreenProps} from '@react-navigation/stack';
import {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {File, Folder, Lesson, Note, Task, User} from '../interfaces/response';
import {ActiveData} from './data';

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
  auth?: boolean;
}

export interface FabProps {
  icon: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  loading?: boolean;
  fabGroup?: boolean;
  fabNote?: boolean;
  fabFile?: boolean;
  styleBg?: boolean;
  handleSave?: () => void;
  handleCamera?: () => void;
  handleGalery?: () => void;
  handleCalendar?: () => void;
  handleColor?: () => void;
  handleFile?: () => void;
  handleFolder?: () => void;
  createFolder?: boolean;
}

export interface LoadingComponentProps {
  size?: number;
  color?: string;
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
  classroom: string;
}

export interface ModalProps {
  children: any;
  visible: boolean;
  setVisible: () => void;
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

export interface DataList {
  title: string;
  data: string[];
}

export interface ColorComponentProps {
  setColor: (color: string) => void;
  color: string;
}

export interface ColorProps {
  colorItem: string;
}

export interface FilePicker {
  name: string;
  size: number | null;
  type: string | null;
  uri: string;
}

export interface DataFiles {
  id: string;
  name: string;
  icon: string;
  type: ActiveDataFile;
  file?: string;
}

export interface FileState {
  loading: boolean;
  visible: boolean;
  modal: boolean;
  loadingFile: boolean;
  icon: string;
  activeDataType: ActiveDataFile;
  filePicker: FilePicker | undefined;
  data: DataFiles[];
  id: string | undefined;
}

export interface FileComponentProps {
  data: DataFiles;
  onPress: (file: DataFiles) => void;
  handleNavigate: (id: string) => void;
}

export type ActiveDataFile =
  | 'folder'
  | 'file'
  | 'filepicker'
  | 'create folder'
  | undefined;

export interface FolderComponentProps {
  data: Folder;
  onPress: () => void;
  editFolder: (folder: Folder) => void;
}

export interface FilesUseHook {
  lesson: string;
  folder?: string;
}

export interface DeleteFileProps {
  file?: string;
  folder?: string;
}

export interface StateFile {
  file?: File;
  folder?: Folder;
}

export type ScreenStack = 'note stack' | 'task stack' | 'files stack';

export type RootStack = {
  'home stack': undefined;
  'create lesson': {lesson?: Lesson};
  'note stack': {id: string};
  'task stack': {id: string};
  'create note': {note?: Note; lesson: string};
  'create task': {task?: Task; lesson: string};
  schedule: undefined;
  'image screen': {images: ImageDataProps[]; image: ImageDataProps};
  'search screen': undefined;
  'meet screen': undefined;
  'files stack': {id: string};
  'folder stack': {lesson: string; folder: string};
};

export interface AuthProps extends StackScreenProps<any, any> {}

export interface HomeScreenProps
  extends StackScreenProps<RootStack, 'home stack'> {}

export interface LessonScreenProps
  extends StackScreenProps<RootStack, 'create lesson'> {}

export interface NoteScreenProps
  extends StackScreenProps<RootStack, 'note stack'> {}

export interface TaskScreenProps
  extends StackScreenProps<RootStack, 'task stack'> {}

export interface CreateNoteScreenProps
  extends StackScreenProps<RootStack, 'create note'> {}

export interface CreateTaskScreenProps
  extends StackScreenProps<RootStack, 'create task'> {}

export interface ImageScreenProps
  extends StackScreenProps<RootStack, 'image screen'> {}

export interface ScheduleScreenProps
  extends StackScreenProps<RootStack, 'schedule'> {}

export interface FilesScreenProps
  extends StackScreenProps<RootStack, 'files stack'> {}

export interface FolderScreenProps
  extends StackScreenProps<RootStack, 'folder stack'> {}

export interface UseAuthProps extends StackScreenProps<any, any> {
  type: string;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStack {}
  }
}
