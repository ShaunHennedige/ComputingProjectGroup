/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button, Text, RadioButton} from 'react-native-paper';
import {AuthContext, Roles} from '../util/AuthContext';
import styles from '../util/styles';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass01, setPass01] = useState('');
  const [pass02, setPass02] = useState('');
  const [role, setRole] = useState(Roles.Anon.toString());
  const {signUp, status} = React.useContext(AuthContext);

  const onSignUp = () => {
    if (pass01 !== pass02) {
      alert('Password confirmation does not match!');
    } else if (name === '' || email === '') {
      alert('Please fill all fields appropiately.');
    } else {
      signUp(email, pass01, {role, name});
    }
  };

  return (
    <View style={styles.auth}>
      <Text variant="bodyMedium" style={{alignSelf: 'center'}}>
        Welcome to RouteSync service. To get started, please enter your details below.
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
        label="Name/Alias"
        mode="flat"
        onChangeText={setName}
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
        onChangeText={setPass01}
      />
      <TextInput
        style={{marginTop: 15}}
        label="Confirm Password"
        secureTextEntry
        mode="flat"
        onChangeText={setPass02}
      />
      <RadioButton.Group onValueChange={newRole => setRole(newRole)} value={role}>
        <RadioButton.Item label="Sign up as a Passenger" value={Roles.User.toString()} />
        <RadioButton.Item label="Sign up as a Driver" value={Roles.Driver.toString()} />
      </RadioButton.Group>
      <Button
        style={{margin: 15}}
        icon="login"
        mode="contained"
        onPress={onSignUp}>
        Continue
      </Button>
    </View>
  );
};

export default SignUp;
