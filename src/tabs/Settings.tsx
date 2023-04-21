import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {AuthContext} from '../util/AuthContext';
import {getAuth} from 'firebase/auth';
import {app} from '../../config/firebaseConfig';
import styles from '../styles';

const auth = getAuth(app);
const Settings = () => {
  const {signOut, role} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Settings page here</Text>
      <Text>E-mail: {auth.currentUser?.email}</Text>
      <Text>Role: {role}</Text>
      <Text>User UID: {auth.currentUser?.uid}</Text>
      <View>
        <Button
          icon="logout"
          mode="contained"
          onPress={signOut}
          style={{margin: 10}}>
          Sign Out
        </Button>
      </View>
    </View>
  );
};

export default Settings;
