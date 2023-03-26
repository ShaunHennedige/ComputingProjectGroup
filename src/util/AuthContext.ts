import createDataContext from './createDataContext';
import SecureStore from 'expo-secure-store';

const authReducer = (state, action) => {
  console.log(state); // debug
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    case 'restore':
      return {
        token: action.payload.token,
      };
  }
};

const authBootstrap = async dispatch => {
  let token;

  try {
    token = await SecureStore.getItemAsync('token');
  } catch (error) {
    // retrieval failed
  }

  dispatch({
    type: 'restore',
    payload: {
      token: token,
    },
  });
};

const signup = dispatch => {
  return ({email, password}) => {
    // API processing goes here
    console.log(`Signup > ${email}:${password}`);
    dispatch({
      type: 'signup',
      payload: {
        token: 'dummy-token',
        email: email,
      },
    });
  };
};

const signin = dispatch => {
  return ({email, password}) => {
    // API processing goes here
    console.log(`Signin > ${email}:${password}`);
    dispatch({
      type: 'signin',
      payload: {
        token: 'dummy-token',
        email: email,
      },
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  authBootstrap,
  // Make sure update dispatchers and values here as defined above
  {signin, signout, signup},
  {token: null, email: ''},
);
