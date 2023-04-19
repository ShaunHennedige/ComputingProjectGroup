import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {AuthContext} from '../util/AuthContext';
import styles from '../styles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signUp} = React.useContext(AuthContext);

  return (
    <View style={styles.auth}>
      {/* <Image
        source={require('../../assets/adaptive-icon.png')}
        resizeMode="center"
        style={{alignSelf: 'center', height: 280}}
      /> */}
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
        onPress={() => {}}>
        Sign Up
      </Button>
    </View>
  );
};

export default SignUp;
