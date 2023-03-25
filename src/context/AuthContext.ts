import createDataContext from './createDataContext';

const authReducer = (state, action) => {
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
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({email, password}) => {
    // API processing goes here
    console.log(`Signup > ${email}:${password}`);
    dispatch({
      type: 'signup',
      payload: {
        token: 'dummy-token',
        email,
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
        email,
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
  // Make sure update dispatchers and values here as defined above
  {signin, signout, signup},
  {token: null, email: ''},
);
