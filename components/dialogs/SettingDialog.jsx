import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import DialogWrapper from './DialogWrapper';
import { DialogContext } from '../../context/dialog/dialog-context';
import TextButton from '../buttons/TextButton';
import CloseIcon from '../../assets/images/icon_close.svg';
import NameIcon from '../../assets/images/icon_name.svg';
import { AuthContext } from '../../context/auth/auth-context';

const SettingDialog = () => {
  const { name, logout } = useContext(AuthContext);
  const { dismiss } = useContext(DialogContext);
  return (
    <DialogWrapper>
      <TouchableOpacity style={styles.close} onPress={dismiss}>
        <CloseIcon width={30} height={30} style={{ color: '#333' }} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>설정</Text>
      </View>
      <View style={styles.row}>
        <NameIcon style={{ color: '#333' }} />
        <Text style={styles.text}>{name || '게스트 계정'}</Text>
      </View>
      <View style={{ height: 14 }} />
      <TextButton
        backgroundColor={'#333'}
        color={'whitesmoke'}
        title={'계정 전환'}
        onPressed={() => {}}
      />
      <View style={{ height: 10 }} />
      <TextButton
        backgroundColor={'#333'}
        color={'whitesmoke'}
        title={'로그아웃'}
        onPressed={() => {
          dismiss();
          logout();
        }}
      />
    </DialogWrapper>
  );
};

export default SettingDialog;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  text: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 16,
    marginHorizontal: 10,
  },
});
