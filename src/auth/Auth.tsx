import React from 'react';
import {Image, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {AuthContext} from '../util/AuthContext';
import {StackScreenProps, createStackNavigator} from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import styles from '../styles';

const Auth: React.FC<StackScreenProps<any>> = ({navigation}) => {
  const {anonLog} = React.useContext(AuthContext);

  return (
    <View style={styles.auth}>
      <Image
        source={require('../../assets/adaptive-icon.png')}
        resizeMode="center"
        style={{alignSelf: 'center', height: 280, margin: 15}}
      />
      <Button
        style={{margin: 10}}
        mode="contained"
        onPress={() => navigation.navigate('Sign In')}>
        Sign In
      </Button>
      <Button
        style={{margin: 10}}
        mode="contained"
        onPress={() => navigation.navigate('Sign Up')}>
        Sign Up
      </Button>
      <Text variant="bodySmall" style={{alignSelf: 'center'}}>
        Don't want an account? Proceed anonymously.
      </Text>
      <Button style={{margin: 10}} mode="contained" onPress={anonLog}>
        Anonymous Signin
      </Button>
    </View>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen name="Welcome" component={Auth} />
      <AuthStack.Screen name="Sign In" component={SignIn} />
      <AuthStack.Screen name="Sign Up" component={SignUp} />
    </AuthStack.Navigator>
  );
};

export {AuthStackScreen};
