import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {adaptNavigationTheme} from 'react-native-paper';
import {AuthProvider, AuthContext} from './util/AuthContext';
import {navigationRef} from './util/RootNavigation';
import Dashboard from './Dashborad';
import Auth from './Auth';

const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

export default function Main() {
  const {auth} = React.useContext(AuthContext);
  //console.log(state); // debug

  const Stack = createStackNavigator();

  // TODO: Fix AuthContext
  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef}>
      <AuthProvider>
        <Stack.Navigator>
          {auth.logged === true ? (
            <Stack.Screen name="Welcome" component={Dashboard} />
          ) : (
            <Stack.Screen name="Authenticate" component={Auth} />
          )}
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
