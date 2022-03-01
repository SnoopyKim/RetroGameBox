import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import DialogWrapper from './DialogWrapper';
import { DialogContext } from '../../context/dialog/dialog-context';
import TextButton from '../buttons/TextButton';

const AlertDialog = () => {
  const { data, dismiss } = useContext(DialogContext);
  const { title, content, onConfirm } = data;
  return (
    <DialogWrapper>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.content}>{content}</Text>
      </View>
      <View style={styles.actionWrapper}>
        <View style={styles.action}>
          <TextButton
            title={'확인'}
            fontSize={18}
            color={'whitesmoke'}
            borderColor={'#333'}
            backgroundColor={'#333'}
            onPressed={() => {
              onConfirm();
              dismiss();
            }}
          />
        </View>
      </View>
    </DialogWrapper>
  );
};

export default AlertDialog;

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: 'center',
  },
  title: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 24,
  },
  contentWrapper: {
    marginVertical: 20,
  },
  content: {
    color: '#333',
    fontFamily: 'DGM',
    fontSize: 20,
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  action: {
    width: 100,
  },
});
