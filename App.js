import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './src/Main';

export default function App() {
  return (
    <PaperProvider>
      <Main />
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
