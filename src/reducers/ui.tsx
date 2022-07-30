import {StateUi, UiActions} from '../interfaces/ui';

export const uiReducer = (state: StateUi, action: UiActions): StateUi => {
  switch (action.type) {
    case 'set theme':
      return {
        ...state,
        themeDark: !state.themeDark,
      };
    case 'set visible':
      return {
        ...state,
        visible: !state.visible,
      };
    case 'set loading auth':
      return {
        ...state,
        loadingAuth: !state.loadingAuth,
      };
    case 'set token':
      return {
        ...state,
        token: action.payload.token,
      };
    case 'set user':
      return {
        ...state,
        user: action.payload.user,
      };
    case 'set theme system':
      return {
        ...state,
        themeSystem: !state.themeSystem,
      };
    case 'set editable':
      return {
        ...state,
        editable: !state.editable,
      };
    case 'restore user':
      return {
        ...state,
        token: undefined,
        user: undefined,
      };
    default:
      return state;
  }
};
