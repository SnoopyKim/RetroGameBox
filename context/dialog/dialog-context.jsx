import React, { useCallback, useLayoutEffect, useState } from 'react';
import * as databaseModule from '../../api/database';

export const DialogContext = React.createContext({
  types: '',
  show: false,
  data: {},
  showAlertDialog: (title, content, onConfirm) => {},
  showConfirmDialog: (title, content, onConfirm, onCancel) => {},
  showSettingDialog: () => {},
  showRankDialog: () => {},
  showRegisterDialog: () => {},
  showNameDialog: () => {},
  showTermsDialog: () => {},
  dismiss: () => {},
});

const initialData = {
  types: [],
  show: false,
  title: '',
  content: '',
  onConfirm: () => {},
  onCancel: () => {},
};

export const DialogContextProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const { types, show, ...restData } = data;
  const type = types.length === 0 ? '' : types[types.length - 1];

  const showAlertDialog = useCallback(
    (title, content, onConfirm = () => {}) => {
      setData({
        types: [...types, 'alert'],
        show: true,
        title,
        content,
        onConfirm,
      });
    },
    [types]
  );

  const showConfirmDialog = useCallback(
    (title, content, onConfirm = () => {}, onCancel = () => {}) => {
      setData({
        types: [...types, 'confirm'],
        show: true,
        title,
        content,
        onConfirm,
        onCancel,
      });
    },
    [types]
  );

  const showSettingDialog = useCallback(() => {
    setData({
      ...initialData,
      types: [...types, 'setting'],
      show: true,
    });
  }, [initialData, types]);

  const showRankDialog = useCallback(() => {
    setData({
      ...initialData,
      types: [...types, 'rank'],
      show: true,
    });
  }, [initialData, types]);

  const showRegisterDialog = useCallback(() => {
    setData({
      ...initialData,
      types: [...types, 'register'],
      show: true,
    });
  }, [initialData, types]);

  const showNameDialog = useCallback(() => {
    setData({
      ...initialData,
      types: [...types, 'name'],
      show: true,
    });
  }, [initialData, types]);

  const showTermsDialog = useCallback(() => {
    setData({
      ...initialData,
      types: [...types, 'terms'],
      show: true,
    });
  }, [initialData, types]);

  const dismiss = useCallback(() => {
    setData((prev) => ({ ...prev, show: false }));
    setTimeout(() => {
      if (types.length > 1) {
        setData((prev) => ({
          ...prev,
          types: types.slice(0, types.length - 1),
          show: true,
        }));
      } else {
        setData(initialData);
      }
    }, 300);
  }, [initialData, types]);

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
        showRegisterDialog,
        showNameDialog,
        showTermsDialog,
        dismiss,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
