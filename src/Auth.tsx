import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {AuthContext} from './Main';
// import * as RootNav from './RootNavigator';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <>
      <View>
        <TextInput
          style={{marginTop: 15}}
          label="Username"
          mode="flat"
          onChangeText={setUsername}
        />
        <TextInput
          style={{marginTop: 15}}
          label="Password"
          secureTextEntry
          mode="flat"
          onChangeText={setPassword}
        />
        <Button
          style={{marginTop: 15}}
          icon="login"
          mode="contained"
          onPress={() => signIn({username, password})}>
          Log In
        </Button>
        <Button
          style={{marginTop: 15}}
          icon="send"
          mode="contained"
          onPress={() => signIn({username, password})}>
          Sign Up
        </Button>
      </View>
    </>
  );
};

export default Auth;
