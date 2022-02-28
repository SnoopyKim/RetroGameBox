import React, { useLayoutEffect, useState } from 'react';
import * as databaseModule from '../../api/database';

export const DatabaseContext = React.createContext({
  isLoading: false,
  addUser: (uid, name) => {},
  getUserInfo: (uid) => ({}),
});

export const DatabaseContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const addUser = async (uid, name) => {
    setIsLoading(true);
    await databaseModule.addUser(uid, name);
    setIsLoading(false);
  };
  const getUserInfo = async (uid) => {
    setIsLoading(true);
    const userInfo = await databaseModule.getUserInfo(uid);
    setIsLoading(false);
    return userInfo;
  };

  return (
    <DatabaseContext.Provider
      value={{
        isLoading,
        addUser,
        getUserInfo,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
