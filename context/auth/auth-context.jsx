import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as authModule from '../../api/auth';

export const AuthContext = React.createContext({
  isLoading: true,
  isAuthenticated: false,
  uid: '',
  name: '',
  guestLogin: () => {},
  emailLogin: (email, password) => {},
  register: (email, password) => {},
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
  const emailLoginHandler = async (email, password) => {
    setIsLoading(true);
    await authModule.loginForEmail(email, password);
    setIsLoading(false);
  };
  const emailRegisterHandler = async (email, password) => {
    setIsLoading(true);
    await authModule.registerForEmail(email, password);
    setIsLoading(false);
  };
  const logoutHandler = async () => {
    setIsLoading(true);
    await authModule.logout();
    setIsLoading(false);
  };

  useEffect(() => {
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
  }, [authModule.setAuthListener, authModule.initAuthListener]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        ...authState,
        guestLogin: guestLoginHandler,
        emailLogin: emailLoginHandler,
        register: emailRegisterHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
