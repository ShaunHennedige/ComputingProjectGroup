import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import styles from '../styles';
import {AuthContext} from '../util/AuthContext';

const Settings = () => {
  const {auth, signOut} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Settings page here</Text>
      <Text>Username: {auth.email}</Text>
      <View>
        <Button icon="logout" mode="contained" onPress={signOut}>
          Sign Out
        </Button>
      </View>
    </View>
  );
};

export default Settings;
