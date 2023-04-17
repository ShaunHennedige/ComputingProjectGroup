import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  adaptNavigationTheme,
  ActivityIndicator,
  Text,
  Modal,
  Portal,
} from 'react-native-paper';
import {AuthContext} from './util/AuthContext';
import {navigationRef} from './util/RootNavigation';
import Dashboard from './Dashborad';
import Auth from './Auth';

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
  const {auth, loading} = React.useContext(AuthContext);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <LoadStatus isLoading={loading} />
      <Stack.Navigator>
        {auth.logged ? (
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name="Welcome" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
