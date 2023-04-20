import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {AuthContext} from '../util/AuthContext';
import styles from '../styles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={styles.auth}>
      <Text variant="bodyMedium" style={{alignSelf: 'center'}}>
        Welcome to our Travel Companion app. To get started, please enter your
        details below.
      </Text>
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
      <TextInput
        style={{marginTop: 15}}
        label="Confirm password"
        secureTextEntry
        mode="flat"
        onChangeText={setCpassword}
      />
      <Button
        style={{margin: 15}}
        icon="login"
        mode="contained"
        onPress={() => {}}>
        Sign Up
      </Button>
    </View>
  );
};

export default SignUp;
