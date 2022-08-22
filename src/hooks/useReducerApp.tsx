import {useReducer} from 'react';
import {appReducer} from '../reducers/app';
import {appInitialState} from '../interfaces/app';
import {Lesson, Note, Task} from '../interfaces/response';
import {DayProps} from '../interfaces/components';
import {ActiveData} from '../interfaces/data';

const useReducerApp = () => {
  const [taskState, dispatch] = useReducer(appReducer, appInitialState);
  const setLoading = () => dispatch({type: 'set loading'});
  const setVisibleTabBar = (visible: boolean) =>
    dispatch({type: 'set visible tab bar', payload: {visible}});
  const setModal = () => dispatch({type: 'set modal'});
  const setLessons = (lessons: Lesson[]) =>
    dispatch({type: 'set lessons', payload: {lessons}});
  const setDay = (day: string) => dispatch({type: 'set day', payload: {day}});
  const setChildren = (children: string) =>
    dispatch({type: 'set children', payload: {children}});
  const setSchedlue = (schedlue: string) =>
    dispatch({type: 'set schedlue', payload: {schedlue}});
  const setDays = (days: DayProps[]) =>
    dispatch({type: 'set days', payload: {days}});
  const restoreLesson = () => dispatch({type: 'resotore lesson'});
  const setNotes = (notes: Note[]) =>
    dispatch({type: 'set notes', payload: {notes}});
  const setTasks = (tasks: Task[]) =>
    dispatch({type: 'set tasks', payload: {tasks}});
  const setActiveData = (data: ActiveData) =>
    dispatch({type: 'set active data', payload: {data}});
  const setVisibleFab = () => dispatch({type: 'set visible fab'});
  const setVisibleDatePicker = () =>
    dispatch({type: 'set visible date picker'});
  const setDatePicker = (data: string) =>
    dispatch({type: 'set date picker', payload: {data}});
  const setVisibleColor = () => dispatch({type: 'set color visible'});

  return {
    taskState,
    setLoading,
    setLessons,
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
    setVisibleColor,
  };
};

export default useReducerApp;
