import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import styles from '../styles';
import {AuthContext} from '../util/AuthContext';

export default function Settings() {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Settings page here</Text>
      <Button icon="logout" mode="contained" onPress={signOut}>
        Sign Out
      </Button>
    </View>
  );
}
