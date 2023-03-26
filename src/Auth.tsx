import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AuthContext} from './util/AuthContext';
import * as RootNavigation from './util/RootNavigation';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signin, signup} = React.useContext(AuthContext);

  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      onPress={Keyboard.dismiss}
      accessible={false}>
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
          onPress={() => RootNavigation.navigate('Dashboard')}>
          Log In
        </Button>
        <Button
          style={{marginTop: 15}}
          icon="send"
          mode="contained"
          onPress={() => RootNavigation.navigate('Dashboard')}>
          Sign Up
        </Button>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Auth;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'space-around',
    padding: 40,
    width: 400,
  },
});
