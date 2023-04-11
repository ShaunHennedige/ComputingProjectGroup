import React from 'react';
import * as SecureStore from 'expo-secure-store';

const authStruct = {
  email: '',
  token: '',
  logged: false,
};

const AuthContext = React.createContext({
  auth: authStruct,
  signIn: (_email: string, _password: string) => {},
  signUp: (_email: string, _password: string) => {},
  signOut: () => {},
});

const AuthProvider = ({children}) => {
  const [auth, setAuthState] = React.useState(authStruct);

  // Get current auth state from storage
  const getAuthState = async () => {
    try {
      const authDataString = await SecureStore.getItemAsync('auth');
      const authData = JSON.parse(authDataString);
      setAuthState(authData);
    } catch (err) {
      setAuthState(authStruct);
    }
  };

  // Update storage & context state
  const updateAuth = async (authData: typeof authStruct) => {
    try {
      await SecureStore.setItemAsync('auth', JSON.stringify(authData));
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  const signIn = (email: string, password: string) => {
    // signIn function goes here
    // and then set the state
    let token = password.length * 9876;
    updateAuth({email: email, token: token.toString(), logged: true});
  };

  const signUp = (email: string, password: string) => {
    // implement signUp
    // and authenticate the user
    let token = password.length * 9876;
    updateAuth({email: email, token: token.toString(), logged: true});
  };

  const signOut = () => {
    updateAuth(authStruct);
  };

  React.useEffect(() => {
    getAuthState();
  });

  return (
    <AuthContext.Provider value={{auth, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
