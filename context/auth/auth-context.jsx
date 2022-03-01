import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as authModule from '../../api/auth';

export const AuthContext = React.createContext({
  isLoading: true,
  isAuthenticated: false,
  uid: '',
  name: '',
  guestLogin: () => {},
  emailLogin: (email, password) => {},
  register: (email, password, name) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    uid: null,
    name: null,
  });
  const isAuthenticated = authState.uid !== null && authState.name !== null;

  const guestLoginHandler = async () => {
    setIsLoading(true);
    await authModule.loginForGuest();
    setIsLoading(false);
  };
  const emailLoginHandler = async (email, password) => {
    setIsLoading(true);
    const result = await authModule.loginForEmail(email, password);
    if (!result.success) {
      console.log(result.message);
    }
    setIsLoading(false);
  };
  const emailRegisterHandler = async (email, password, name) => {
    setIsLoading(true);
    const result = await authModule.registerForEmail(email, password, name);
    if (result.success) {
      setAuthState((prev) => ({
        ...prev,
        name,
      }));
    }
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
          uid: null,
          name: null,
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
