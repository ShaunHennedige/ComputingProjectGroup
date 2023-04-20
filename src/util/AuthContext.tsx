import React from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import app from '../../config/firebaseConfig';

const authState = getAuth(app);

const AuthContext = React.createContext({
  signIn: (_email: string, _password: string) => {},
  signUp: (_email: string, _password: string) => {},
  signOut: () => {},
  loading: true,
  logged: false,
  status: '',
});

const AuthProvider = ({children}) => {
  // const [auth, setAuthState] = React.useState(authStruct);
  const [loading, setLoading] = React.useState(true);
  const [logged, setLogged] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const signInFunc = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(authState, email, password);
      setStatus('');
      setLogged(true);
    } catch (error) {
      console.log(error.message);
      setStatus('Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  // TODO
  const signUpFunc = async (email: string, password: string) => {
    // implement signUp
    // and authenticate the user
  };

  const signOutFunc = async () => {
    setLoading(true);
    setLogged(false);
    signOut(authState);
    setLoading(false);
  };

  React.useEffect(() => {
    // looks out for changes in auth state
    // important when loading user sessions at startup
    onAuthStateChanged(authState, user => {
      if (user) {
        console.log(`User found: ${user.uid}`);
        logged ? null : setLogged(true);
      } else {
        console.log('No users found.');
        logged ? setLogged(false) : null;
      }
      setLoading(false);
    });
  }, [logged]);

  return (
    <AuthContext.Provider
      value={{
        signIn: signInFunc,
        signUp: signUpFunc,
        signOut: signOutFunc,
        loading,
        logged,
        status,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
