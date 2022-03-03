import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import DialogWrapper from './DialogWrapper';
import { DialogContext } from '../../context/dialog/dialog-context';
import { AuthContext } from '../../context/auth/auth-context';
import LoginForm from '../form/LoginForm';
import CloseIcon from '../../assets/images/icon_close.svg';

const RegisterDialog = () => {
  const { isAnonymous, changeAccount } = useContext(AuthContext);
  const { dismiss } = useContext(DialogContext);

  useEffect(() => {
    if (!isAnonymous) {
      dismiss();
    }
  }, [isAnonymous, dismiss]);

  const onRegisterHandler = async (email, password, name) => {
    changeAccount(email, password, name);
  };

  return (
    <DialogWrapper>
      <TouchableOpacity style={styles.close} onPress={dismiss}>
        <CloseIcon width={30} height={30} style={{ color: '#333' }} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>계정 전환</Text>
      </View>
      <LoginForm isRegister={true} onRegister={onRegisterHandler} />
    </DialogWrapper>
  );
};

export default RegisterDialog;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 24,
  },
});
