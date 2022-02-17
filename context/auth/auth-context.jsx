import React, { useLayoutEffect, useState } from 'react';
import * as authModule from '../../api/auth';

export const AuthContext = React.createContext({
  isLoading: true,
  isAuthenticated: false,
  uid: '',
  name: '',
  guestLogin: () => {},
  googleLogin: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    uid: '',
    name: '',
  });
  const isAuthenticated = authState.uid != '';

  const guestLoginHandler = async () => {
    setIsLoading(true);
    await authModule.loginForGuest();
    setIsLoading(false);
  };
  const googleLoginHandler = async () => {};
  const logoutHandler = async () => {
    setIsLoading(true);
    await authModule.logout();
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    const onAuthChanged = (user) => {
      setIsLoading(false);
      if (user) {
        setAuthState({
          uid: user.uid,
          name: user.displayName,
        });
      } else {
        setAuthState({
          uid: '',
          name: '',
        });
      }
    };
    const onAuthError = (error) => {
      isLoading(false);
      console.error(error.code, error.message);
    };
    authModule.setAuthListener(onAuthChanged, onAuthError);

    return () => {
      authModule.initAuthListener();
    };
  }, [setAuthListener, initAuthListener]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        ...authState,
        guestLogin: guestLoginHandler,
        googleLogin: googleLoginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
