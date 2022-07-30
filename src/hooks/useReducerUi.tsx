import {useReducer} from 'react';
import {uiInitialState} from '../interfaces/ui';
import {uiReducer} from '../reducers/ui';
import {User} from '../interfaces/response';

const useReducerUi = () => {
  const [uiState, dispatch] = useReducer(uiReducer, uiInitialState);
  const setTheme = () => dispatch({type: 'set theme'});
  const setVisible = () => dispatch({type: 'set visible'});
  const setLoadingAuth = () => dispatch({type: 'set loading auth'});
  const setToken = (token: string) =>
    dispatch({type: 'set token', payload: {token}});
  const setUser = (user: User) => dispatch({type: 'set user', payload: {user}});
  const setThemeSystem = () => dispatch({type: 'set theme system'});
  const setEditable = () => dispatch({type: 'set editable'});
  return {
    uiState,
    setTheme,
    setVisible,
    setLoadingAuth,
    setToken,
    setUser,
    setThemeSystem,
    setEditable,
  };
};

export default useReducerUi;
