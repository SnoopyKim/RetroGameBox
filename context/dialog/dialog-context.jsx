import React, { useCallback, useLayoutEffect, useState } from 'react';
import * as databaseModule from '../../api/database';

export const DialogContext = React.createContext({
  type: '',
  show: false,
  data: {},
  showAlertDialog: (title, content, onConfirm) => {},
  showConfirmDialog: (title, content, onConfirm, onCancel) => {},
  showSettingDialog: () => {},
  showRankDialog: () => {},
  dismiss: () => {},
});

const initialData = {
  type: '',
  show: false,
  title: '',
  content: '',
  onConfirm: () => {},
  onCancel: () => {},
};

export const DialogContextProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const { type, show, ...restData } = data;

  const showAlertDialog = useCallback(
    (title, content, onConfirm = () => {}) => {
      setData({
        type: 'alert',
        show: true,
        title,
        content,
        onConfirm,
      });
    },
    []
  );

  const showConfirmDialog = useCallback(
    (title, content, onConfirm = () => {}, onCancel = () => {}) => {
      setData({
        type: 'confirm',
        show: true,
        title,
        content,
        onConfirm,
        onCancel,
      });
    },
    []
  );

  const showSettingDialog = useCallback(() => {
    setData({
      ...initialData,
      type: 'setting',
      show: true,
    });
  }, [initialData]);

  const showRankDialog = useCallback(() => {
    setData({
      ...initialData,
      type: 'rank',
      show: true,
    });
  }, [initialData]);

  const dismiss = useCallback(() => {
    setData((prev) => ({ ...prev, show: false }));
    setTimeout(() => setData(initialData), 300);
  }, [initialData]);

  return (
    <DialogContext.Provider
      value={{
        type,
        show,
        data: restData,
        showAlertDialog,
        showConfirmDialog,
        showSettingDialog,
        showRankDialog,
        dismiss,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
