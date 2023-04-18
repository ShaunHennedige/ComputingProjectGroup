import React, {useState} from 'react';
import {StyleSheet, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from './util/AuthContext';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = React.useContext(AuthContext);

  return (
    <SafeAreaView style={style.container}>
      <Image
        source={{
          uri: 'https://media.tenor.com/Awb79iiS9YAAAAAd/going-insane-cat.gif',
          height: 240,
        }}
        resizeMode="center"
      />
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
        onPress={() => signIn(email, password)}>
        Sign In
      </Button>
      <Button
        style={{marginTop: 15}}
        icon="send"
        mode="contained"
        onPress={() => {}}>
        Sign Up
      </Button>
    </SafeAreaView>
  );
};

export default Auth;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 40,
    width: 400,
  },
});
