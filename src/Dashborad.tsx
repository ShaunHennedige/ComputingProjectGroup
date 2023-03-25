import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import Home from './tabs/Home';
import Scanner from './tabs/Scanner';

const MapRoute = () => <Text>Map here</Text>;
const AdminRoute = () => <Text>Admin here</Text>;
const SettingsRoute = () => <Text>Settings here</Text>;

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
    map: MapRoute,
    qrscn: Scanner,
    admin: AdminRoute,
    settings: SettingsRoute,
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
