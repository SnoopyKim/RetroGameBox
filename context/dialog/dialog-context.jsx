import React, { useLayoutEffect, useState } from 'react';
import * as databaseModule from '../../api/database';

export const DialogContext = React.createContext({
  type: '',
  show: false,
  data: {},
  showAlertDialog: (title, content, onConfirm) => {},
  showConfirmDialog: (title, content, onConfirm, onCancel) => {},
  showSettingDialog: () => {},
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

  const showAlertDialog = (title, content, onConfirm = () => {}) => {
    setData({
      type: 'alert',
      show: true,
      title,
      content,
      onConfirm,
    });
  };
  const showConfirmDialog = (
    title,
    content,
    onConfirm = () => {},
    onCancel = () => {}
  ) => {
    setData({
      type: 'confirm',
      show: true,
      title,
      content,
      onConfirm,
      onCancel,
    });
  };
  const showSettingDialog = () => {
    setData({
      ...initialData,
      type: 'setting',
      show: true,
    });
  };
  const dismiss = () => {
    setData((prev) => ({ ...prev, show: false }));
    setTimeout(() => setData(initialData), 300);
  };

  return (
    <DialogContext.Provider
      value={{
        type,
        show,
        data: restData,
        showAlertDialog,
        showConfirmDialog,
        showSettingDialog,
        dismiss,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
