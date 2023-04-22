import React from 'react';
import {
  getAuth,
  onAuthStateChanged,
  beforeAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {app} from '../../config/FirebaseConfig';
import {setUserData, getUserData} from './FirestoreUtils';

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
      // user sign in
      await signInWithEmailAndPassword(authState, email, password);
      setStatus('');
    } catch (error) {
      console.log(error.message);
      setStatus('Something went wrong. Please try again.');
    }
  };

  const signUpFunc = async (
    email: string,
    password: string,
    optRole: Roles,
  ) => {
    setLoading(true);
    try {
      // user sign up
      const {user} = await createUserWithEmailAndPassword(
        authState,
        email,
        password,
      );
      // set user role
      await setUserData(user.uid, {role: optRole});
      setRole(optRole);
      setStatus('');
    } catch (error) {
      console.log(error.message);
      setStatus('Something went wrong. Please try again.');
    }
  };

  const anonLogFunc = async () => {
    setLoading(true);
    try {
      // anon mode
      await signInAnonymously(authState);
      setStatus('');
    } catch (error) {
      console.log(error.message);
      setStatus('Something went wrong. Please try again.');
    }
  };

  const signOutFunc = async () => {
    signOut(authState);
    setRole(Roles.Anon);
  };

  React.useEffect(() => {
    const evalLogged = async (state: boolean, uid: any = null) => {
      if (uid !== null) {
        const userData = await getUserData(uid);
        userData.exists() ? setRole(userData.get('role')) : null;
      }
      state ? setLogged(true) : setLogged(false);
      setLoading(false);
    };

    // watches auth state changes runs a callback before the change
    beforeAuthStateChanged(authState, () => {
      setLoading(true);
    });

    // looks out for changes in auth state
    // important when loading user sessions at startup
    onAuthStateChanged(authState, async user => {
      if (user) {
        console.log(`User found: ${user.uid}`);
        await evalLogged(true, user.uid);
      } else {
        console.log('No user found.');
        await evalLogged(false);
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
