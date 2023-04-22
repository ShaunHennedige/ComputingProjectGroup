import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext, Roles} from '../util/AuthContext';
import Home from './Home';
import Map from './Map';
import Scanner from './Scanner';
import Admin from './Admin';
import Settings from './Settings';

const UserTabs = createBottomTabNavigator();
const UserTabsScreen = () => {
  const {role} = React.useContext(AuthContext);

  return (
    <UserTabs.Navigator>
      {role === Roles.Admin ? (
        <>
          <UserTabs.Screen name="Home" component={Home} />
          <UserTabs.Screen name="Admin" component={Admin} />
          <UserTabs.Screen name="Settings" component={Settings} />
        </>
      ) : role === Roles.User ? (
        <>
          <UserTabs.Screen name="Home" component={Home} />
          <UserTabs.Screen name="Map" component={Map} />
          <UserTabs.Screen name="Scanner" component={Scanner} />
          <UserTabs.Screen name="Settings" component={Settings} />
        </>
      ) : (
        <>
          <UserTabs.Screen name="Home" component={Home} />
          <UserTabs.Screen name="Scanner" component={Scanner} />
          <UserTabs.Screen name="Settings" component={Settings} />
        </>
      )}
    </UserTabs.Navigator>
  );
};

export {UserTabsScreen};
