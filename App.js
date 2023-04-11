import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {Provider as PaperProvider, MD3DarkTheme} from 'react-native-paper';
import Main from './src/Main';
import {AuthProvider} from './src/util/AuthContext';

const theme = {
  ...MD3DarkTheme,
  mode: 'adaptive',
  roundness: 2,
  colors: {
    ...MD3DarkTheme.colors,
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style="auto" />
        <Main />
      </AuthProvider>
    </PaperProvider>
  );
}
