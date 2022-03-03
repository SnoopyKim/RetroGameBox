import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import * as databaseModule from '../../api/database';
import { DialogContext } from '../dialog/dialog-context';

export const DatabaseContext = React.createContext({
  isLoading: false,
  profile: {},
  subscribeProfile: () => {},
  unsubscribeProfile: () => {},
  addUser: (uid, name) => {},
  getUserInfo: (uid) => ({}),
  recordRank: (gameId, score) => {},
  getRankList: (gameId) => [],
});

export const DatabaseContextProvider = ({ children }) => {
  const { showAlertDialog } = useContext(DialogContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState();
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (isListening) {
      const unsubscribe = databaseModule.setUserInfoListener((doc) => {
        const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
        const data = doc.data();
        setProfile(data);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isListening, databaseModule.setUserInfoListener]);

  const subscribeProfile = useCallback(() => {
    setIsListening(true);
  }, []);
  const unsubscribeProfile = useCallback(() => {
    setIsListening(false);
  }, []);

  const addUser = useCallback(
    async (uid, name) => {
      setIsLoading(true);
      await databaseModule.addUser(uid, name);
      setIsLoading(false);
    },
    [databaseModule.addUser]
  );

  const getUserInfo = useCallback(
    async (uid) => {
      setIsLoading(true);
      const userInfo = await databaseModule.getUserInfo(uid);
      setIsLoading(false);
      return userInfo;
    },
    [databaseModule.getUserInfo]
  );

  const recordRank = useCallback(
    async (gameId, score) => {
      if (profile) {
        setIsLoading(true);
        await databaseModule.recordRank(gameId, user.uid, profile.name, score);
        setIsLoading(false);
      } else {
        showAlertDialog('권한 오류', '게스트 계정은 기록할 수 없습니다!');
      }
    },
    [databaseModule.recordRank, showAlertDialog, profile]
  );

  const getRankList = useCallback(
    async (gameId) => {
      setIsLoading(true);
      const ranks = await databaseModule.fetchRank(gameId);
      setIsLoading(false);
      return ranks;
    },
    [databaseModule.fetchRank]
  );

  return (
    <DatabaseContext.Provider
      value={{
        isLoading,
        profile,
        subscribeProfile,
        unsubscribeProfile,
        addUser,
        getUserInfo,
        recordRank,
        getRankList,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};
