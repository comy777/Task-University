import useStyles from './useStyles';
import {useContext} from 'react';
import {AppContext} from '../context/AppContext';

const useComponents = () => {
  const {styles} = useStyles();
  const {appState} = useContext(AppContext);
  const {setVisibleColor} = appState;
  const handleSaveColor = () => {
    setVisibleColor();
  };
  return {
    styles,
    setVisibleColor,
    handleSaveColor,
  };
};

export default useComponents;
