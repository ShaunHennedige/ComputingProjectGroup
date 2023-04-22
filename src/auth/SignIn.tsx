import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {AuthContext} from '../util/AuthContext';
import styles from '../util/styles';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn, status} = React.useContext(AuthContext);

  return (
    <View style={styles.auth}>
      <Text variant="bodyMedium" style={{alignSelf: 'center'}}>
        Sign in with existing credentials.
      </Text>
      {!!status && (
        <Text
          variant="labelLarge"
          style={{
            alignSelf: 'center',
            margin: 10,
            color: 'red',
            fontWeight: 'bold',
          }}>
          {status}
        </Text>
      )}
      <TextInput
        style={{marginTop: 15}}
        label="E-mail"
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
        style={{margin: 15}}
        icon="login"
        mode="contained"
        onPress={() => signIn(email, password)}>
        Continue
      </Button>
    </View>
  );
};

export default SignIn;
