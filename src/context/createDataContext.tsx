import React from 'react';

export default (reducer, bootstrap, action, defaultValue) => {
  const Context = React.createContext(defaultValue);

  const Provider = ({children}) => {
    const [state, dispatch] = React.useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in action) {
      boundActions[key] = action[key](dispatch);
    }

    React.useEffect(() => {
      bootstrap(dispatch);
    }, []);

    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context: Context, Provider: Provider};
};
