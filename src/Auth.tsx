import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AuthContext} from './context/AuthContext';
// import * as RootNav from './RootNavigator';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signin, signup} = React.useContext(AuthContext);

  return (
    <SafeAreaView>
      <TextInput
        style={{marginTop: 15}}
        label="Username"
        mode="flat"
        onChangeText={setEmail}
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
        onPress={() => signin({email, password})}>
        Log In
      </Button>
      <Button
        style={{marginTop: 15}}
        icon="send"
        mode="contained"
        onPress={() => signup({email, password})}>
        Sign Up
      </Button>
    </SafeAreaView>
  );
};

export default Auth;
