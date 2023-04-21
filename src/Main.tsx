import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  adaptNavigationTheme,
  ActivityIndicator,
  Text,
  Modal,
  Portal,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthStackScreen} from './auth/Auth';
import {UserTabsScreen} from './tabs/UserTabs';
import {AuthContext} from './util/AuthContext';

const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

const LoadStatus = (props: {isLoading: boolean}) => {
  return (
    <Portal>
      <Modal
        visible={props.isLoading}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          alignItems: 'center',
        }}>
        <ActivityIndicator animating={true} />
        <Text variant="titleMedium">Loading</Text>
      </Modal>
    </Portal>
  );
};

const Main = () => {
  const {logged, loading} = React.useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={DarkTheme}>
        <LoadStatus isLoading={loading} />
        {!loading && logged ? <UserTabsScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Main;
