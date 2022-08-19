import React, {createContext} from 'react';
import {StateUiProps} from '../interfaces/ui';
import useReducerUi from '../hooks/useReducerUi';
import useReducerApp from '../hooks/useReducerApp';

export const AppContext = createContext({} as StateUiProps);

export const AppContextProvider = ({children}: any) => {
  const {
    uiState,
    setTheme,
    setVisible,
    setLoadingAuth,
    setToken,
    setUser,
    setThemeSystem,
    setEditable,
    restoreUser,
    setSearchVisible,
  } = useReducerUi();
  const {
    taskState,
    setLessons,
    setLoading,
    setVisibleTabBar,
    setDay,
    setModal,
    setChildren,
    setSchedlue,
    setDays,
    restoreLesson,
    setNotes,
    setActiveData,
    setTasks,
    setVisibleFab,
    setVisibleDatePicker,
    setDatePicker,
  } = useReducerApp();
  return (
    <AppContext.Provider
      value={{
        ...uiState,
        setTheme,
        setVisible,
        setLoadingAuth,
        setToken,
        setUser,
        setThemeSystem,
        setEditable,
        restoreUser,
        setSearchVisible,
        appState: {
          ...taskState,
          setLessons,
          setLoading,
          setVisibleTabBar,
          setDay,
          setModal,
          setChildren,
          setSchedlue,
          setDays,
          restoreLesson,
          setNotes,
          setActiveData,
          setTasks,
          setVisibleFab,
          setVisibleDatePicker,
          setDatePicker,
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};
