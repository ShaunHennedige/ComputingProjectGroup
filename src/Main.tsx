import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {adaptNavigationTheme} from 'react-native-paper';
import {Provider as AuthProvider} from './context/AuthContext';
import {Context as AuthContext} from './context/AuthContext';
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
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          {/* {state?.token == null ? (
            <Stack.Screen
              name="Login"
              component={Auth}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen name="App Name" component={Dashboard} />
          )} */}
          <Stack.Screen name="App Name" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
