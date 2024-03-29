import {StateAppProps} from './app';
import {User} from './response';

export interface StateUiProps {
  themeDark: boolean;
  setTheme: () => void;
  visible: boolean;
  setVisible: () => void;
  loadingAuth: boolean;
  setLoadingAuth: () => void;
  token: string | undefined;
  setToken: (token: string) => void;
  appState: StateAppProps;
  user: User | undefined;
  setUser: (user: User) => void;
  themeSystem: boolean;
  setThemeSystem: () => void;
  editable: boolean;
  setEditable: () => void;
  restoreUser: () => void;
  searchVisible: boolean;
  setSearchVisible: (visible: boolean) => void;
}

export interface StateUi {
  themeDark: boolean;
  visible: boolean;
  loadingAuth: boolean;
  token: string | undefined;
  user: User | undefined;
  themeSystem: boolean;
  editable: boolean;
  searchVisible: boolean;
}

export const uiInitialState: StateUi = {
  themeDark: false,
  visible: true,
  loadingAuth: false,
  token: undefined,
  user: undefined,
  themeSystem: true,
  editable: false,
  searchVisible: true,
};

export type UiActions =
  | {type: 'set theme'}
  | {type: 'set visible'}
  | {type: 'set loading auth'}
  | {type: 'set token'; payload: {token: string}}
  | {type: 'set user'; payload: {user: User}}
  | {type: 'set theme system'}
  | {type: 'set editable'}
  | {type: 'restore user'}
  | {type: 'set search visible'; payload: {visible: boolean}};
