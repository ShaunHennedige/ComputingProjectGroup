import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {adaptNavigationTheme} from 'react-native-paper';
import {AuthContext} from './util/AuthContext';
import {navigationRef} from './util/RootNavigation';
import Dashboard from './Dashborad';
import Auth from './Auth';

const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

export default function Main() {
  const {auth} = React.useContext(AuthContext);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <Stack.Navigator>
        {auth.logged === true ? (
          <Stack.Screen name="Welcome" component={Dashboard} />
        ) : (
          <Stack.Screen name="Authenticate" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
