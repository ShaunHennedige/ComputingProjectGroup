import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {adaptNavigationTheme} from 'react-native-paper';
import {Provider as AuthProvider} from './util/AuthContext';
import {Context as AuthContext} from './util/AuthContext';
import {navigationRef} from './util/RootNavigation';
import Dashboard from './Dashborad';
import Auth from './Auth';

const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

export default function Main() {
  const {state} = React.useContext(AuthContext);
  //console.log(state); // debug

  const Stack = createStackNavigator();

  // TODO: Fix AuthContext
  return (
    <AuthProvider>
      <NavigationContainer theme={DarkTheme} ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login">
          {/* {state?.token == null ? (
            <Stack.Screen
              name="Login"
              component={Auth}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen name="App Name" component={Dashboard} />
          )} */}
          <Stack.Screen
            name="Login"
            component={Auth}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
