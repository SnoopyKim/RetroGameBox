import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import DialogWrapper from './DialogWrapper';
import { DialogContext } from '../../context/dialog/dialog-context';
import TextButton from '../buttons/TextButton';
import CloseIcon from '../../assets/images/icon_close.svg';
import NameIcon from '../../assets/images/icon_name.svg';
import { AuthContext } from '../../context/auth/auth-context';
import { DatabaseContext } from '../../context/database/database-context';

const SettingDialog = () => {
  const { isAnonymous, changeAccount, changeName, logout } =
    useContext(AuthContext);
  const { profile, unsubscribeProfile, recordRank } =
    useContext(DatabaseContext);
  const { showRegisterDialog, dismiss } = useContext(DialogContext);

  return (
    <DialogWrapper>
      <TouchableOpacity style={styles.close} onPress={dismiss}>
        <CloseIcon width={30} height={30} style={{ color: '#333' }} />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>설정</Text>
      </View>
      <View style={[styles.nameWrapper]}>
        <NameIcon style={{ color: '#333' }} />
        <Text style={styles.name}>{profile?.name || '게스트 계정'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.gameName}>뽑기게임</Text>
        <Text style={styles.gameScore}>{profile?.CRANE || 'NONE'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.gameName}>점프게임</Text>
        <Text style={styles.gameScore}>{profile?.JUMP || 'NONE'}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.gameName}>NPC게임</Text>

        <Text style={styles.gameScore}>{profile?.NPC || 'NONE'}</Text>
      </View>
      <View style={{ height: 14 }} />
      {isAnonymous && (
        <>
          <TextButton
            backgroundColor={'#333'}
            color={'whitesmoke'}
            title={'계정 전환'}
            onPressed={() => {
              showRegisterDialog();
            }}
          />
          <View style={{ height: 10 }} />
        </>
      )}

      <TextButton
        backgroundColor={'#333'}
        color={'whitesmoke'}
        title={'로그아웃'}
        onPressed={() => {
          dismiss();
          unsubscribeProfile();
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
  nameWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    paddingVertical: 8,
  },
  name: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 20,
    marginHorizontal: 10,
  },
  row: {
    width: 160,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  gameName: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 18,
    marginEnd: 20,
  },
  gameScore: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 16,
  },
});
