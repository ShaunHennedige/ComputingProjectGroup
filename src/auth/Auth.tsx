import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {AuthContext} from '../util/AuthContext';
import styles from '../styles';
import {StackScreenProps} from '@react-navigation/stack';

const Auth: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.auth}>
      <Image
        source={require('../../assets/adaptive-icon.png')}
        resizeMode="center"
        style={{alignSelf: 'center', height: 280}}
      />
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
        Sign In
      </Button>
      <Text
        variant="bodySmall"
        style={{textDecorationLine: 'underline', alignSelf: 'center'}}
        onPress={() => navigation.navigate('Sign Up')}>
        Don't have an account? Click here to Sign Up!
      </Text>
    </View>
  );
};

export default Auth;
