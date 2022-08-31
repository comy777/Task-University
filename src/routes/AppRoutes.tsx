import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AuthRoutes from './AuthRoutes';
import {Dark, Default} from '../theme/theme';
import useContextApp from '../hooks/useContextApp';
import useUser from '../hooks/useUser';
import {useColorScheme} from 'react-native';
import TaskRoutes from './TaskRoutes';
import Header from '../components/Header';

const AppRoutes = () => {
  const {themeDark, token, handleGetTheme} = useContextApp();
  const {handleGetToken} = useUser();
  const theme = useColorScheme();

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    handleGetTheme();
  }, [theme]);
  useEffect(() => {
    handleGetToken();
  }, [token]);

  return (
    <NavigationContainer theme={themeDark ? Dark : Default}>
      <Header />
      {token ? <TaskRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};

export default AppRoutes;
