import React from 'react';
import {BottomNavigation} from 'react-native-paper';
import Home from './tabs/Home';
import Map from './tabs/Map';
import Scanner from './tabs/Scanner';
import Admin from './tabs/Admin';
import Settings from './tabs/Settings';

const Dashboard = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home-variant',
      unfocusedIcon: 'home-variant-outline',
    },
    {
      key: 'map',
      title: 'Location',
      focusedIcon: 'map-marker',
      unfocusedIcon: 'map-marker-outline',
    },
    {key: 'qrscn', title: 'Scanner', focusedIcon: 'qrcode-scan'},
    {
      key: 'admin',
      title: 'Admin',
      focusedIcon: 'account-key',
      unfocusedIcon: 'account-key-outline',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    map: Map,
    qrscn: Scanner,
    admin: Admin,
    settings: Settings,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Dashboard;
