import React from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {app} from '../../config/firebaseConfig';

const authState = getAuth(app);

enum Roles {
  Admin = 'ADMIN',
  User = 'USER',
  Anon = 'ANON',
}

const AuthContext = React.createContext({
  signIn: (_email: string, _password: string) => {},
  signUp: (_email: string, _password: string, _role: string) => {},
  anonLog: () => {},
  signOut: () => {},
  loading: true,
  logged: false,
  role: Roles.Anon,
  status: '',
});

const AuthProvider = ({children}) => {
  const [loading, setLoading] = React.useState(true);
  const [logged, setLogged] = React.useState(false);
  const [status, setStatus] = React.useState('');
  const [role, setRole] = React.useState<Roles>(Roles.Anon);

  const signInFunc = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(authState, email, password);
      setStatus('');
      // get role
    } catch (error) {
      console.log(error.message);
      setStatus('Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUpFunc = async (email: string, password: string, role: string) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(authState, email, password);
      setStatus('');
      // assign role
    } catch (error) {
      console.log(error.message);
      setStatus('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const anonLogFunc = async () => {
    setLoading(true);
    try {
      await signInAnonymously(authState);
      setStatus('');
      // assign role
    } catch (error) {
      console.log(error.message);
      setStatus('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const signOutFunc = async () => {
    setLoading(true);
    setRole(Roles.Anon);
    signOut(authState);
    setLoading(false);
  };

  React.useEffect(() => {
    const evalLogged = (state: boolean) => {
      state ? setLogged(true) : setLogged(false);
      setLoading(false);
    };

    // looks out for changes in auth state
    // important when loading user sessions at startup
    onAuthStateChanged(authState, user => {
      if (user) {
        console.log(`User found: ${user.uid}`);
        // remove next line
        setRole(Roles.User);
        evalLogged(true);
      } else {
        console.log('No users found.');
        evalLogged(false);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: signInFunc,
        signUp: signUpFunc,
        anonLog: anonLogFunc,
        signOut: signOutFunc,
        loading,
        logged,
        role,
        status,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider, Roles};
