import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {adaptNavigationTheme} from 'react-native-paper';
import {Provider as AuthProvider} from './context/AuthContext';
import {Context as AuthContext} from './context/AuthContext';
import Dashboard from './Dashborad';
import Auth from './Auth';

const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});

export default function App() {
  const {state} = React.useContext(AuthContext);
  console.log(state);

  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator>
          {/* {state.token == null ? (
            <Stack.Screen
              name="Login"
              component={Auth}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: true}}
            />
          )} */}
          <Stack.Screen
            name="Login"
            component={Auth}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
