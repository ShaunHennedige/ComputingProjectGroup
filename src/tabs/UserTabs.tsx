import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthContext, Roles} from '../util/AuthContext';
import Icon from '@expo/vector-icons/FontAwesome';
import Home from './Home';
import Map from './Map';
import Scanner from './Scanner';
import Admin from './Admin';
import Settings from './Settings';

const UserTabs = createBottomTabNavigator();
const UserTabsScreen = () => {
  const {role} = React.useContext(AuthContext);

  return (
    <UserTabs.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          let iconname: any;

          switch (route.name) {
            case 'Home':
              iconname = 'home';
              break;
            case 'Map':
              iconname = 'map';
              break;
            case 'Scanner':
              iconname = 'qrcode';
              break;
            case 'Admin':
              iconname = 'info-circle';
              break;
            case 'Settings':
              iconname = 'cog';
              break;
          }
          return <Icon name={iconname} color={color} size={size} />;
        },
      })}>
      {role === Roles.Admin ? (
        <>
          <UserTabs.Screen name="Home" component={Home} />
          <UserTabs.Screen name="Admin" component={Admin} />
          <UserTabs.Screen name="Settings" component={Settings} />
        </>
      ) : role === Roles.User ? (
        <>
          <UserTabs.Screen name="Home" component={Home} />
          <UserTabs.Screen
            name="Map"
            component={Map}
            options={{headerShown: false}}
          />
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
