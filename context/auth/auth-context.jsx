import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import * as authModule from '../../api/auth';

export const AuthContext = React.createContext({
  isLoading: true,
  isAuthenticated: false,
  isAnonymous: false,
  guestLogin: () => {},
  emailLogin: (email, password) => {},
  register: (email, password, name) => {},
  changeName: (name) => {},
  changeAccount: (email, password, name) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authState, setAuthState] = useState({
    anonymous: false,
    uid: null,
    name: null,
  });
  const isAuthenticated = useMemo(
    () => authState.uid !== null,
    [authState.uid]
  );
  const isAnonymous = useMemo(() => authState.anonymous, [authState.anonymous]);

  const guestLoginHandler = useCallback(async () => {
    setIsLoading(true);
    await authModule.loginForGuest();
    setIsLoading(false);
  }, [authModule.loginForGuest]);

  const emailLoginHandler = useCallback(
    async (email, password) => {
      setIsLoading(true);
      const result = await authModule.loginForEmail(email, password);
      if (!result.success) {
        console.log(result.message);
      }
      setIsLoading(false);
    },
    [authModule.loginForEmail]
  );

  const emailRegisterHandler = useCallback(
    async (email, password, name) => {
      setIsLoading(true);
      const result = await authModule.registerForEmail(email, password, name);
      if (result.success) {
        setAuthState((prev) => ({
          ...prev,
          name,
        }));
      }
      setIsLoading(false);
    },
    [authModule.registerForEmail]
  );

  const changeAccountHandler = useCallback(
    async (email, password, name) => {
      setIsLoading(true);
      const result = await authModule.changeAccount(email, password, name);
      if (result.success) {
        setAuthState((prev) => ({
          ...prev,
          name,
        }));
      }
      setIsLoading(false);
    },
    [authModule.changeAccount]
  );

  const changeNameHandler = useCallback(
    async (name) => {
      setIsLoading(true);
      await authModule.setDisplayName(name);
      setIsLoading(false);
    },
    [authModule.setDisplayName]
  );

  const logoutHandler = useCallback(async () => {
    setIsLoading(true);
    await authModule.logout();
    setIsLoading(false);
  }, [authModule.logout]);

  useEffect(() => {
    const onAuthChanged = (user) => {
      setIsLoading(false);
      if (user) {
        setAuthState({
          anonymous: user.isAnonymous,
          uid: user.uid,
          name: user.displayName,
        });
      } else {
        setAuthState({
          anonymous: false,
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
        isAnonymous,
        guestLogin: guestLoginHandler,
        emailLogin: emailLoginHandler,
        register: emailRegisterHandler,
        changeAccount: changeAccountHandler,
        changeName: changeNameHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
