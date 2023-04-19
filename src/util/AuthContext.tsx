import React from 'react';
import * as SecureStore from 'expo-secure-store';

// default auth data
const authStruct = {
  email: '',
  uuid: '',
  logged: false,
};

const AuthContext = React.createContext({
  auth: authStruct,
  signIn: (_email: string, _password: string) => {},
  signUp: (_email: string, _password: string) => {},
  signOut: () => {},
  loading: true,
});

const AuthProvider = ({children}) => {
  const [auth, setAuthState] = React.useState(authStruct);
  const [loading, setLoading] = React.useState(true);

  // Get current auth state from storage
  const getAuthState = async () => {
    try {
      const authDataString = await SecureStore.getItemAsync('auth');
      const authData = JSON.parse(authDataString);
      authData === null ? setAuthState(authStruct) : setAuthState(authData);
    } catch (err) {
      setAuthState(authStruct);
    } finally {
      setLoading(false);
    }
  };

  // Update storage & context state
  const updateAuth = async (authData: typeof authStruct) => {
    try {
      await SecureStore.setItemAsync('auth', JSON.stringify(authData));
      setAuthState(authData);
    } catch (error) {
      Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    // signIn function goes here
    // and then set the state
    let uuid = password.length * 9876;
    updateAuth({email: email, uuid: uuid.toString(), logged: true});
  };

  const signUp = (email: string, password: string) => {
    setLoading(true);
    // implement signUp
    // and authenticate the user
    let uuid = password.length * 9876;
    updateAuth({email: email, uuid: uuid.toString(), logged: true});
  };

  const signOut = () => {
    updateAuth(authStruct);
  };

  React.useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AuthContext.Provider value={{auth, signIn, signUp, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
