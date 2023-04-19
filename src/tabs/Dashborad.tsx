import React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Home from './Home';
import Map from './Map';
import Scanner from './Scanner';
import Admin from './Admin';
import Settings from './Settings';

const Dashboard = () => {
  const insets = useSafeAreaInsets();
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
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Dashboard;
