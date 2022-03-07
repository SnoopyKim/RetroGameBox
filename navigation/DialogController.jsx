import React, { useContext } from 'react';
import { AuthContext } from './../context/auth/auth-context';
import { DatabaseContext } from './../context/database/database-context';
import { DialogContext } from './../context/dialog/dialog-context';
import AlertDialog from '../components/dialogs/AlertDialog';
import ConfirmDialog from '../components/dialogs/ConfirmDialog';
import NameDialog from './../components/dialogs/NameDialog';
import RegisterDialog from './../components/dialogs/RegisterDialog';
import RankDialog from './../components/dialogs/RankDialog';
import SettingDialog from './../components/dialogs/SettingDialog';
import TermsDialog from './../components/dialogs/TermsDialog';
import NetworkLoading from './../components/NetworkLoading';

const DialogController = () => {
  const { isLoading: authLoading } = useContext(AuthContext);
  const { isLoading: dbLoading } = useContext(DatabaseContext);
  const { type: dialogType } = useContext(DialogContext);
  return (
    <>
      {(() => {
        switch (dialogType) {
          case 'alert':
            return <AlertDialog />;
          case 'confirm':
            return <ConfirmDialog />;
          case 'setting':
            return <SettingDialog />;
          case 'rank':
            return <RankDialog />;
          case 'register':
            return <RegisterDialog />;
          case 'name':
            return <NameDialog />;
          case 'terms':
            return <TermsDialog />;
          default:
            return null;
        }
      })()}
      {(authLoading || dbLoading) && <NetworkLoading />}
    </>
  );
};

export default DialogController;
