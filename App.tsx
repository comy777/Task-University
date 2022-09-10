import 'react-native-gesture-handler';
import React from 'react';
import AppRoutes from './src/routes/AppRoutes';
import {AppContextProvider} from './src/context/AppContext';

const AppState = ({children}: any) => {
  return <AppContextProvider>{children}</AppContextProvider>;
};

const App = () => {
  return (
    <AppState>
      <AppRoutes />
    </AppState>
  );
};

export default App;
